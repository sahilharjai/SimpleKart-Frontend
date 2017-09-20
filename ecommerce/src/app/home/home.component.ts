import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/products.service'
import { CategoryService } from '../shared/services/category.service'
import { AuthUserService } from '../auth-user.service'
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as global from '../global';
import { ActivatedRoute, Router } from '@angular/router';
import { cartCountService } from '../global.service';




  
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
    animations: [
    trigger('sidebarState', [
      state('inactive', style({
        transform: 'translateX(-100%)'
      })),
      state('active',   style({
        transform: 'translateX(0px)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),

    trigger('overlayState', [
      state('inactive', style({
        display:'none'

      })),
      state('active',   style({
        display: 'block'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ]),
  ],
})
export class HomeComponent implements OnInit {
  state='inactive';
  isLoggedIn:boolean=false;
  username:string;
  cart_count:string='0';
  categorys:any[]=[];
  defaultPic=global.defaultProfilePic;

  constructor(private authUserService:AuthUserService,private categoryService:CategoryService,    private route: ActivatedRoute,
    private router: Router,private cartCountService: cartCountService,) {

       cartCountService.cartAnnounced$.subscribe(
      astronaut => {
        this.cart_count=astronaut;
        console.log("in parent",this.cart_count)
      });
       console.log("initially",this.cart_count)
     }

  ngOnInit() {
    this.isLoggedIn=this.authUserService.isLoggedIn;
    this.username=this.authUserService.user_name;
    this.getCategoryList()
  }

   toggleSidebar(){
     console.log("toggle",this.state)
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }

  onNotify(message:string):void {
    console.log("finalyy")
    alert(message);
  }

  
getCategoryList()
  {
    this.categorys=[]
    this.categoryService.getCategoryList().subscribe(res=>{ this.categorys.push(res)})
    console.log(this.categorys)
  }

   routeToPage(url:string, dict:any='', param:any=''){

    this.state='inactive';
    let path = url.split('/')[1];
    if(param!='')
      this.router.navigate([url, param], {relativeTo: this.route});  
  }

}



