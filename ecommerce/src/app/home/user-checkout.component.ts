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
  selector: 'user-address',
  
  templateUrl: './user-checkout.html',
  styleUrls: ['./home.component.css'],
})
export class UserCheckoutComponent implements OnInit {
  user:any[];
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

    this.route.data.subscribe(data=>this.user = data.user)
    console.log("useraaaa ",this.user)
    this.isLoggedIn=this.authUserService.isLoggedIn;
    this.createForm();

  }



createForm() {
    this.addressForm = this.fb.group({
    street: [this.user['user_address']?this.user['user_address'][0]['street']:''],
    city: [this.user['user_address']?this.user['user_address'][0]['city']:''],
    state: [this.user['user_address']?this.user['user_address'][0]['state']:''],
    zipcode: [this.user['user_address']?this.user['user_address'][0]['zipcode']:''],
    });
  }


  onSubmit() {
    console.log(this.addressForm.value);
    

      this.userAddressService.createUserAddress(this.addressForm.value,this.user['id']).then(res=>{
        if (res){
          swal({
            title: 'Address Added',
            type: 'success',
            showConfirmButton: false,
            timer: 2100
          });
          setTimeout(()=>{ 
                /*this.location.back();*/
           },2000);
        }
      
    });
  

}


createOrder()
  {
    console.log("in here")
    this.orderService.createOrder('',this.authUserService.user_id).then()
    console.log("hahahaha")
    this.router.navigate(['/order-detail'], {relativeTo: this.route});

  }
  

}















    





