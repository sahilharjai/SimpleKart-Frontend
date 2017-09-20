import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthUserService } from '../../../auth-user.service'

@Injectable()
export class CartResolver implements Resolve<any> {
  constructor(private cartService: CartService, private authUserService: AuthUserService,private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.cartService.getCart(this.authUserService.cart_id)
  }
}