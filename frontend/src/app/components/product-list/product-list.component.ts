import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchQuery = '';
  sortBy = 'name';
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || '';
      this.searchQuery = params['search'] || '';
      this.loadProducts();
    });

    this.productService.getCategories().subscribe(cats => this.categories = cats);
  }

  loadProducts(): void {
    this.loading = true;
    if (this.searchQuery) {
      this.productService.searchProducts(this.searchQuery).subscribe({
        next: (p) => { this.products = p; this.applyFilters(); this.loading = false; },
        error: () => this.loading = false
      });
    } else if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe({
        next: (p) => { this.products = p; this.applyFilters(); this.loading = false; },
        error: () => this.loading = false
      });
    } else {
      this.productService.getAllProducts().subscribe({
        next: (p) => { this.products = p; this.applyFilters(); this.loading = false; },
        error: () => this.loading = false
      });
    }
  }

  applyFilters(): void {
    let result = [...this.products];
    if (this.selectedCategory && !this.searchQuery) {
      result = result.filter(p => p.category === this.selectedCategory);
    }
    switch (this.sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => a.name.localeCompare(b.name));
    }
    this.filteredProducts = result;
  }

  filterByCategory(cat: string): void {
    this.selectedCategory = cat === this.selectedCategory ? '' : cat;
    this.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
