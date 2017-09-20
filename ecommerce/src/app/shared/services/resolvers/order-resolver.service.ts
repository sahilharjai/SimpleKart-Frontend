import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '../order.service';
import { AuthUserService } from '../../../auth-user.service'

@Injectable()
export class OrderResolver implements Resolve<any> {
  constructor(private orderService: OrderService, private authUserService: AuthUserService,private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.orderService.retrieveOrder(this.authUserService.user_id)
  }
}