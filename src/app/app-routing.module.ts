import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'checkout', component: CheckoutPageComponent
  },
  {
    path: ':url', component: CollectionPageComponent
  },
  {
    path: ':url/:product', component: ProductPageComponent
  },
  {
    path: '**', component: ErrorpageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
