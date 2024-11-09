import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  standalone: true,  // Mark as standalone component
  imports: [ReactiveFormsModule, CommonModule]  // Add ReactiveFormsModule and CommonModule here
})
export class UpdateProductComponent implements OnInit {
    productForm: FormGroup;
    productId: number | undefined; // Allow the productId to be undefined initially
  
    constructor(
      private fb: FormBuilder,
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.productForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]]
      });
    }
  
    ngOnInit() {
      this.productId = +this.route.snapshot.paramMap.get('id')!;
      this.productService.getProduct(this.productId).subscribe((product: any) => {
        this.productForm.patchValue(product);
      });
    }
  
    onSubmit() {
        if (this.productForm.valid && this.productId !== undefined) {
          this.productService.updateProduct(this.productId, this.productForm.value).subscribe(() => {
            this.router.navigate(['/products']);
          });
        }
      }
      
  
    editProduct(id: number) {
      this.router.navigate(['/edit-product', id]);
    }
  }
  