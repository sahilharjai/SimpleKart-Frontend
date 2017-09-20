import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { UserAddressService } from '../user-address.service';
import { AuthUserService } from '../../../auth-user.service'



@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private userService: UserAddressService, private router: Router,private authUserService: AuthUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return this.userService.getUser(this.authUserService.user_id.toString())
  }
}