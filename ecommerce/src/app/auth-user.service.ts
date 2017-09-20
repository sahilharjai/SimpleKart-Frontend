import { Injectable }    from '@angular/core';
import { Headers, Http,RequestOptions,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as global from './global';


@Injectable()
export class AuthUserService {
  private baseUrl = global.baseUrl;  // URL to web api
  private headers = new Headers({
  	'Accept': 'application/json',
  	'Content-Type': 'application/json'
  });
  isLoggedIn: boolean = false;
  reg_complete: boolean;
  reg_step:number;
  user_id: number;
  user_name: string;
  token: string;
  username: string;
  cart_id:number;
  cart_count:number;
  profile_pic:string = global.deafultProfilePicUrl;

  constructor(
    private http: Http
  ) { }

  authenticate() {
    console.log("in herererer")
    var token = localStorage.getItem('sk_jwt_token');
    var params = JSON.stringify({token:token})
  	var response = this.http.post(this.baseUrl+'auth/token-verify/', params, {headers: this.headers})
  		.toPromise()
  		.then(res =>{
  			if ('token' in res.json()) {
          console.log("final set up")
          this.isLoggedIn = true;
          this.reg_complete = res.json().reg_complete;
          this.reg_step=res.json().reg_step;
          this.user_id = res.json().user_id;
          this.user_name = res.json().user;
          this.username = res.json().username;
          this.profile_pic = res.json().profile_pic;
          this.token = res.json().token;
          this.cart_count = res.json().cart_count;
          this.cart_id = res.json().cart_id;
          global.headers.set("Authorization","JWT " + this.token);
          localStorage.setItem('cart_id', this.cart_id.toString());
          localStorage.setItem('cart_count', this.cart_count.toString());
          this.refreshToken(res.json().token);
          return true;
        }
        else {
          this.isLoggedIn = false;
          this.cart_count=-1;
          this.cart_id=-1;
          return false;
        }
  		})
  		.catch((error: any) => {
  			console.log(error.json());
        var cart = localStorage.getItem('cart_id');
        if(cart==null)
        {this.isLoggedIn = false;
        this.cart_count=-1;
        this.cart_id=-1;}
        else
        {
          this.cart_id=Number(cart);
        }
        return false;
  		});

    return Promise.resolve(response);
  }

  refreshToken(token:string){
    this.http.post(this.baseUrl+'auth/token-refresh/', JSON.stringify({token:token}), {headers: this.headers})
      .toPromise()
      .then(res=>{
        this.token = res.json().token;
        localStorage.setItem('sk_jwt_token', this.token);
        localStorage.setItem('cart_id', this.cart_id.toString());
        global.headers.set("Authorization","JWT " + this.token);
      });
  }

}