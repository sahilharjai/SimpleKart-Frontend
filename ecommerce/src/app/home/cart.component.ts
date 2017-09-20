import { Component, OnInit , ElementRef, ViewChildren, ViewChild, QueryList,Renderer2} from '@angular/core';
import { ProductService } from '../shared/services/products.service'
import { CartService } from '../shared/services/cart.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthUserService } from '../auth-user.service'



@Component({
  selector: 'app-product',
  
  templateUrl: './cart-component.html',
  styleUrls: ['./home.component.css'],
})
export class CartComponent implements OnInit {
   @ViewChild('carousalElement') carousalElement: ElementRef;
  cart:any[];
  category_id:number;
  subtotal:number;
  isLoggedIn:boolean;

  constructor(private cartService:CartService,
    private authUserService:AuthUserService,
    
    private route: ActivatedRoute,
    private router: Router,
    private elRef:ElementRef,
    private renderer: Renderer2,
) { 

  }

  ngOnInit() {
    this.route.data.subscribe(data=>this.cart = data.cart) 
    this.isLoggedIn=this.authUserService.isLoggedIn;
    if(this.cart.length>0)
    {
      this.subtotal=this.cart[0].cart.subtotal;
    }

  }

  changeQuantity(box,line_item,variant_id,index)
  {
    

    this.cartService.addProductToCart(this.authUserService.cart_id,variant_id,box).subscribe(res=>{console.log(res);
      line_item.innerHTML = 'Rs. '+(res['line_total']).toString();
      this.subtotal=res['subtotal']
      if(res['flash_message']=='Item removed successfully.')
      {

        this.cart.splice(index,1);
      }
    });
  }

  removeProduct(box,line_item,variant_id,index)
  {

    this.cartService.addProductToCart(this.authUserService.cart_id,variant_id,box,true).subscribe(res=>{console.log(res);
      line_item.innerHTML = 'Rs. '+(res['line_total']).toString();
      this.subtotal=res['subtotal']

    });
    this.cart.splice(index,1);

  }

  routeToPage()
  {
    if(this.isLoggedIn)
    {
      this.router.navigate(['/user-checkout'], {relativeTo: this.route});
    }
    else
    {
      localStorage.setItem('navigate_to_address','true')
      this.router.navigate(['/auth/login'], {relativeTo: this.route});
    }
  }


  

  /*getCategoryProduct()
  {
    this.productService.getCategoryProducts(this.category_id).subscribe(res=>this.category_products.push(res));

    console.log("hahaha",this.category_products)
  }*/


}




