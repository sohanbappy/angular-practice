import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = '/auth/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.apiUrl}`);
  }

  getProduct(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(`${this.apiUrl}/add`, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
