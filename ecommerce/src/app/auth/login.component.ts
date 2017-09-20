import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthUserService } from '../auth-user.service';
import { Title, Meta } from '@angular/platform-browser';


export class User {
  username: string;
  password: string;
}

@Component({
  selector: 'login',
  template: `
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-10 col-lg-8 login-form mx-auto float-none">                
                <!--Form with header-->
                <div class="card">
                    <div class="card-block">
                        <!--Header-->
                        <div class="form-header">
                            <h3>Login</h3>
                        </div>
                        <!--Body-->
                        <form #loginForm="ngForm" (ngSubmit)="save(loginForm, loginForm.valid)">
                            <div *ngIf="attempted" class="alert alert-danger margin-bottom-button">
                                <span>
                                  Invalid credentials. Please try again.
                                </span>
                            </div>
                            <div class="md-form form-group" [class.has-danger]="username.errors && (username.dirty || username.touched)" [class.no-margin-bottom]="username.errors && (username.dirty || username.touched)">
                                <i class="fa fa-mobile prefix form-control-label"></i>
                                <input type="number" min="10" max="10" class="form-control form-control-danger input-field" name="username" [(ngModel)]="user.username" #username="ngModel" 
                                    id="username"  required>
                                <label for="username" class="form-control-label">Mobile</label>
                            </div>
                            <div *ngIf="username.errors && (username.dirty || username.touched)" class="feedback">
                              <span [hidden]="!username.errors.required">
                                Mobile is required
                              </span>
                              <span [hidden]="!username.errors.mobile || username.errors.required">
                                Mobile number should be 10 digits long
                              </span>
                            </div>
                            <div class="md-form">
                                <i class="fa fa-lock prefix"></i>
                                <input type="password" class="form-control" name="password"
                                      [(ngModel)]="user.password" #password="ngModel" id="password" required>
                                <label for="password">Password</label>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary" [disabled]="!loginForm.form.valid">Login</button>                              
                            </div>
                            <div class="text-center" style="font-size:12px;">
                              <a routerLink="/auth/forgot-password">Forgot password?</a>
                            </div><br>
                            <div class="text-center" style="font-size:12px;">
                              <span>New User? <a routerLink="/auth/register">Register</a></span>
                            </div>
                        </form>
                    </div>
                </div>
                <!--/Form with header-->
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./auth.css']
})
export class LoginComponent implements OnInit{
  
  user: User;
  attempted: boolean;

  constructor(
    private router: Router,
    private titleService:Title,
    private metaService: Meta,
    private authService: AuthService,
    private authUserService: AuthUserService) { }

  ngOnInit(){
  	this.user = {
  		username:"",
  		password:""
  	};
    this.titleService.setTitle('Login');
    this.metaService.addTag({type:'description', content:"Login to buy somethings"});
  }

  save(model: any, isValid: boolean) {
    this.authService.login(model.value.username, model.value.password).then(res=>{ 
      if (res === true) {
        if(localStorage.getItem('navigate_to_address')=='true')
          {
            localStorage.removeItem('navigate_to_address')
            this.router.navigate(['./user-checkout']);
          }
        else
          {
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
            let navigationExtras: NavigationExtras = {
              queryParamsHandling: 'merge',
              preserveFragment: true
            };
            this.router.navigate([redirect], navigationExtras);
        }
      }
      else
      {
        this.attempted = true;
        this.user.password ="";
      }
    });
  }
}