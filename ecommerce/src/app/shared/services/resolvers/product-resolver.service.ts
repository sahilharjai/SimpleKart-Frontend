import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../products.service';

@Injectable()
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    let id = route.params['id'];
    return this.productService.getProduct(id)
  }
}