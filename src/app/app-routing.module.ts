import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'order-success', component: OrderSuccessComponent },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AdminAuthGuardService],
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService],
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AdminAuthGuardService],
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AdminAuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
