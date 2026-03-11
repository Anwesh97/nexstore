import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { CartItem, OrderRequest } from '../../models/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = [];
  shippingAddress = '';
  placing = false;
  orderPlaced = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(items => this.cartItems = items);
  }

  get total(): number {
    return this.cartService.getCartTotal();
  }

  updateQty(productId: number, qty: number): void {
    this.cartService.updateQuantity(productId, qty);
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  placeOrder(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user || !this.shippingAddress.trim()) return;

    this.placing = true;
    const order: OrderRequest = {
      userId: user.userId,
      userEmail: user.email,
      shippingAddress: this.shippingAddress,
      items: this.cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        imageUrl: item.product.imageUrl
      }))
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.orderPlaced = true;
        this.placing = false;
      },
      error: () => this.placing = false
    });
  }
}
