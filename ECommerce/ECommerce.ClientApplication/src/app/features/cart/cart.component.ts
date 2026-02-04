import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem, CartService } from '../../core/services/cart-service.service';
import { ImageUrlPipe } from '../../core/pipes/image-url.pipe';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ImageUrlPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent {
product: any;
  constructor(
    private cdr: ChangeDetectorRef,
    public cartService: CartService
  ) { }

  // Miktar Azalt (- Butonu)
  decrease(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateStorage(); // Servis'e bu metodu ekleyeceğiz
    } else {
      this.cartService.removeFromCart(item.product.id);
      this.cdr.detectChanges();
    }
  }

  // Miktar Artır (+ Butonu)
  increase(item: CartItem) {
    item.quantity++;
    this.cartService.updateStorage();
    this.cdr.detectChanges();
  }

  // Sil (Çöp Kutusu)
  remove(id: string) {
    if (confirm('Ürünü sepetten çıkarmak istiyor musunuz?')) {
      this.cartService.removeFromCart(id);
      this.cdr.detectChanges();
    }
  }
}