import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../core/services/order-service.service';


@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.orderService.getOrderById(id).subscribe({
        next: (res) => {
          this.order = res.data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }

  // Sipariş Durumuna Göre Progress Bar Class'ı
  getStatusClass(currentStatus: number, stepStatus: number): string {
    if (currentStatus >= stepStatus) return 'active';
    return '';
  }
}