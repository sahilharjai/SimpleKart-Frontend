import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { NoWhitespaceValidator } from '../shared/validators/whitespace.validator';
import { validateMobile } from '../shared/validators/mobile.validator';
import { Title, Meta } from '@angular/platform-browser';
import { ValidateEmail } from '../shared/validators/email.validator';
@Component({
  selector: 'register',
  template: `
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 login-form mx-auto float-none">                
                <!--Form with header-->
                <div class="card">
                    <div class="card-block">
                        <!--Header-->
                        <div class="form-header">
                            <h3>Register</h3>
                        </div>
                        <!--Body-->
                        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" novalidate>
                            <div class="md-form form-group" [class.has-danger]="userForm.get('first_name').errors && (userForm.get('first_name').dirty || userForm.get('first_name').touched)" 
                              [class.no-margin-bottom]="userForm.get('first_name').errors && (userForm.get('first_name').dirty || userForm.get('first_name').touched)">
                                <i class="fa fa-user prefix form-control-label"></i>
                                <input type="text" class="form-control input-field" id="first_name" formControlName="first_name">
                                <label class="form-control-label" for="first_name">Name</label>
                            </div>
                            <div *ngIf="userForm.get('first_name').errors && (userForm.get('first_name').dirty || userForm.get('first_name').touched)" class="feedback">
                              <span [hidden]="!userForm.get('first_name').errors.required">
                                Name is required
                              </span>
                              <span [hidden]="!userForm.get('first_name').errors.whitespace || userForm.get('first_name').errors.required">
                                No whitespaces
                              </span>
                            </div>

                           <!-- <div class="md-form form-group" [class.has-danger]="userForm.get('email').errors" 
                              [class.no-margin-bottom]="userForm.get('email').errors">
                                <input type="email" class="form-control input-field" id="email" formControlName="email">
                                <label class="form-control-label" for="email">Email</label>
                            </div>
                            <div *ngIf="userForm.get('email').errors" class="feedback">
                              <span [hidden]="!userForm.get('email').errors.duplicate">
                                Email already exists
                              </span>
                              <span [hidden]="!userForm.get('email').errors.incorrectMailFormat">
                                Invalid Email
                              </span>
                              
                            </div>-->

                            <div class="md-form form-group" [class.has-danger]="userForm.get('email').errors && (userForm.get('email').dirty || userForm.get('email').touched)" 
                              [class.no-margin-bottom]="userForm.get('email').errors && (userForm.get('email').dirty || userForm.get('email').touched)">
                                <i class="fa fa-envelope prefix form-control-label"></i>
                                <input type="text" class="form-control input-field" id="email" formControlName="email">
                                <label for="email" class="form-control-label">Your email</label>
                            </div>
                            <div *ngIf="userForm.get('email').errors && (userForm.get('email').dirty || userForm.get('email').touched)" class="feedback">
                              <span [hidden]="!userForm.get('email').errors.required">
                                Email is required
                              </span>
                              <span [hidden]="!userForm.get('email').errors.duplicate || userForm.get('email').errors.required">
                                Email already exists
                              </span>
               
                            </div>



                            <div class="md-form form-group" [class.has-danger]="userForm.get('mobile').errors && (userForm.get('mobile').dirty || userForm.get('mobile').touched)" 
                              [class.no-margin-bottom]="userForm.get('mobile').errors && (userForm.get('mobile').dirty || userForm.get('mobile').touched)">
                                <i class="fa fa-mobile prefix form-control-label"></i>
                                <input type="number" class="form-control input-field" id="mobile" formControlName="mobile">
                                <label for="mobile" class="form-control-label">Your mobile</label>
                            </div>
                            <div *ngIf="userForm.get('mobile').errors && (userForm.get('mobile').dirty || userForm.get('mobile').touched)" class="feedback">
                              <span [hidden]="!userForm.get('mobile').errors.required">
                                Mobile is required
                              </span>
                              <span [hidden]="!userForm.get('mobile').errors.duplicate || userForm.get('mobile').errors.required">
                                Mobile already exists
                              </span>
                              <span [hidden]="!userForm.get('mobile').errors.mobile || userForm.get('mobile').errors.required">
                                Mobile must be 10 characters long.
                              </span>
                            </div>
                            <div class="md-form form-group" [class.has-danger]="userForm.get('password').errors && (userForm.get('password').dirty || userForm.get('password').touched)" 
                              [class.no-margin-bottom]="userForm.get('password').errors && (userForm.get('password').dirty || userForm.get('password').touched)">
                                <i class="fa fa-lock prefix form-control-label"></i>
                                 <input type="password" class="form-control input-field" id="password" formControlName="password">
                                <label for="password" class="form-control-label">Your password</label>
                            </div>
                            <div *ngIf="userForm.get('password').errors && (userForm.get('password').dirty || userForm.get('password').touched)" class="feedback">
                              <span [hidden]="!userForm.get('password').errors.required">
                                Password is required
                              </span>
                              <span [hidden]="!userForm.get('password').errors.minlength || userForm.get('password').errors.required">
                                Minimum 6 characters
                              </span>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary" [disabled]="!userForm.valid">Create Account</button>
                            </div><br>
                            <div class="text-center" style="font-size:12px;">
                              <span>Already have an account? <a routerLink="/auth/login">Login</a></span>
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
export class RegisterComponent {

  userForm: FormGroup;
  isMobileValid:boolean = true;



  constructor(
  	private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private titleService:Title,
    private metaService: Meta,
    private authService: AuthService) { 

  	this.createForm();
    titleService.setTitle('Register | Say2Gov');
    metaService.addTag({type:'description', content:"SignUp to connect with your elected representatives, get involved in local issues, influence government decision-making & change the way Indian democracy works"});
  }

  asyncValidator(control: FormControl): {[key: string]: any} {
  	return new Promise (resolve => {
  		this.authService.checkMobile(control.value)
  		.then(res=>{
  			console.log(res);
  			if (res)
  				resolve({"duplicate": true})
  			else 
  				resolve(null); 
  		})
  	});
  }


  createForm() {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required,  NoWhitespaceValidator] ],
      last_name: '',
      email: ['', [Validators.required, ValidateEmail] ],
      mobile: ['', [Validators.required, validateMobile],[this.asyncValidator.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });
  }

  onSubmit() {
    console.log("hahaha",this.userForm.value)
  	this.authService.register(this.userForm.value).then(res=>{
  		if (res == true) {
  			this.authService.login(this.userForm.get('mobile').value, this.userForm.get('password').value)
  				.then(res=>{
  					if(res)
  						this.router.navigate([''], { relativeTo: this.route });
  				});
  		}
  		else
  			console.log(res);
  	})
  }
}