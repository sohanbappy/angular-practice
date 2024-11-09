import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.products;
    });
  }

  addProduct() {
    this.router.navigate(['/create-product']);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }

  editProduct(id: number) {
    this.router.navigate(['/edit-product', id]);
  }
}
