import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'register-step2',
  template:`
	<div class="container">
	    <div class="row">
	        <div class="col-12 col-md-8 col-lg-6 login-form mx-auto float-none">                
	            <div class="card">
	                <div class="card-block">
	                	<div class="form-header">
                            <h3>Verification</h3>
                        </div>
	                    <!--Body-->
	                    <div *ngIf="step == 1 ">
	                        <form #otpForm="ngForm" (ngSubmit)="sendOtp(otpForm)">
	                        	<div class="alert alert-success" *ngIf="!otp_error">
                                    <span>OTP has been <ng-container *ngIf="show_resend_message">re</ng-container>sent to your mobile</span>
                                </div>
	                            <h4>Please Enter the OTP &nbsp;&nbsp;&nbsp;<a (click)="step=2" style="font-size:12px;color:#03a9f4;">Change Number</a></h4>
	                            <div *ngIf="otp_error" class="alert alert-danger margin-bottom-button">
	                                <span>
	                                  Wrong OTP
	                                </span>
	                            </div>
	                            <div class="md-form form-group" [class.has-danger]="otp.errors && (otp.dirty || otp.touched)" 
	                            		[class.no-margin-bottom]="otp.errors && (otp.dirty || otp.touched)">
	                                <i class="fa fa-mobile prefix form-control-label"></i>
	                                <input type="text" class="form-control input-field" name="otp" 
	                                  ngModel #otp="ngModel" id="otp" required>
	                                <label class="form-control-label" for="otp">Enter OTP</label>
	                            </div>
	                            <div *ngIf="otp.errors && (otp.dirty || otp.touched)" class="feedback">
	                              <span [hidden]="!otp.errors.required">
	                                OTP is required
	                              </span>
	                            </div>
	                            <div class="text-center">
	                                <button type="submit" class="btn btn-primary">Verify</button>
	                                <button type="button" class="btn btn-info" (click)="resendOtp()" [disabled]="resend_count>2">Resend OTP</button>
	                            </div>
	                        </form>
	                    </div>
	                    <div *ngIf="step == 2 ">
	                        <form #mobileForm="ngForm" (ngSubmit)="changeNumber(mobileForm)">
	                            <h4>Please enter new mobile</h4>
	                            <div *ngIf="show_mobile_exists" class="alert alert-danger margin-bottom-button">
	                                <span>
	                                  Mobile already exists
	                                </span>
	                            </div>
	                            <div class="md-form form-group" [class.has-danger]="new_mobile.errors && (new_mobile.dirty || new_mobile.touched)" 
	                            		[class.no-margin-bottom]="new_mobile.errors && (new_mobile.dirty || new_mobile.touched)">
	                                <i class="fa fa-mobile prefix form-control-label"></i>
	                                <input type="number" class="form-control input-field" name="new_mobile" 
	                                   ngModel #new_mobile="ngModel" id="new_mobile" required validateMobile>
	                                <label class="form-control-label" for="new_mobile">New number</label>
	                            </div>
	                            <div *ngIf="new_mobile.errors && (new_mobile.dirty || new_mobile.touched)" class="feedback">
	                              <span [hidden]="!new_mobile.errors.required">
	                                Mobile is required
	                              </span>
	                              <span [hidden]="!new_mobile.errors.mobile || new_mobile.errors.required">
	                                Mobile number should be 10 digits long
	                              </span>
	                            </div>
	                            <div class="text-center">
	                                <button type="submit" class="btn btn-primary">Change Number</button>
	                                <button type="button" class="btn btn-info" (click)="step=1">Back</button>
	                            </div>
	                        </form>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
  `,
  styleUrls: ['./auth.css']
})
export class RegisterStep2Component {

  step: number = 1;
  otp_error:boolean = false;
  resend_count = 0;
  show_resend_message:boolean = false;
  show_mobile_exists:boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService:Title,
    private metaService: Meta,
    private authService: AuthService) { 

  	titleService.setTitle('Verify | Say2Gov');
    metaService.addTag({type:'description', content:"SignUp to connect with your elected representatives, get involved in local issues, influence government decision-making & change the way Indian democracy works"});
  }


  sendOtp(model:any) {
  	this.authService.register_step2(model.value).then(res=>{
  		if(res){
  			this.router.navigate(['../register-step3'], {relativeTo:this.route}); //Not working
  		}
  		else {
  			this.otp_error = true;
  			model.reset();
  		}
  	});
  }

  resendOtp() {
  	this.authService.resend_otp().then(res=>{
  		if(res){
  			this.show_resend_message = true;
  			this.resend_count++;
  			this.otp_error = false;
  		}
  	});
  }

  changeNumber(model:any) {
  	this.authService.change_mobile(model.value).then(res=>{
  		if(res){
  			this.authService.createToken(model.value.new_mobile).then(result=>{
  				if(result){
  					this.step = 1;
  					this.otp_error = false;
  					this.show_mobile_exists = false;
  				}
  			})
  		}
  		else
  			this.show_mobile_exists = true;
  	});	

  }

}



