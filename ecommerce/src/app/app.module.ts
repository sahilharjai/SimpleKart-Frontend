import { BrowserModule } from '@angular/platform-browser';
import { NgModule , APP_INITIALIZER} from '@angular/core';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from './shared/services/products.service'
import { FormsModule} from '@angular/forms';
import { Http, HttpModule } from '@angular/http'
import { CategoryService } from './shared/services/category.service'
import { CartService } from './shared/services/cart.service' 	
import { AuthUserService } from './auth-user.service';
import { UserAddressService } from './shared/services/user-address.service'
import { Title } from '@angular/platform-browser';
import { AuthModule } from './auth/auth.module';
import { OrderService } from './shared/services/order.service'
export function authUserFactory (authUserService: AuthUserService,  http: Http) {
    return ()=>authUserService.authenticate();
};
  

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AuthModule,
  ],
  providers: [
  ProductService,
  CategoryService,
  CartService,
   AuthUserService,
   UserAddressService,
   OrderService,
Title, 
    {
      provide: APP_INITIALIZER,
      useFactory: authUserFactory,
      deps: [AuthUserService, Http ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
