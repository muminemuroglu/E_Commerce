import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth-service.service';
import { CartService } from '../../core/services/cart-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class Navbar {
  // HTML'de direkt erişmek için servisi public yapıyoruz
  constructor(public authService: AuthService, public cartService: CartService) {}
}