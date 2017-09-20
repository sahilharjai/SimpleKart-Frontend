import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';


export function validateMobile(control: AbstractControl) {
    let mobile = control.value
    let isnum = /^\d+$/.test(mobile);
    let isValid:boolean = false;
    if (isnum){
      isValid = mobile.toString().length === 10;
    }
    return isValid && isnum ? null : { 'mobile': true }
}


@Directive({
  selector: '[validateMobile][ngModel], [validateMobile][formControl], [validateMobile][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MobileValidator), multi: true }
  ]
})

export class MobileValidator implements Validators{  

  constructor() {}
	

  validate(control: AbstractControl): { [key:string]: any } {
    return validateMobile(control);
  }
}
