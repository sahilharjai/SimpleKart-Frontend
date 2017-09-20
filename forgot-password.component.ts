import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'forgot-password',
  template: `
<ng-container *ngIf=" !(step == 4) ">
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 login-form mx-auto float-none">                
                <!--Form with header-->
                <div class="card">
                    <div class="card-block">
                        <div class="form-header">
                            <h3>Forgot Password</h3>
                        </div>
                        <!--Body-->
                        <div *ngIf="step == 1 ">
                            <form #mobileForm="ngForm" (ngSubmit)="step1(mobileForm)">
                                <h4>Please enter your registered mobile</h4>
                                <div *ngIf="attempted_step1" class="alert alert-danger margin-bottom-button">
                                    <span>
                                      This mobile is not registered
                                    </span>
                                    <a routerLink="../register" class="pull-right">Register</a>                                   
                                </div>
                                <div class="md-form form-group" [class.has-danger]="mobile.errors && (mobile.dirty || mobile.touched)" [class.no-margin-bottom]="mobile.errors && (mobile.dirty || mobile.touched)">
                                    <i class="fa fa-mobile prefix form-control-label"></i>
                                    <input type="number" class="form-control input-field" name="mobile" 
                                           ngModel #mobile="ngModel" id="mobile" minlength="10" maxlength="10" required validateMobile>
                                    <label for="mobile" class="form-control-label">Your mobile</label>
                                </div>
                                <div *ngIf="mobile.errors && (mobile.dirty || mobile.touched)" class="feedback">
                                      <span [hidden]="!mobile.errors.required">
                                          Mobile is required
                                      </span>
                                      <span [hidden]="!mobile.errors.mobile || mobile.errors.required">
                                        Mobile number should be 10 digits long
                                      </span>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary" [disabled]="!mobileForm.form.valid">Send OTP</button>
                                </div>
                            </form>
                        </div>
                        <div *ngIf="step == 2 ">
                            <form #otpForm="ngForm" (ngSubmit)="step2(otpForm)">
                                <div class="alert alert-success" *ngIf="!attempted_step2">
                                    <span>
                                      OTP is sent to your mobile: {{mobile}}
                                    </span>
                                </div>
                                <h4>Please Enter the OTP</h4>
                                <div *ngIf="attempted_step2" class="alert alert-danger margin-bottom-button">
                                    <span>
                                      Wrong OTP
                                    </span>
                                </div>
                                <div class="md-form form-group" [class.has-danger]="otp.errors && (otp.dirty || otp.touched)" [class.no-margin-bottom]="otp.errors && (otp.dirty || otp.touched)">
                                    <i class="fa fa-mobile prefix form-control-label"></i>
                                    <input type="text" class="form-control input-field" name="otp" 
                                            ngModel #otp="ngModel" id="otp" required>
                                    <label for="otp" class="form-control-label">Enter OTP</label>
                                </div>
                                <div *ngIf="otp.errors && (otp.dirty || otp.touched)" class="feedback">
                                      <span [hidden]="!otp.errors.required">
                                          OTP is required
                                      </span>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary" [disabled]="!otpForm.form.valid">Verify</button>
                                </div>
                            </form>
                        </div>
                        <div *ngIf="step == 3 ">
                            <form #passwordForm="ngForm" (ngSubmit)="step3(passwordForm)">
                                <h4>Please set New Password</h4>
                                <div *ngIf="attempted_step3" class="alert alert-danger">
                                    <span>
                                      Unable to change password
                                    </span>
                                </div>
                                <div class="md-form form-group" [class.has-danger]="password.errors && (password.dirty || password.touched)" [class.no-margin-bottom]="password.errors && (password.dirty || password.touched)">
                                    <i class="fa fa-lock prefix form-control-label"></i>
                                    <input type="password" class="form-control input-field" name="password" 
                                          ngModel #password="ngModel" id="password" required>
                                    <label for="password" class="form-control-label">New Password</label>
                                </div>
                                <div *ngIf="password.errors && (password.dirty || password.touched)" class="feedback">
                                      <span [hidden]="!password.errors.required">
                                          Please enter the password 
                                      </span>
                                </div>
                                <div class="md-form form-group" [class.has-danger]="re_password.errors && (re_password.dirty || re_password.touched)" [class.no-margin-bottom]="re_password.errors && (re_password.dirty || re_password.touched)">
                                    <i class="fa fa-lock prefix form-control-label"></i>
                                    <input type="password" class="form-control" name="re_password" 
                                          ngModel #re_password="ngModel" id="re_password" required validateEqual="password" reverse="false">
                                    <label for="re_password" class="form-control-label">Re-enter Password</label>
                                </div>
                                <div *ngIf="re_password.errors && (re_password.dirty || re_password.touched)" class="feedback">
                                      <span [hidden]="!re_password.errors.required">
                                          Please enter the password 
                                      </span>
                                      <span [hidden]="re_password.errors.validateEqual || re_password.errors.required">
                                          Passwords do not match
                                      </span>
                                </div>
                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary" [disabled]="!passwordForm.form.valid">Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</ng-container>

<ng-container *ngIf="step == 4 ">
  <login></login>
</ng-container>
  `,
  styleUrls: ['./auth.css']
})
export class ForgotPasswordComponent implements OnInit{
  
  step: number = 1;
  mobile: string;
  attempted_step1 :boolean = false;
  attempted_step2:boolean = false;
  attempted_step3:boolean = false;

  constructor(
    private router: Router,
    private titleService:Title,
    private metaService: Meta,
    private authService: AuthService) { }

  ngOnInit(){
    this.titleService.setTitle("Forgot Password | Say2Gov");
    this.metaService.addTag({type:'description', content:""});
  }

  step1(form:any) {
    this.mobile = form.value.mobile;
    this.authService.forgot_password(this.mobile).then(res => {
        if (res) {
          this.step = 2;
        }
        else {
          this.attempted_step1 = true;
        }
    });

  }

  step2(form:any) {
    this.authService.forgot_password_verify_otp(this.mobile, form.value.otp).then(res => {
        if (res) {
          this.step = 3;
        }
        else {
          this.attempted_step2 = true;
          form.reset();
        }
    });
  }

  step3(form:any) {
    console.log(form.value);
    this.authService.forgot_password_new_passowrd(this.mobile, form.value.password, form.value.re_password).then(res => {
        if (res) {
          this.step = 4;
        }
        else {
          this.attempted_step3 = true;
        }
    });
  }
}