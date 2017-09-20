import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthUserService } from '../auth-user.service';
declare var swal: any;
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import * as global from '../global';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../shared/services/category.service'

@Component({
  selector: 'auth',
  template: `
  	
    <div class="hidden-sn white-skin animated">

  
    <header>

        <!-- Sidebar navigation -->
        <ul id="slide-out" class="side-nav hidden custom-scrollbar sn-bg-2" [@sidebarState]="state">

            <!-- Logo -->
            <li>
                <div class="logo-wrapper waves-light" style="height:200px !important;">
                    <a ><img [src]="defaultPic" class="img-fluid rounded-circle">
                    <p class="user text-center black-text" *ngIf="isLoggedIn">{{username}}</p><p class="user text-center black-text" *ngIf="!isLoggedIn">Guest</p></a>
                </div>
            </li>
            <!-- /.Logo -->

            <!-- Social -->
            <!-- <li>
                <ul class="social">
                    <li><a class="icons-sm fb-ic"><i class="fa fa-facebook"> </i></a></li>
                    <li><a class="icons-sm pin-ic"><i class="fa fa-pinterest"> </i></a></li>
                    <li><a class="icons-sm gplus-ic"><i class="fa fa-google-plus"> </i></a></li>
                    <li><a class="icons-sm tw-ic"><i class="fa fa-twitter"> </i></a></li>
                </ul>
            </li> -->
            <!-- /.Social -->

            <!-- Search Form -->
            <li>
                <form class="search-form" role="search">
                    <div class="form-group waves-light">
                        <input type="text" class="form-control" placeholder="Search">
                    </div>
                </form>
            </li>
            <!-- /.Search Form -->

            <!-- Side navigation links -->
            <li>
               
                <ul class="collapsible collapsible-accordion">
                    <li *ngFor="let category of categorys"><a class=" waves-effect arrow-r" (click)="routeToPage('./category',{},category.id)" >
                    {{category.title}}
                    <!-- {{category.title}} --></a>
                        <!-- <div class="collapsible-body">
                            <ul>
                                <li><a href="product.html" class="waves-effect">Product Page V.1</a>
                                </li>
                                <li><a href="product-page.html" class="waves-effect">Product Page V.2</a>
                                </li>
                                <li><a href="product-page-4.html" class="waves-effect">Product Page V.3</a>
                                </li>
                            </ul>
                        </div> -->
                    </li>
                    <!-- <li><a class="collapsible-header waves-effect arrow-r"><i class="fa fa-shopping-cart"></i> Cart Pages<i class="fa fa-angle-down rotate-icon"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="cart.html" class="waves-effect">Page with shopping cart</a>
                                </li>
                                <li><a href="contact.html" class="waves-effect">Page with contact form</a>
                                </li>
                                <li><a href="contact-2.html" class="waves-effect">Page with contact form V.2</a>
                                </li>
                                <li><a href="login.html" class="waves-effect">Page with sign in form</a>
                                </li>
                                <li><a href="terms.html" class="waves-effect">Page with 'terms of use'</a>
                                </li>
                                <li><a href="faq.html" class="waves-effect">Page with 'FAQ'</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><a class="collapsible-header waves-effect arrow-r"><i class="fa fa-dashboard"></i> Homepages<i class="fa fa-angle-down rotate-icon"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="home-page.html" class="waves-effect">Ecommerce homepage default</a>
                                </li>
                                <li><a href="home-page-2.html" class="waves-effect">Ecommerce homepage full width</a>
                                </li>
                                <li><a href="home-page-3-carousel.html" class="waves-effect">Ecommerce homepage V.3 Carousel</a>
                                </li>
                                <li><a href="home-page-3-full-page-carousel.html" class="waves-effect">Ecommerce homepage V.3 Full Page Carousel</a>
                                </li>
                                <li><a href="home-page-3-half-page-carousel.html" class="waves-effect">Ecommerce homepage V.3 Half Page Carousel</a>
                                </li>
                                <li><a href="home-page-4.html" class="waves-effect">Ecommerce homepage V.4</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><a class="collapsible-header waves-effect arrow-r"><i class="fa fa-desktop"></i> Post Pages<i class="fa fa-angle-down rotate-icon"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="post.html" class="waves-effect">Page with column on the right</a>
                                </li>
                                <li><a href="blog-post-left-column.html" class="waves-effect">Page with newsletter on the left</a>
                                </li>
                                <li><a href="blog-post.html" class="waves-effect">Page with newsletter on the right</a>
                                </li>
                                <li><a href="blog-post-full-width.html" class="waves-effect">Full width page with logged user</a>
                                </li>
                                <li><a href="blog-post-full-width%20not%20logged%20in%20user.html" class="waves-effect">Full width page with not logged user</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li><a class="collapsible-header waves-effect arrow-r"><i class="fa fa-diamond"></i> Category Pages<i class="fa fa-angle-down rotate-icon"></i></a>
                        <div class="collapsible-body">
                            <ul>
                                <li><a href="category-list-left-column.html" class="waves-effect">Category list with left column</a>
                                </li>
                                <li><a href="category-list-right-column.html" class="waves-effect">Category list with right column</a>
                                </li>
                                <li><a href="category-grid-left-column.html" class="waves-effect">Category grid with left column</a>
                                </li>
                                <li><a href="category-right-column.html" class="waves-effect">Category grid with right column</a>
                                </li>
                                <li><a href="category-grid-left-column-carousel.html" class="waves-effect">Category grid with left column carousel</a>
                                </li>
                            </ul>
                        </div>
                    </li> -->
                </ul>
                
            </li>
            <!-- /.Side navigation links -->
            
            <div class="sidenav-bg mask-strong"></div>
            
        </ul>
        <!-- /.Sidebar navigation -->

        <!-- Navbar -->
        <nav class="navbar fixed-top navbar-toggleable-md navbar-dark scrolling-navbar double-nav" style="z-index:10 !important;">

            <!-- SideNav slide-out button -->
            <div class="float-left">
                <a data-activates="slide-out" class="button-collapse"><i class="fa fa-bars" (click)="toggleSidebar()"></i></a>
            </div>

            

            <ul class="nav navbar-nav nav-flex-icons ml-auto">
            <li class="nav-item">
                    <a class="nav-link" [routerLink]="['/']"><i class="fa fa-home" aria-hidden="true"></i> <span class="hidden-sm-down">Home</span></a>
                </li>

                <li class="nav-item ">
                    <!-- <a class="nav-link" href="#" data-toggle="modal" data-target="#cart-modal-ex"><span class="badge red">4</span> <i class="fa fa-shopping-cart" aria-hidden="true"></i> <span class="hidden-sm-down">Cart</span></a> -->
                    <a class="nav-link" [routerLink]="['/cart']"><span class="badge red">{{cart_count}}</span> <i class="fa fa-shopping-cart" aria-hidden="true"></i> <span class="hidden-sm-down">Cart</span></a>
                </li>
                <!-- <li class="nav-item">
                    <a class="nav-link"><i class="fa fa-envelope"></i> <span class="hidden-sm-down">Contact</span></a>
                </li> -->
                <li class="nav-item dropdown">
                   <a *ngIf="!isLoggedIn" class="nav-link dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" [routerLink]="['/auth/login']"><i class="fa fa-user"></i> Login</a>
                   <a class="nav-link" *ngIf="isLoggedIn" [routerLink]="['./cart']"><i class="fa fa-user"></i>{{username}}</a>
                    <!-- <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    </div> -->
                </li>
            </ul>

        </nav>
        <!-- /.Navbar -->

    </header>
    <!-- /.Double navigation -->
    
    

    

    <!-- Main layout -->
    <main>
        <router-outlet (notify)='onNotify($event)'></router-outlet>
    </main>
    <!-- /.Main layout -->


    <!-- Footer -->
    <footer class="page-footer center-on-small-only">

        <!-- Footer Links -->
        <div class="container-fluid">
           
            <div class="row">
               
                <!-- First column -->
                <div class="col-lg-2 offset-lg-1">
                   
                    <h5 class="title social-section-title">Social Media</h5>
                    
                    <!-- Social Links -->
                    <div class="social-section text-md-left">
                        <ul class="text-center">
                           
                            <!-- Facebook -->
                            <li><a class="btn-floating btn-small btn-fb"><i class="fa fa-facebook"></i></a></li>
                            
                            <!-- Instagram -->
                            <li><a class="btn-floating btn-small btn-ins"><i class="fa fa-instagram"></i></a></li>
                            
                            <!-- Twitter -->
                            <li><a class="btn-floating btn-small btn-tw"><i class="fa fa-twitter"></i></a></li>
                            
                            <!--Youtube-->
                            <li><a class="btn-floating btn-small btn-yt"><i class="fa fa-youtube"></i></a></li>
                            
                            <!--Linkedin-->
                            <li><a class="btn-floating btn-small btn-li"><i class="fa fa-linkedin"></i></a></li>
                            
                            <!-- Dribble -->
                            <li><a class="btn-floating btn-small btn-dribbble"><i class="fa fa-dribbble left"></i></a></li>
                            
                            <!-- Pinterest -->
                            <li><a class="btn-floating btn-small btn-pin"><i class="fa fa-pinterest"></i></a></li>
                            
                            <!-- Google+ -->
                            <li><a class="btn-floating btn-small btn-gplus"><i class="fa fa-google-plus"></i></a></li>
                        </ul>
                        
                    </div>
                    <!-- /.Social Links -->
                    
                </div>
                <!-- /.First column -->

                <!-- Second column -->
                <div class="col-lg-2">
                    <h5 class="title">Delivery</h5>
                    <ul>
                        <li><a href="#">Store Delivery</a></li>
                        <li><a href="#">Online Delivery</a></li>
                        <li><a href="#">Delivery Terms & Conditions</a></li>
                        <li><a href="#">Tracking</a></li>
                    </ul>
                </div>
                <!-- /.Second column -->

                <!-- Third column -->
                <div class="col-lg-2">
                    <h5 class="title">Need help?</h5>
                    <ul>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Return Policy</a></li>
                        <li><a href="#">Product Registration</a></li>
                    </ul>
                </div>
                <!-- /.Third column -->

                <!-- Fourth column -->
                <div class="col-lg-4">
                    <h5 class="title">Instagram Photos</h5>

                    <ul class="instagram-photos">
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (9).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (20).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (19).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (16).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>

                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (5).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (18).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (15).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div class="view overlay hm-white-slight">
                                <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Avatars/img (17).jpg" alt="Instagram photo cap">
                                <a href="#">
                                    <div class="mask waves-light"></div>
                                </a>
                            </div>
                        </li>
                    </ul>

                </div>
                <!-- /.Fourth column -->
                
            </div>
        </div>
        <!--/.Footer Links-->
        
        <!-- Copyright -->
        <div class="footer-copyright">
            <div class="container-fluid">
                &copy; 2016 Copyright: <a href="http://www.mdbootstrap.com/"> MDBootstrap.com </a>
            </div>
        </div>
        <!-- /.Copyright -->
        
    </footer>
    <!-- /.Footer -->
    
    <!-- Cart Modal -->
    <div class="modal fade cart-modal" id="cart-modal-ex" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
       
        <div class="modal-dialog" role="document">
           
            <!-- Content -->
            <div class="modal-content">
               
                <!-- Header -->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Your cart</h4>
                </div>
                
                <!-- Body -->
                <div class="modal-body">

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product name</th>
                                <th>Price</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Product 1</td>
                                <td>100$</td>
                                <td><a><i class="fa fa-remove"></i></a></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Product 2</td>
                                <td>100$</td>
                                <td><a><i class="fa fa-remove"></i></a></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Product 3</td>
                                <td>100$</td>
                                <td><a><i class="fa fa-remove"></i></a></td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Product 4</td>
                                <td>100$</td>
                                <td><a><i class="fa fa-remove"></i></a></td>
                            </tr>
                            <tr class="total">
                                <th scope="row">5</th>
                                <td>Total</td>
                                <td>400$</td>
                            </tr>
                        </tbody>
                    </table>

                    <button class="btn btn-primary">Checkout</button>

                </div>
                
                <!-- Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
            <!-- /.Content -->
            
        </div>
        
    </div>
    <!-- /.Cart Modal -->      
    
    <!-- Modal Subscription -->
    <div class="modal fade modal-ext" id="modal-subscription" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
           
            <!-- Content -->
            <div class="modal-content">
               
                <!-- Header -->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Subscription form</h4>
                </div>
                
                <!-- Body -->
                <div class="modal-body">
                    <p>We'll write rarely, but only the best content.</p>
                    <br>
                    <div class="md-form">
                        <i class="fa fa-user prefix"></i>
                        <input type="text" id="form22" class="form-control">
                        <label for="form22">Your name</label>
                    </div>

                    <div class="md-form">
                        <i class="fa fa-envelope prefix"></i>
                        <input type="text" id="form32" class="form-control">
                        <label for="form32">Your email</label>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
                
            </div>
            <!-- /.Content -->
            
        </div>
    </div>
    <div id="sidenav-overlay" style="opacity: 1;" class="" [@overlayState]="state" (click)="toggleSidebar()"></div>


    <!-- SCRIPTS -->

    
    <!-- Customizer -->
    <script type="text/javascript" src="https://mdbootstrap.com/live/_MDB/js/customizer.min.js"></script>

    <script>
        // SideNav init
    </script>

</div>
  `,
  styleUrls: ['./auth.css'],

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
export class AuthComponent {
 email:string;
  isLoggedIn:boolean=false;
  username:string;
  cart_count:string='0';
  categorys:any[]=[];
  defaultPic=global.defaultProfilePic;
  state="inactive";


  constructor(
    private router: Router,
    private authService: AuthService,
    private authUserService: AuthUserService,
    private categoryService:CategoryService,    private route: ActivatedRoute,
 ) { 
      this.isLoggedIn=this.authUserService.isLoggedIn;
    this.username=this.authUserService.user_name;
    this.getCategoryList()

  }


  toggleSidebar(){
     console.log("toggle",this.state)
    this.state = (this.state === 'active' ? 'inactive' : 'active');
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




  


