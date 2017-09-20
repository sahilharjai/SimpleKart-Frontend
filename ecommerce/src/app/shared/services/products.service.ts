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
export class ProductService {
 private baseUrl = global.baseUrl;  // URL to web api

  nextUrl:string;
  previousUrl:string;
  count:number;

  redirectUrl: string;

  constructor(private http: Http) {}


  getRecentProducts():Observable<any>{


      let options = new RequestOptions({ headers: global.headers });
      return this.http.get(this.baseUrl+'products/product-filter-list/', options)
        .flatMap(res=>{return res.json();})
  }

  getNewProducts():Observable<any>{


      let options = new RequestOptions({ headers: global.headers });
      return this.http.get(this.baseUrl+'products/product-new-list/', options)
        .flatMap(res=>{return res.json();})
  }

  getRandomProducts():Observable<any>{


      let options = new RequestOptions({ headers: global.headers });
      return this.http.get(this.baseUrl+'products/product-random-list/', options)
        .flatMap(res=>{return res.json();})
  }

  getProductFeatured():Observable<any>{


      let options = new RequestOptions({ headers: global.headers });
      return this.http.get(this.baseUrl+'products/featured-random-list/', options)
        .flatMap(res=>{return res.json();})
  }

    getProduct(id:string):Promise<any>{
    let options = new RequestOptions({ headers: global.headers });
    return this.http.get(this.baseUrl+'products/product-detail/'+id+'/', options)
      .toPromise()
      .then(res=>res.json())}


   getRelatedProducts(count:number):Observable<any>{
        let params = new URLSearchParams();
        params.set('count', count.toString())

      let options = new RequestOptions({ headers: global.headers,params:params });
      return this.http.get(this.baseUrl+'products/product-random-list/', options)
        .flatMap(res=>{return res.json();})
  }

  getCategoryProducts(id:number):Observable<any>{
        let params = new URLSearchParams();
        params.set('id', id.toString())

      let options = new RequestOptions({ headers: global.headers,params:params });
      return this.http.get(this.baseUrl+'products/category-product-list/', options)
        .flatMap(res=>{console.log("service",res.json());return res.json();})
  }

  /*writeToEr(content:string ,er_id:string='', image_ids:number[]): Promise<boolean>{
    let params = new URLSearchParams();
    if(er_id!='')
      params.set('er_id', er_id)
    params.set('image_ids', JSON.stringify(image_ids));
    let options = new RequestOptions({ headers: global.headers, params: params });
    return this.http.post(this.baseUrl+'posts/write-to-mla/', JSON.stringify({content:content}), options)
      .toPromise()
      .then(res=>true)
      .catch((error: any) => this.handleError(error));
  }

  getPosts(id:string,url:string=''): Observable<any>{
    let params = new URLSearchParams();
    params.set('user_id', id);
    if(url==''){
      let options = new RequestOptions({ headers: global.headers, params: params });
      return this.httpService.get(this.baseUrl+'posts/post-user-list/', options)
        .flatMap(res=>this.extractDataFromResponse(res.json()))
        .catch((error: any)=>this.handleError(error));
    }
    else{
      let options = new RequestOptions({ headers: global.headers });
      return this.httpService.get(url, options)
        .flatMap(res=>this.extractDataFromResponse(res.json()))
        .catch((error: any)=>this.handleError(error));
    }
        
  }


  getPost(id:string):Promise<any>{
    let options = new RequestOptions({ headers: global.headers });
    return this.httpService.get(this.baseUrl+'posts/post-detail/'+id+'/', options)
      .toPromise()
      .then(res=>res.json())
      .catch((error: any) => this.handleError(error));
  }*/

  /*createFeedback(content:string,feedback_id:number,user_id:number): Promise<any>{
    let params = new URLSearchParams();
    params.set('feedback_id', feedback_id.toString());
    params.set('user_id', user_id.toString());
    let options = new RequestOptions({ headers: global.headers, params: params });
    return this.http.put(this.baseUrl+'posts/feedback/', JSON.stringify(content), options)
      .toPromise()
      .then(res=>true)
      .catch((error: any) => this.handleError(error));
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