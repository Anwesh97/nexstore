import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.orderService.getOrdersByUserId(user.userId).subscribe({
        next: (orders) => { this.orders = orders; this.loading = false; },
        error: () => this.loading = false
      });
    } else {
      this.loading = false;
    }
  }

  getStatusClass(status: string): string {
    const map: { [key: string]: string } = {
      'PENDING': 'badge-warning',
      'CONFIRMED': 'badge-primary',
      'SHIPPED': 'badge-primary',
      'DELIVERED': 'badge-success',
      'CANCELLED': 'badge-danger'
    };
    return map[status] || 'badge-primary';
  }
}
