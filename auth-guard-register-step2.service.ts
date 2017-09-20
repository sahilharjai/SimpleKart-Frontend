import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Route
}                           from '@angular/router';

import { AuthUserService } from '../auth-user.service';

@Injectable()
export class AuthGuardRegisterStep2 implements CanActivate{
  constructor(
   private router: Router,
   private authUserService: AuthUserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    var ans:boolean = this.checkLoginStatus(url);
    return ans;
  }

  checkLoginStatus(url: string): boolean {
    if (this.authUserService.isLoggedIn) {
        if (this.authUserService.reg_complete) {
            if(this.authUserService.isEr)
              this.router.navigateByUrl('/er');
            else
              this.router.navigateByUrl('/citizen');
        }
        else {
            if(this.authUserService.reg_stage == 3) {
              this.router.navigateByUrl('/auth/register-step3');
            }
            else if (this.authUserService.reg_stage == 2) {
              return true;
            }
            else {
              this.router.navigateByUrl('');
            }
        }
        return false;
    }
    else{
      this.router.navigateByUrl('/auth/register');
      return false;
    }        
  }
}