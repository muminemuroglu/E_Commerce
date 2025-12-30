using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.AdminPanel.Models.Products;

public class CreateProductViewModel
{
    [Required(ErrorMessage = "Ürün adı zorunludur.")]
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; }= string.Empty;

    [Required(ErrorMessage = "Fiyat zorunludur.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Fiyat 0'dan büyük olmalıdır.")]
    public decimal Price { get; set; }

    [Required(ErrorMessage = "Stok adedi zorunludur.")]
    [Range(0, int.MaxValue, ErrorMessage = "Stok negatif olamaz.")]
    public int Stock { get; set; }

    [Required(ErrorMessage = "Lütfen bir kategori seçin.")]
    public Guid CategoryId { get; set; }

    


    // Görsel yükleme desteği (Şablondaki input type="file" için)
    public List<IFormFile>? Files { get; set; }
}