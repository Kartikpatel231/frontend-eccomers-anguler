import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import {Routes,RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './common/customer/customer.component';
import { OrderComponent } from './common/order/order.component';
import { OrderItemComponent } from './common/order-item/order-item.component';
import { AddressComponent } from './common/address/address.component';
import { PurchaseComponent } from './common/purchase/purchase.component';

const routes: Routes=[
{path:'cart-details',component:CartDetailsComponent},
{path:'checkout',component:CheckoutComponent},

{path:'products/list/:id',component:ProductDetailsComponent},
{path:'search/:keyword',component:ProductListComponent},
{path:'category/:id',component:ProductListComponent},
{path:'category',component:ProductListComponent},
{path:'products',component:ProductListComponent},
{path:'',redirectTo:'/products',pathMatch:'full'},
{path:'**',redirectTo:'/products',pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    CustomerComponent,
    OrderComponent,
    OrderItemComponent,
    AddressComponent,
    PurchaseComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
