import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services and Guards
import { ProductService } from './services/product.service';
import { AuthGuard } from './guards/auth.guard';
import { routes } from './app.route';

// Import routes from the new routes file

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)  // Use the imported routes
  ],
  providers: [ProductService, AuthGuard],
  bootstrap: [/* Your root component */]
})
export class AppModule {}
