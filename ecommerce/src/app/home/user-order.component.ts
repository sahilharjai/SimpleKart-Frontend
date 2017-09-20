import { Component, OnInit , ElementRef, ViewChildren, ViewChild, QueryList,Renderer2} from '@angular/core';
import { ProductService } from '../shared/services/products.service'
import { UserAddressService } from '../shared/services/user-address.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthUserService } from '../auth-user.service'
import * as global from '../global';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
declare var swal: any;
import { OrderService } from '../shared/services/order.service'


@Component({
  selector: 'user-order',
  
  templateUrl: './user-order.html',
  styleUrls: ['./home.component.css'],
})
export class UserOrderComponent implements OnInit {
  order:any[];
  isLoggedIn:boolean;
  defaultPic=global.defaultProfilePic;
  addressForm: FormGroup;


  constructor(private userAddressService:UserAddressService,
    private authUserService:AuthUserService,
    private orderService:OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef:ElementRef,
    private renderer: Renderer2,
    private fb: FormBuilder,
) { 
     
  }

  ngOnInit() {

    this.route.data.subscribe(data=>this.order = data.order)
    console.log("orderr",this.order)
    this.isLoggedIn=this.authUserService.isLoggedIn;
    

  }





  

}















    





