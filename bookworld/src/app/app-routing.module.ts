import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RequestComponent } from './components/request/request.component';
import { SignupComponent } from './components/signup/signup.component';

import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product-page/:id', component: ProductPageComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'details', component: OrderDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
