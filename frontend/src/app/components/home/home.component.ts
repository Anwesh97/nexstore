import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories: string[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.loading = false;
      },
      error: () => this.loading = false
    });

    this.productService.getCategories().subscribe({
      next: (cats) => this.categories = cats
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  browseCategory(cat: string): void {
    this.router.navigate(['/products'], { queryParams: { category: cat } });
  }

  getCategoryIcon(cat: string): string {
    const icons: { [key: string]: string } = {
      'Laptops': '💻', 'Smartphones': '📱', 'Audio': '🎧',
      'Tablets': '📟', 'TVs': '📺', 'Gaming': '🎮',
      'Wearables': '⌚', 'Cameras': '📷', 'Home': '🏠'
    };
    return icons[cat] || '📦';
  }
}
