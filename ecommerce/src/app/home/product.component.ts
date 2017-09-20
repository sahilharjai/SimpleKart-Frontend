import { Component, OnInit , ElementRef, ViewChildren, ViewChild, QueryList,Renderer2,Output} from '@angular/core';
import { ProductService } from '../shared/services/products.service'
import { CategoryService } from '../shared/services/category.service'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CartService } from '../shared/services/cart.service'; 
import { AuthUserService } from '../auth-user.service'
declare var swal: any;

import { Subscription }   from 'rxjs/Subscription';
import { cartCountService } from '../global.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-component.html',
  styleUrls: ['./home.component.css'],
})
export class ProductComponent implements OnInit {
  @ViewChild('authModal') modalElement: ElementRef;
   @ViewChild('carousalElement') carousalElement: ElementRef;


  product:any[];
  related_productOne:any[]=[];
  related_productTwo:any[]=[];
  related_productThree:any[]=[];
  slide_component:any;
  carousal_component:any;
  count=1;
  cart_id:number;
  cart_count:string;
  subscription: Subscription;

  constructor(private productService:ProductService,
    private cartService:CartService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef:ElementRef,
    private renderer: Renderer2,
    private authUserService: AuthUserService,
    private cartCountService: cartCountService,
) { 

     this.subscription = cartCountService.cartAnnounced$.subscribe(
      mission => {
        this.cart_count = mission;
        console.log("in child",this.cart_count)
    });

  }

  ngOnInit() {
        this.route.data.subscribe(data=>this.product = data.product);
        this.getRelatedProduct()
        this.slide_component = this.modalElement.nativeElement
        this.carousal_component = this.carousalElement.nativeElement
        this.ChangeSlide();
        

  }

  getRelatedProduct()
  {
    this.productService.getRandomProducts().subscribe(res=>this.related_productOne.push(res));
    this.productService.getRandomProducts().subscribe(res=>this.related_productTwo.push(res));
    this.productService.getRandomProducts().subscribe(res=>this.related_productThree.push(res));

  }

    ChangeSlide()
  {
     setInterval (() => {
       if(this.count>5)
       {
         this.count=1;
       }
       for(let i=1;i<6;i+=2)
      {
        if(this.count!=i)
        {
          this.slide_component.childNodes[i].classList.remove('active');
          this.carousal_component.childNodes[2*i].classList.remove('active');
        }
      }
      this.slide_component.childNodes[this.count].classList.add('active');
      this.carousal_component.childNodes[2*this.count].classList.add('active');
      this.count=this.count+2;
    }, 6000)

  }

  addToCart(quantity,variant)
  {
    
    this.cartService.addProductToCart(this.authUserService.cart_id,variant.value,quantity.value).subscribe(res=>{console.log(res);
      if(this.authUserService.cart_id==-1)
      {
        this.authUserService.cart_id=res['cart_id'];
        localStorage.setItem("cart_id",res['cart_id'].toString());
        
      }
      console.log("in add to cart")

      this.cartCountService.cartAnnounced$.subscribe(
      mission => {
        console.log("in mission")
        this.cart_count = mission;
        console.log("in child",this.cart_count)
    });

      /*swal({
            title: 'Product Added',
            type: 'success',
            showConfirmButton: false,
            timer: 2100
          });*/
    });

  }

}




