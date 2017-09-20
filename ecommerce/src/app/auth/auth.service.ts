import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthUserService } from '../auth-user.service';
import * as global from '../global';



@Injectable()
export class AuthService {
  
  private baseUrl = global.baseUrl;  // URL to web api
  
  // private headers = new Headers({
  // 	'Accept': 'application/json',
  // 	'Content-Type': 'application/json'
  // });
  redirectUrl: string;

  constructor(private http: Http, private authUserService: AuthUserService) { 
    // if(this.authUserService.token!=null){
    //    this.headers.append("Authorization","JWT " + this.authUserService.token);
    // }

  }

  login(mobile:string, password:string): Promise<any> {
  	var params = JSON.stringify({ mobile: mobile, password: password });
  	return this.http.post(this.baseUrl+'auth/token/', params, {headers: global.headers})
  		.toPromise()
  		.then(res =>{
  			var token = res.json().token;
        var cart_id = res.json().cart_id;
  			localStorage.setItem('sk_jwt_token', token);
        localStorage.setItem('cart_id', cart_id);
        return this.authUserService.authenticate().then(res=> res);
  		})
  		.catch((error: any) => {
  			console.log(error.json());
        return false;
  		});
  }

  /*createToken(mobile:string):Promise<any>{
    let params = new URLSearchParams();
    params.set('mobile', mobile);
    let header = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({ headers: header, params: params });
    return this.http.get(this.baseUrl+'auth/create-token/', options)
      .toPromise()
      .then(res=>{
        var token = res.json().token;
        localStorage.setItem('s2g_jwt_token', token);
        return this.authUserService.authenticate().then(res=> res);
      })
      .catch((error: any) => {
        console.log(error.json());
        return false;
      });
  }*/

  register(model:any): Promise<any>{
  	var params = JSON.stringify({first_name: model.first_name, last_name: model.last_name, mobile: model.mobile, password: model.password,email:model.email});
  	return this.http.post(this.baseUrl+'accounts/register/', params, {headers: global.headers})
  		.toPromise()
  		.then(res =>{
  			console.log(res.json());
  			return true;
  		})
  		.catch((error: any) => {
        //console.log(error.json());
        if (error.status === 400)
          return error.json();
      })
  }

  /*register_step2(otp:string): Promise<boolean> {
    return this.http.post(this.baseUrl+'accounts/register/step2/', otp, {headers: global.headers})
      .toPromise()
      .then(res =>{
        if(res.json().message=='success'){
          this.authUserService.reg_stage = 3;
          return true;
        }
        else
          return false;
      })
      .catch((error: any) => {
        console.log(error.json());
        return error.status;
      });
  }*/

  /*resend_otp(): Promise<boolean> {
    return this.http.post(this.baseUrl+'accounts/resend-otp/', {}, {headers: global.headers})
      .toPromise()
      .then(res =>true)
      .catch((error: any) => false);
  }*/

 /* change_mobile(new_mobile:string): Promise<boolean> {
    return this.http.post(this.baseUrl+'accounts/change-number/', new_mobile, {headers: global.headers})
      .toPromise()
      .then(res =>{
        if(res.json().message=='failure')
          return false;
        else
          return true;
      })
      .catch((error: any) => {
        console.log(error.json());
        if (error.status === 400)
          return error.json();
   
      });
  }*/

  /*register_step3(form:any):Promise<boolean> {
    return this.http.post(this.baseUrl+'accounts/register/step3/', form, {headers: global.headers})
      .toPromise()
      .then(res =>{
        if(res.json().message=='success'){
          this.authUserService.reg_stage = 6;
          this.authUserService.reg_complete = true;
          return true
        }
        else
          return false;
      })
      .catch((error: any) => {
        console.log(error.json());
        return error.status;
      });
  }*/

  /*forgot_password(mobile:string): Promise<boolean> {
    return this.http.post(this.baseUrl+'accounts/forgot-password/', JSON.stringify({ mobile: mobile}), {headers: global.headers})
      .toPromise()
      .then(res =>{
        let status = res.json().message;
        if (status == 'success'){
          return true;
        }
        else {
          return false;
        }
      })
      .catch((error: any) => {
        console.log(error.json());
        return error.status;
      });
  }*/

  /*forgot_password_verify_otp(mobile:string, otp:string): Promise<boolean> {
    return this.http.post(this.baseUrl+'accounts/forgot-password/verify-mobile/', JSON.stringify({ mobile: mobile, otp:otp}), {headers: global.headers})
      .toPromise()
      .then(res =>{
        let status = res.json().message;
        if (status == 'success'){
          return true;
        }
        else {
          return false;
        }
      })
      .catch((error: any) => {
        console.log(error.json());
        return error.status;
      });
  }*/

  /*forgot_password_new_passowrd(mobile:string, password:string, re_password:string): Promise<any> {
    
    return this.http.post(this.baseUrl+'accounts/forgot-password/reset-password/', JSON.stringify({ mobile: mobile, password:password,re_password:re_password}), {headers: global.headers})
      .toPromise()
      .then(res =>{
        let status = res.json().message;
        if (status == 'failure'){
          return false;
        }
        else {
          return true;
        }
      })
      .catch((error: any) => {
        console.log(error.json());
        return error.status;
      });
  }*/

  checkMobile(mobile:string):Promise<boolean>{
    return this.http.get(this.baseUrl+'accounts/mobile-check/'+mobile+'/', {headers: global.headers})
      .toPromise()
      .then(res=>{
        if(res.json().status=='User doesnt Exists')
          return false;
        else
          return true;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error.json()); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}