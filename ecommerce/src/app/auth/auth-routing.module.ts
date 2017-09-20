import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthComponent } from './auth.component';



const authRoutes: Routes = [
  {
  	path: '',
  	component: AuthComponent,
  	children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
  		{ path: 'login', component: LoginComponent},
	  	{ path: 'register', component: RegisterComponent },

  	]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(authRoutes) ],
  exports: [ RouterModule ]
})
export class AuthRoutingModule {}
