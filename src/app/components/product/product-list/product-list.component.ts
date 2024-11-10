import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.products;
      this.filteredProducts = [...this.products]; // Initialize filtered products
    });
  }

  addProduct() {
    this.router.navigate(['/create-product']);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
        this.loadProducts();
      });
    }
  }

  editProduct(id: number) {
    this.router.navigate(['/edit-product', id]);
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data.products;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.productService.searchProducts(this.searchQuery).subscribe((data) => {
        this.products = data.products;
      });
    } else {
      this.fetchProducts(); // Reload all products if search is cleared
    }
  }

  onSort(): void {
    this.products.sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;
      return this.sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
    });
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

}
