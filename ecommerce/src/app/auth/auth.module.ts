import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { AuthComponent } from './auth.component';
import { MobileValidator } from '../shared/validators/mobile.validator';
import { EqualValidator } from '../shared/validators/equal-validator.directive';
import { WhitespaceValidator } from '../shared/validators/whitespace.validator';
import { EmailValidator } from '../shared/validators/email.validator';

@NgModule({
  imports: [ 
  	CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [ 
    AuthComponent,
  	LoginComponent,
  	RegisterComponent,
    MobileValidator,
    WhitespaceValidator,
    EqualValidator,
    EmailValidator
  ],
  providers: [
    AuthService,
  ],
  exports:[LoginComponent]
})
export class AuthModule {}