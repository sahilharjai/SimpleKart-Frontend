import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
 
@Injectable()
export class cartCountService {
 
  // Observable string sources
  private cart_counter = new Subject<string>(); 


  cartAnnounced$ = this.cart_counter.asObservable();
 
  // Service message commands
  updateCart() {
    let number = Number(this.cart_counter)
    console.log("in update")
    number++;
    this.cart_counter.next(number.toString());
    console.log("final",this.cart_counter)
  }
}