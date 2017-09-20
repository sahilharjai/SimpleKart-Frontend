import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent}  from './home/home.component';
import { AppComponent } from './app.component';

const routes: Routes = [

	{ path: 'auth',loadChildren: '../auth/auth.module#AuthModule' },
  	{ path: '',  loadChildren: './home/home.module#HomeModule' },

  
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
