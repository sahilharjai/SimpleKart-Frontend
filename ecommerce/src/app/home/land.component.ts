import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/products.service'
import { CategoryService } from '../shared/services/category.service'
import { RatingModule } from "ng2-rating";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-land',
  templateUrl: './land-component.html',
  styleUrls: ['./home.component.css'],
    /*animations: [
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
  ],*/
})
export class LandComponent implements OnInit {
  state='inactive';
  top_products:any[]=[];
  random_products:any[]=[];
  new_products:any[]=[];
  random_categorys:any[]=[];
  random_featured:any[]=[];
  constructor(private productService:ProductService,
  	private categoryService:CategoryService,) { }

  ngOnInit() {
  	this.getTopProducts()
  	this.getNewProducts()
  	this.getRandomProducts()
  	this.getRandomCategory()
  	this.getProductFeatured()
  }

   toggleSidebar(){
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }

  getTopProducts()
  {
  	this.top_products=[];
  	this.productService.getRandomProducts().subscribe(res=>{this.top_products.push(res)})
  }

  getNewProducts()
  {
  	this.new_products=[];
  	this.productService.getNewProducts().subscribe(res=>{this.new_products.push(res)})
  }

  getRandomProducts()
  {
  	this.random_products=[]
  	this.productService.getRandomProducts().subscribe(res=>{ this.random_products.push(res)})
  }

  getRandomCategory()
  {
  	this.random_categorys=[]
  	this.categoryService.getRecentCategory().subscribe(res=>{ this.random_categorys.push(res)})
  	console.log(this.random_categorys)
  }

  getProductFeatured()
  {
  	this.random_featured=[]
  	this.productService.getProductFeatured().subscribe(res=>{ this.random_featured.push(res)})
  	console.log(this.random_featured)
  }

}



