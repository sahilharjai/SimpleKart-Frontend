import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';


export function ValidateEmail(control: AbstractControl) {
    //let isWhitespace = (control.value || '').trim().length === 0;
    if(!((control.value || '').trim().length === 0)){
      var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
          return { "incorrectMailFormat": true };
      }

      return null;
    }
    return null;
}


@Directive({
  selector: '[validateEmail][ngModel], [validateEmail][formControl], [validateEmail][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidator), multi: true }
  ]
})

export class EmailValidator implements Validators{  

  constructor() {}
	

  validate(control: AbstractControl): { [key:string]: any } {
    return ValidateEmail(control);
  }
}
