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
export class UserAddressService {
 private baseUrl = global.baseUrl;  // URL to web api

  nextUrl:string;
  previousUrl:string;
  count:number;

  redirectUrl: string;

  constructor(private http: Http) {}


  getUserAddress(body:string='',id:string):Observable<any>{

      let options = new RequestOptions({ headers: global.headers });
      return this.http.post(this.baseUrl+'accounts/user-address/'+id+'/',body, options)
        .flatMap(res=>{return res.json();})
  }

  createUserAddress(content:string,user_id:number): Promise<any>{
    let options = new RequestOptions({ headers: global.headers});
    return this.http.post(this.baseUrl+'accounts/user-address/'+user_id+'/', content, options)
      .toPromise()
      .then(res=>true)
      }



   getUser(id:string):Promise<any>{
    let options = new RequestOptions({ headers: global.headers });
    return this.http.get(this.baseUrl+'accounts/user-detail/'+id+'/', options)
      .toPromise()
      .then(res=>res.json())}


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