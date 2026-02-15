using ECommerce.AdminPanel.Models;
using ECommerce.AdminPanel.Models.Products;
using ECommerce.AdminPanel.Services;
using ECommerce.Application.DTOs.Brand;
using ECommerce.Application.DTOs.Category;
using ECommerce.Application.DTOs.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace ECommerce.AdminPanel.Controllers;

[Authorize]
public class ProductController : Controller
{
    private readonly BaseApiService _apiService;
    public ProductController(BaseApiService apiService)
    {
        _apiService = apiService;
    }

    // ÜRÜN LİSTESİ
    [HttpGet]
    public async Task<IActionResult> Index(int page = 1, int pageSize = 10)
    {
        // Not: API tarafındaki GetAll metodun sayfalama desteklemiyorsa düz liste çekebiliriz
        // Şablonun beklediği 'ProductListViewModel' yapısını dolduruyoruz
        var response = await _apiService.GetAsync<IEnumerable<ProductDto>>("Product/List");

        var model = new ProductListViewModel
        {
            Products = new PagedResult<ProductDto> // Şablondaki yapıya uygun sarmalıyoruz
            {
                Items = response?.Data ?? new List<ProductDto>(),
                TotalCount = response?.Data?.Count() ?? 0,
                PageNumber = page,
                PageSize = pageSize
            }
        };

        return View(model);
    }


    [HttpGet]
    public async Task<IActionResult> Create()
    {
        // 1. Kategorileri çekip API'den veri gelmezse boş liste gönderiyoruz ki View patlamasın
        var categoryResponse = await _apiService.GetAsync<IEnumerable<CategoryDto>>("Category/List");
        ViewBag.AllCategories = categoryResponse?.Data?.ToList() ?? new List<CategoryDto>();

        // 2. Markaları Çekiyoruz ve aynı şekilde boş liste kontrolü yapıyoruz
        var brandResponse = await _apiService.GetAsync<IEnumerable<BrandDto>>("Brand/List");
        ViewBag.AllBrands = brandResponse?.Data?.ToList() ?? new List<BrandDto>();

        if ((categoryResponse != null && !categoryResponse.Success) || (brandResponse != null && !brandResponse.Success))
        {
            TempData["ErrorMessage"] = "Veriler yüklenirken bir sorun oluştu.";
        }

        // CompanyId'yi Claims veya Session'dan alıp modele ekliyoruz
        var companyIdStr = User.FindFirst("CompanyId")?.Value ?? HttpContext.Session.GetString("CompanyId");
        Guid.TryParse(companyIdStr, out var companyId);

        var model = new CreateProductViewModel { CompanyId = companyId };
        return View(model);
    }

    // YENİ ÜRÜN OLUŞTURMA (POST)
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CreateProductViewModel model)
    {
        // 1. Validasyon Kontrolü 
        if (!ModelState.IsValid)
        {
            await LoadViewBags(); // Hata varsa listeleri tekrar yükle
            return View(model);
        }

        // 2. Multipart Form Data Hazırlığı 
        using var content = new MultipartFormDataContent();
        content.Add(new StringContent(model.Name ?? ""), nameof(ProductCreateDto.Name));
        content.Add(new StringContent(model.Description ?? ""), nameof(ProductCreateDto.Description));
        content.Add(new StringContent(model.Price.ToString()), nameof(ProductCreateDto.Price));
        content.Add(new StringContent(model.Stock.ToString()), nameof(ProductCreateDto.Stock));
        content.Add(new StringContent(model.CategoryId.ToString()), nameof(ProductCreateDto.CategoryId));
        content.Add(new StringContent(model.BrandId.ToString()), nameof(ProductCreateDto.BrandId));
        content.Add(new StringContent(model.CompanyId.ToString()), nameof(ProductCreateDto.CompanyId));

        // Dosyaları Ekliyoruz
        if (model.Files != null && model.Files.Count > 0)
        {
            foreach (var file in model.Files)
            {
                var fileContent = new StreamContent(file.OpenReadStream());
                fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                content.Add(fileContent, "ImageFiles", file.FileName);
            }
        }

        // 3. API İsteği
        var response = await _apiService.PostMultipartAsync<Guid>("Product/Create", content);

        if (response != null && response.Success)
        {
            TempData["SuccessMessage"] = "Ürün başarıyla eklendi.";
            return RedirectToAction(nameof(Index));
        }

        // 4. Hata Durumu 
        // API'den hata döndüyse (400, 500 vb.) sayfayı tekrar yüklüyoruz ama Listeleri de dolduruyoruz!
        TempData["ErrorMessage"] = response?.Message ?? "API tarafında bir hata oluştu.";
        await LoadViewBags(); // Krtik Nokta: Listeleri tekrar yüklemezsek "Value cannot be null" hatası alırız.

        return View(model);
    }

    // Kod tekrarını önlemek için yardımcı metod
    private async Task LoadViewBags()
    {
        var categoryResponse = await _apiService.GetAsync<IEnumerable<CategoryDto>>("Category/List");
        var brandResponse = await _apiService.GetAsync<IEnumerable<BrandDto>>("Brand/List");

        ViewBag.AllCategories = categoryResponse?.Data?.ToList() ?? new List<CategoryDto>();
        ViewBag.AllBrands = brandResponse?.Data?.ToList() ?? new List<BrandDto>();
    }

    // ÜRÜN DÜZENLEME (GET)
    [HttpGet]
    public async Task<IActionResult> Update(Guid id)
    {
        var productResponse = await _apiService.GetAsync<ProductDto>($"Product/GetById/{id}");
        if (productResponse == null || !productResponse.Success)
        {
            TempData["ErrorMessage"] = "Ürün bulunamadı.";
            return RedirectToAction(nameof(Index));
        }

        var product = productResponse.Data;

        // ViewBags (Kategori/Marka)
        await LoadViewBags();

        var model = new UpdateProductViewModel
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description ?? string.Empty,
            Price = product.Price,
            Stock = product.Stock,
            CategoryId = product.CategoryId,
            BrandId = product.BrandId,
            CompanyId = product.CompanyId,
            // YENİ: Mevcut Resimleri DTO'dan alıp ViewModel'e atıyoruz
            ExistingImages = product.Images ?? new List<string>()
        };

        // Eğer Images listesi boşsa ama ImageUrl doluysa onu ekliyoruz (Eski kayıtlar için)
        if (!model.ExistingImages.Any() && !string.IsNullOrEmpty(product.ImageUrl))
        {
            model.ExistingImages.Add(product.ImageUrl);
        }

        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Update(UpdateProductViewModel model)
    {
        if (!ModelState.IsValid)
        {
            await LoadViewBags();
            return View(model);
        }

        // MULTIPART FORM DATA HAZIRLIĞI
        using var content = new MultipartFormDataContent();

        // Text Alanları
        content.Add(new StringContent(model.Name), nameof(ProductUpdateDto.Name));
        content.Add(new StringContent(model.Description ?? ""), nameof(ProductUpdateDto.Description));
        content.Add(new StringContent(model.Price.ToString()), nameof(ProductUpdateDto.Price));
        content.Add(new StringContent(model.Stock.ToString()), nameof(ProductUpdateDto.Stock));
        content.Add(new StringContent(model.CategoryId.ToString()), nameof(ProductUpdateDto.CategoryId));
        content.Add(new StringContent(model.BrandId.ToString()), nameof(ProductUpdateDto.BrandId));
        content.Add(new StringContent(model.CompanyId.ToString()), nameof(ProductUpdateDto.CompanyId));

        // YENİ: Dosyaları Ekliyoruz (Eğer varsa)
        if (model.Files != null && model.Files.Count > 0)
        {
            foreach (var file in model.Files)
            {
                var fileContent = new StreamContent(file.OpenReadStream());
                fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                // Backend DTO'daki isim "ImageFiles" olmalı
                content.Add(fileContent, "ImageFiles", file.FileName);
            }
        }


        // PUT İsteği
        var response = await _apiService.PutMultipartAsync<bool>($"Product/Update/{model.Id}", content);

        if (response != null && response.Success)
        {
            TempData["SuccessMessage"] = "Ürün başarıyla güncellendi.";
            return RedirectToAction("Index");
        }

        TempData["ErrorMessage"] = response?.Message ?? "Güncelleme sırasında hata oluştu.";
        await LoadViewBags();
        return View(model);
    }



    // ÜRÜN SİLME
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(Guid id)
    {

        var response = await _apiService.DeleteAsync($"Product/Delete/{id}");

        if (response != null && response.Success)
        {
            TempData["SuccessMessage"] = "Ürün başarıyla silindi.";
        }
        else
        {
            TempData["ErrorMessage"] = response?.Message ?? "Ürün silinemedi.";
        }

        return RedirectToAction(nameof(Index));
    }
}