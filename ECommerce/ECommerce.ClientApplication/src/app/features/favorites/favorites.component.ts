import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Product } from '../../core/models/product';
import { FavoriteService } from '../../core/services/favorite-service.service';
import { CartService } from '../../core/services/cart-service.service';
import { ImageUrlPipe } from '../../core/pipes/image-url.pipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule,ImageUrlPipe],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  constructor(
    public favService: FavoriteService,
    private cartService: CartService
  ) {}

  moveToCart(product: Product) {
    this.cartService.addToCart(product);
    // İsteğe bağlı: Sepete ekleyince favorilerden silsin mi? 
    // this.favService.toggleFavorite(product); 
    alert("Ürün sepete eklendi!");
  }
}