import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  Product,
  BrandFilter,
  ProductFilterParams,
} from '../../core/models/product';
import { Category } from '../../core/models/category';
import { ImageUrlPipe } from '../../core/pipes/image-url.pipe';
import { ProductService } from '../../core/services/productService.service';
import { CategoryService } from '../../core/services/category-service.service';
import { CartService } from '../../core/services/cart-service.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ImageUrlPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductListComponent implements OnInit {
  // Veriler
  products: Product[] = [];
  categories: Category[] = [];
  availableBrands: BrandFilter[] = [];
  totalCount = 0;
  loading = true;

  // Filtre Durumu (State)
  filter: ProductFilterParams = {
    pageNumber: 1,
    pageSize: 12,
    sortBy: 'newest',
    brandIds: [],
    minPrice: undefined,
    maxPrice: undefined,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // 1. Kategorileri Çekiyoruz (Sol Menü İçin)
    this.loadCategories();

    // 2. URL'deki parametreleri dinliyoruz (Linkten gelirse filtreyi uyguluyoruz)
    this.route.queryParams.subscribe((params) => {
      this.filter.categoryId = params['categoryId'] || null;
      this.filter.keyword = params['keyword'] || null;

      // Filtreleri uyguluyoruz ve ürünleri çekiyoruz
      this.loadProducts();
      this.cdr.detectChanges();
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res.data || [];
      this.cdr.detectChanges();
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getFilteredProducts(this.filter).subscribe({
      next: (res) => {
        this.products = res.products;
        this.totalCount = res.totalCount;
        this.availableBrands = res.availableBrands; // Backend'den gelen marka sayıları
        this.loading = false;
        this.cdr.detectChanges();

        // Sayfa başına dön
        window.scrollTo(0, 0);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
    this.cdr.detectChanges();
  }

  // --- FİLTRE OLAYLARI ---

  // Kategori Değişimi
  onCategoryChange(categoryId: string | null) {
    this.filter.categoryId = categoryId ? categoryId : undefined;
    this.filter.pageNumber = 1; // Filtre değişince ilk sayfaya dönüyoruz
    this.loadProducts();
    this.cdr.detectChanges();
  }

  // Marka Seçimi (Checkbox)
  toggleBrand(brandId: string, event: any) {
    const checked = event.target.checked;

    if (!this.filter.brandIds) this.filter.brandIds = [];

    if (checked) {
      this.filter.brandIds.push(brandId);
    } else {
      this.filter.brandIds = this.filter.brandIds.filter(
        (id) => id !== brandId,
      );
    }

    this.filter.pageNumber = 1;
    this.loadProducts();
    this.cdr.detectChanges();
  }

  // Sıralama Değişimi
  onSortChange(event: any) {
    this.filter.sortBy = event.target.value;
    this.loadProducts();
    this.cdr.detectChanges();
  }

  // Sayfalama
  changePage(page: number) {
    this.filter.pageNumber = page;
    this.loadProducts();
    this.cdr.detectChanges();
  }

  // Sepete Ekle
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cdr.detectChanges();
    alert('Ürün sepete eklendi');
  }

  // Fiyat Filtresini Uygula Butonu
  applyPriceFilter() {
    this.filter.pageNumber = 1;
    this.loadProducts();
    this.cdr.detectChanges();
  }

  // Filtreleri Temizliyoruz
  clearFilters() {
    this.filter = {
      pageNumber: 1,
      pageSize: 12,
      sortBy: 'newest',
      brandIds: [],
    };
    // URL'i de temizliyrouz
    this.router.navigate(['/products']);
    this.loadProducts();
    this.cdr.detectChanges();
  }
}
