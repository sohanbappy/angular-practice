import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/public-info', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'public-info', loadComponent: () => import('./components/public-info/public-info.component').then(m => m.PublicInfoComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
  { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard] },
  { path: 'products', loadComponent: () => import('./components/product/product-list/product-list.component').then(m => m.ProductListComponent), canActivate: [AuthGuard] },
  { path: 'create-product', loadComponent: () => import('./components/product/create-product/create-product.component').then(m => m.CreateProductComponent), canActivate: [AuthGuard] },
  { path: 'edit-product/:id', loadComponent: () => import('./components/product/update-product/update-product.component').then(m => m.UpdateProductComponent), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/public-info' },
];
