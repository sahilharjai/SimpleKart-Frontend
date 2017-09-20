import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { LandComponent } from './land.component';
import { ProductComponent } from './product.component';
import { CategoryComponent } from './category.component';
import { CartComponent } from './cart.component';
import { ProductResolver } from '../shared/services/resolvers/product-resolver.service';
import { CartResolver } from '../shared/services/resolvers/cart-resolver.service';
import { AuthComponent } from '../auth/auth.component';
import { UserCheckoutComponent } from './user-checkout.component';
import { UserResolver } from '../shared/services/resolvers/user-resolver.service';
import { OrderResolver } from '../shared/services/resolvers/order-resolver.service';
import { UserOrderComponent } from './user-order.component';
const routes: Routes = [

  { 
  	path: '',
  	component: HomeComponent, 
  	children: [
      { path: '', component: LandComponent },
      
      { path: 'product/:id', component: ProductComponent, resolve:{product: ProductResolver}},
      { path: 'order-detail', component: UserOrderComponent, resolve:{order: OrderResolver}},
      { path: 'category/:id', component: CategoryComponent},
      { path: 'user-checkout', component: UserCheckoutComponent, resolve:{user: UserResolver}},
      { path: 'cart', component: CartComponent, resolve:{cart: CartResolver}},
  	]
  },
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class HomeRoutingModule {}
