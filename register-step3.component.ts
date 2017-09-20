import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { GeoService } from '../shared/services/geo.service';
import { City, Area, Locality } from '../shared/models/geo.model';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import { NoWhitespaceValidator } from '../shared/validators/whitespace.validator';
import { ValidateEmail } from '../shared/validators/email.validator';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'register-step3',
  template: `
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-8 col-lg-6 login-form mx-auto float-none">                
                <!--Form with header-->
                <div class="card">
                    <div class="card-block">
                        <!--Header-->
                        <div class="form-header">
                            <h3>Contact</h3>
                        </div>
                        <!--Body-->
                        <form [formGroup]="userContactForm" (ngSubmit)="onSubmit()" novalidate>
                            <div class="text-center"><strong>Email</strong></div>
                            <div class="md-form form-group" [class.has-danger]="userContactForm.get('email').errors" 
                              [class.no-margin-bottom]="userContactForm.get('email').errors">
                                <input type="email" class="form-control input-field" id="email" formControlName="email">
                                <label class="form-control-label" for="email">Email</label>
                            </div>
                            <div *ngIf="userContactForm.get('email').errors" class="feedback">
                              <span [hidden]="!userContactForm.get('email').errors.duplicate">
                                Email already exists
                              </span>
                              <span [hidden]="!userContactForm.get('email').errors.incorrectMailFormat">
                                Invalid Email
                              </span>
                            </div>
                            <div class="text-center"><strong>Address</strong></div>
                            <div class="row">
                              <div class="col-6">
                                <div class="form-group" [class.has-danger]="userContactForm.get('city').errors && userContactForm.get('city').touched" 
                                      [class.no-margin-bottom]="userContactForm.get('city').errors && userContactForm.get('city').touched">
                                    <label class="text-muted form-control-label">City</label>
                                    <select class="form-control" formControlName="city">
                                      <option value="">Select City</option>
                                      <option *ngFor="let city of cities | async" [value]="city.id">{{city.name}}</option>
                                    </select>
                                </div>
                                <div *ngIf="userContactForm.get('city').errors && userContactForm.get('city').touched" class="feedback">
                                  <span [hidden]="!userContactForm.get('city').errors.required">
                                    Required
                                  </span>
                                </div>
                              </div>
                              <div class="col-6" *ngIf="showArea">
                                <div class="form-group" [class.has-danger]="userContactForm.get('area').errors && userContactForm.get('area').touched" 
                                      [class.no-margin-bottom]="userContactForm.get('area').errors && userContactForm.get('area').touched">
                                    <label class="text-muted form-control-label">Area</label>
                                    <select class="form-control" formControlName="area">
                                    	<option value="">Select Area</option>
              							          <option *ngFor="let area of areas | async" [value]="area.id">{{area.name}}</option>
          							            </select>
                                </div>
                                <div *ngIf="userContactForm.get('area').errors && userContactForm.get('area').touched" class="feedback">
                                  <span [hidden]="!userContactForm.get('area').errors.required">
                                    Required
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="row" *ngIf="showCustomFields">
                              <div class="col-6">
                                <div class="md-form form-group" [class.has-danger]="userContactForm.get('custom_area').errors && (userContactForm.get('custom_area').dirty || userContactForm.get('custom_area').touched)" 
                              [class.no-margin-bottom]="userContactForm.get('custom_area').errors && (userContactForm.get('custom_area').dirty || userContactForm.get('custom_area').touched)">
                                    <input type="text" class="form-control input-field" id="custom_area" formControlName="custom_area">
                                    <label for="custom_area" class="form-control-label">custom_area</label>
                                </div>
                                <div *ngIf="userContactForm.get('custom_area').errors && (userContactForm.get('custom_area').dirty || userContactForm.get('custom_area').touched)" class="feedback">
                                  <span [hidden]="!userContactForm.get('custom_area').errors.required">
                                    Required
                                  </span>
                                  <span [hidden]="!userContactForm.get('custom_area').errors.whitespace || userContactForm.get('custom_area').errors.required">
                                    No whitespaces
                                  </span>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="md-form form-group" [class.has-danger]="userContactForm.get('custom_locality').errors && (userContactForm.get('custom_locality').dirty || userContactForm.get('custom_locality').touched)" 
                              [class.no-margin-bottom]="userContactForm.get('custom_locality').errors && (userContactForm.get('custom_locality').dirty || userContactForm.get('custom_locality').touched)">
                                    <input type="text" class="form-control" id="custom_locality input-field" formControlName="custom_locality">
                                    <label for="custom_locality" class="form-control-label">custom_locality</label>
                                </div>
                                <div *ngIf="userContactForm.get('custom_locality').errors && (userContactForm.get('custom_locality').dirty || userContactForm.get('custom_locality').touched)" class="feedback">
                                  <span [hidden]="!userContactForm.get('custom_locality').errors.required">
                                    Required
                                  </span>
                                  <span [hidden]="!userContactForm.get('custom_locality').errors.whitespace || userContactForm.get('custom_locality').errors.required">
                                    No whitespaces
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="form-group" *ngIf="!showCustomFields" [class.has-danger]="userContactForm.get('locality').errors && userContactForm.get('locality').touched" 
                                      [class.no-margin-bottom]="userContactForm.get('locality').errors && userContactForm.get('locality').touched">
                                <label class="text-muted form-control-label">Locality</label>
                                <select class="form-control" formControlName="locality">
                                	<option value="">Select Locality</option>
          							          <option *ngFor="let locality of localities | async" [value]="locality.id">{{locality.name}}</option>
      							            </select>
                                <div *ngIf="userContactForm.get('locality').errors && userContactForm.get('locality').touched" class="feedback">
                                  <span [hidden]="!userContactForm.get('locality').errors.required">
                                    Required
                                  </span>
                                </div>
                            </div>
                            <div class="row">
                              <div class="col-6">
                                <div class="md-form form-group" [class.has-danger]="userContactForm.get('flat_no').errors && (userContactForm.get('flat_no').dirty || userContactForm.get('flat_no').touched)" 
                              [class.no-margin-bottom]="userContactForm.get('flat_no').errors && (userContactForm.get('flat_no').dirty || userContactForm.get('flat_no').touched)">
                                    <input type="text" class="form-control input-field" id="flat_no" formControlName="flat_no">
                                    <label for="flat_no" class="form-control-label">House No</label>
                                </div>
                                <div *ngIf="userContactForm.get('flat_no').errors && (userContactForm.get('flat_no').dirty || userContactForm.get('flat_no').touched)" class="feedback">
                                  <span [hidden]="!userContactForm.get('flat_no').errors.required">
                                    Required
                                  </span>
                                  <span [hidden]="!userContactForm.get('flat_no').errors.whitespace || userContactForm.get('flat_no').errors.required">
                                    No whitespaces
                                  </span>
                                </div>
                              </div>
                              <div class="col-6">
                                <div class="md-form form-group" [class.has-danger]="userContactForm.get('pincode').errors && (userContactForm.get('pincode').dirty || userContactForm.get('pincode').touched)" 
                              [class.no-margin-bottom]="userContactForm.get('pincode').errors && (userContactForm.get('pincode').dirty || userContactForm.get('pincode').touched)">
                                    <input type="number" class="form-control input-field" id="pincode" formControlName="pincode">
                                    <label for="pincode" class="form-control-label">Pincode</label>
                                </div>
                                <div *ngIf="userContactForm.get('pincode').errors && (userContactForm.get('pincode').dirty || userContactForm.get('pincode').touched)" class="feedback">
                                  <span [hidden]="!userContactForm.get('pincode').errors.required">
                                    Required
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-success" [disabled]="!userContactForm.valid">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!--/Form with header-->
            </div>
        </div>
    </div>
  `,
  providers:[GeoService],
  styleUrls: ['./auth.css']
})
export class RegisterStep3Component implements OnInit {

  userContactForm: FormGroup;
  cities: Observable<City[]>;
  areas: Observable<Area[]>;
  localities: Observable<Locality[]>;
  showCustomFields:boolean = false;
  showArea:boolean = true;

  constructor(
  	private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private titleService:Title,
    private metaService: Meta,
    private authService: AuthService,
    private geoService: GeoService) { 

  	this.createForm();
  }

  ngOnInit(): void {
    this.getCity();
  	this.getArea();
  	this.getLocality();
  	this.addCustomFields();
    this.titleService.setTitle('Contact | Say2Gov');
    this.metaService.addTag({type:'description', content:"SignUp to connect with your elected representatives, get involved in local issues, influence government decision-making & change the way Indian democracy works"});
  }  

  createForm() {
    this.userContactForm = this.fb.group({
      email: ['', ValidateEmail ],
  	  city: ['', Validators.required],
  	  area: ['', Validators.required],
  	  locality: ['', Validators.required],
  	  flat_no: ['', [Validators.required, NoWhitespaceValidator]],
  	  pincode: ['', Validators.required ],
    });
  }

  getCity(){
    this.cities = this.geoService.getCityList('','');
  }

  getArea(){
    const cityControl = this.userContactForm.get('city');
    cityControl.valueChanges.forEach(value=>{
      if(value == '2'){
        this.userContactForm.get('area').setValue('18');   
        this.showArea = false;     
      }
      else if (value!=''){
        this.userContactForm.get('area').setValue('');
        this.areas = this.geoService.getAreaList('city',value);
        this.showArea = true;
      }
    });
  }

  getLocality(){
  	const areaControl = this.userContactForm.get('area');
  	areaControl.valueChanges.forEach(value=>{
      this.userContactForm.get('locality').setValue('');
      if(value!='')
  		this.localities = this.geoService.getLocalityList('area',value);
  	});
  }

  addCustomFields(){
  	const areaControl = this.userContactForm.get('area');
  	areaControl.valueChanges.forEach(val=>{
  		if(val == 18) {
        this.userContactForm.get('locality').clearValidators();
        this.userContactForm.get('locality').setValue('492');
  			this.userContactForm.addControl('custom_area',new FormControl('', [Validators.required, NoWhitespaceValidator]));
  			this.userContactForm.addControl('custom_locality',new FormControl('', [Validators.required, NoWhitespaceValidator]));
  			this.showCustomFields = true;
  			return true;
  		}
  		else{
        this.userContactForm.removeControl('custom_area');
        this.userContactForm.removeControl('custom_locality');
        this.userContactForm.get('locality').setValidators(Validators.required);
  			this.showCustomFields = false;
  			return false;
  		}
  	});
  }

  onSubmit() {
  	this.authService.register_step3(this.userContactForm.value).then(res=>{
      if(res)
        this.router.navigate(['/citizen']);
      else{
        this.userContactForm.get('email').setErrors({'duplicate':true});
      }
    });
  }

}