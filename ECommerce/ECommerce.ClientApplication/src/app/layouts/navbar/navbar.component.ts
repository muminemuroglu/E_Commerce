import { Component, OnInit,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Router Eklendi
import { FormsModule } from '@angular/forms'; // FormsModule Eklendi
import { AuthService } from '../../core/services/auth-service.service';
import { CartService } from '../../core/services/cart-service.service';
import { Category } from '../../core/models/category';
import { CategoryService } from '../../core/services/category-service.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // FormsModule'u eklemeyi unutma!
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class Navbar implements OnInit {
  
  searchKeyword: string = ''; // Arama metnini tutacak değişken
  categories: Category[] = []; // Kategorileri tutacak dizi

  constructor(
    public authService: AuthService, 
    public cartService: CartService,
    private categoryService: CategoryService,
    private router: Router, // Router inject edildi
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data || [];
        this.cdr.detectChanges();
      }
    });
  }

  onSearch() {
    if (this.searchKeyword && this.searchKeyword.trim().length > 0) {
      // Ürünler sayfasına 'keyword' parametresiyle git
      this.router.navigate(['/products'], { 
        queryParams: { keyword: this.searchKeyword } 
      });
      // Arama sonrası kutuyu temizlemek istersen:
       this.searchKeyword = '';
      this.cdr.detectChanges();
    }
  }
  // navbar.component.ts içine ekleyin
getCategoryIcon(name: string): string {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('telefon')) return 'bi-phone';
  if (lowerName.includes('bilgisayar') || lowerName.includes('laptop')) return 'bi-laptop';
  if (lowerName.includes('tv') || lowerName.includes('ses')) return 'bi-tv';
  if (lowerName.includes('ev') || lowerName.includes('beyaz eşya')) return 'bi-house-heart';
  if (lowerName.includes('aksesuar')) return 'bi-headphones';
  if (lowerName.includes('oyun') || lowerName.includes('konsol')) return 'bi-controller';
  if (lowerName.includes('saat')) return 'bi-watch';
  return 'bi-grid'; // Varsayılan ikon
}


}