import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductPageComponent } from './product-page/product-page.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CheckoutProductCardComponent } from './checkout-product-card/checkout-product-card.component';
import { Main } from './main/main.component';
import { MainPageProductsComponent } from './main-page-products/main-page-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    FooterComponent,
    ProductCardComponent,
    ProductPageComponent,
    LoginComponent,
    RegisterComponent,
    CollectionsComponent,
    CollectionCardComponent,
    CollectionPageComponent,
    CheckoutPageComponent,
    CheckoutProductCardComponent,
    Main,
    MainPageProductsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
