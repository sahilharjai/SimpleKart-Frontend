import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing-module';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { LandComponent } from './land.component';
import { RatingModule } from "ng2-rating";
import { ProductResolver } from '../shared/services/resolvers/product-resolver.service';
import { ProductComponent } from './product.component';
import { CategoryComponent } from './category.component';
import { CartComponent } from './cart.component';
import { CartResolver } from '../shared/services/resolvers/cart-resolver.service';
import { AuthComponent } from '../auth/auth.component';
import { cartCountService } from '../global.service';
import { UserCheckoutComponent } from './user-checkout.component';
import { UserResolver } from '../shared/services/resolvers/user-resolver.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserOrderComponent } from './user-order.component';
import { OrderResolver } from '../shared/services/resolvers/order-resolver.service';

@NgModule({
  declarations: [
    HomeComponent,
    LandComponent,
    ProductComponent,
    CategoryComponent,
    CartComponent,
    UserCheckoutComponent,
    UserOrderComponent


  ],
  imports: [
    CommonModule,
    RatingModule, 
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  cartCountService,
  ProductResolver,
  CartResolver,
  UserResolver,
  OrderResolver

  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
