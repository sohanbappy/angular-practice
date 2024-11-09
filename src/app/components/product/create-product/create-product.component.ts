import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule for basic directives

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  standalone: true,  // Mark as standalone component
  imports: [ReactiveFormsModule, CommonModule],  // Add ReactiveFormsModule and CommonModule here
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Getters for form fields to easily access in the template
  get title() {
    return this.productForm.get('title');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.createProduct(this.productForm.value).subscribe({
        next: () => {
          alert('Product added successfully!');
          console.log('Product added successfully, redirecting to list.');
          this.router.navigate(['/products']);
          this.productForm.reset();  // Reset form after successful submission
        },
        error: (err) => {
          console.error('Error creating product:', err);
        }
      });
    }
  }
}
