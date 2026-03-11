import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/models';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  editingProduct: Product | null = null;
  showForm = false;

  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    stockQuantity: 0,
    rating: 0,
    featured: false
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (p) => { this.products = p; this.loading = false; },
      error: () => this.loading = false
    });
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.showForm = true;
  }

  openNewForm(): void {
    this.editingProduct = null;
    this.newProduct = {
      name: '', description: '', price: 0, imageUrl: '',
      category: '', stockQuantity: 0, rating: 0, featured: false
    };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingProduct = null;
  }

  saveProduct(): void {
    if (this.editingProduct && this.editingProduct.id) {
      this.productService.updateProduct(this.editingProduct.id, this.editingProduct as Product).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelForm();
        }
      });
    } else {
      this.productService.createProduct(this.newProduct as Product).subscribe({
        next: () => {
          this.loadProducts();
          this.cancelForm();
        }
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts()
      });
    }
  }
}
