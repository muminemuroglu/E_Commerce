import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageUrlPipe } from '../../core/pipes/image-url.pipe';
import { FavoriteService } from '../../core/services/favorite-service.service';
import { CartService } from '../../core/services/cart-service.service';
import { Product } from '../../core/models/product';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageUrlPipe],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FavoritesComponent {
  constructor(
    public favoriteService: FavoriteService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  moveToCart(product: Product) {
    this.cartService.addToCart(product);
    // İsteğe bağlı: Sepete ekleyince favorilerden silsin mi? 
    // this.favService.toggleFavorite(product); 
    alert("Ürün sepete eklendi!");
    this.cdr.markForCheck();
  }
}