import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // Router Eklendi
import { FormsModule } from '@angular/forms'; // FormsModule Eklendi
import { AuthService } from '../../core/services/auth-service.service';
import { CartService } from '../../core/services/cart-service.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // FormsModule'u eklemeyi unutma!
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class Navbar {
  
  searchKeyword: string = ''; // Arama metnini tutacak değişken

  constructor(
    public authService: AuthService, 
    public cartService: CartService,
    private router: Router // Router inject edildi
  ) {}

  onSearch() {
    if (this.searchKeyword && this.searchKeyword.trim().length > 0) {
      // Ürünler sayfasına 'keyword' parametresiyle git
      this.router.navigate(['/products'], { 
        queryParams: { keyword: this.searchKeyword } 
      });
      // Arama sonrası kutuyu temizlemek istersen:
       this.searchKeyword = ''; 
    }
  }
}