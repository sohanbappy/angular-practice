import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';


export const routes: Routes = [
  { path: '', redirectTo: '/public-info', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'public-info', 
    loadComponent: () => import('./public-info/public-info.component').then(m => m.PublicInfoComponent) 
  },
  { 
    path: 'about', 
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent) 
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  //CRUD for product
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard] },
  { path: 'edit-product/:id', component: UpdateProductComponent, canActivate: [AuthGuard] },

  //default
  { path: '**', redirectTo: '/public-info' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

