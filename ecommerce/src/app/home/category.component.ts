import { Component, OnInit , ElementRef, ViewChildren, ViewChild, QueryList,Renderer2} from '@angular/core';
import { ProductService } from '../shared/services/products.service'
import { CategoryService } from '../shared/services/category.service'
import { ActivatedRoute, Router, Params } from '@angular/router';



@Component({
  selector: 'app-product',
  
  templateUrl: './category-component.html',
  styleUrls: ['./home.component.css'],
})
export class CategoryComponent implements OnInit {
   @ViewChild('carousalElement') carousalElement: ElementRef;
  category_products:any[]=[];
  category_id:number;

  constructor(private productService:ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private elRef:ElementRef,
    private renderer: Renderer2,
) { 

  }

  ngOnInit() {
    this.category_id=this.route.snapshot.params['id'];
    this.getCategoryProduct();

  }

  getCategoryProduct()
  {
    this.productService.getCategoryProducts(this.category_id).subscribe(res=>this.category_products.push(res));

    console.log("hahaha",this.category_products)
  }


}




