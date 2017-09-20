import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
/*import { HttpService } from '../../core/http/http.service';*/
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import * as global from '../../global';

@Injectable()
export class OrderService {
 private baseUrl = global.baseUrl;  // URL to web api

  nextUrl:string;
  previousUrl:string;
  count:number;
  redirectUrl: string;

  constructor(private http: Http) {}


  createOrder(content:string='',user_id:number):Promise<any>{

      content="create Order"
      let options = new RequestOptions({ headers: global.headers});
      return this.http.post(this.baseUrl+'accounts/user-order-create/'+user_id+'/',JSON.stringify(content), options)
        .toPromise()
        .then(res=>res.json())
       
  }


  retrieveOrder(user_id:number):Promise<any>{

      let options = new RequestOptions({ headers: global.headers});
      return this.http.get(this.baseUrl+'accounts/user-order-retrieve/'+user_id+'/', options)
        .toPromise()
        .then(res=>res.json())
       
  }

   /* addProductToCart(cart_id:number,variant_id:number,quantity:number,delete_product:boolean=false):Observable<any>{

      let params = new URLSearchParams();
      params.set('item', variant_id.toString())
      params.set('qty', quantity.toString())
      params.set('cart_id', cart_id.toString())
      params.set('delete', delete_product.toString())
      let options = new RequestOptions({ headers: global.headers,params:params });
      return this.http.get(this.baseUrl+'carts/cart-update/', options)
        .map(res=>{return res.json();})
        .catch((error: any)=>this.handleError(error));
  }*/

  


  extractDataFromResponse(response:Response){
    this.nextUrl = response['next'];
    this.previousUrl = response['previous'];
    this.count = response['count'];
    return response['results'];
  }

 handleError (error: any) {
      if (error.status === 500) {
         return Observable.throw(new Error(error.status));
      }
      else if (error.status === 404) {
         return Observable.throw(new Error(error.status));
      }
      else if (error.status === 401) {
         return Observable.throw(new Error(error.status));
      }
      else if (error.status === 400) {
         return Observable.throw(new Error(error.status));
      }
  }

}