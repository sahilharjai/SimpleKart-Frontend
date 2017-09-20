import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';


export function NoWhitespaceValidator(control: AbstractControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
}


@Directive({
  selector: '[validateWhitespace][ngModel], [validateWhitespace][formControl], [validateWhitespace][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => WhitespaceValidator), multi: true }
  ]
})

export class WhitespaceValidator implements Validators{  

  constructor() {}
	

  validate(control: AbstractControl): { [key:string]: any } {
    return NoWhitespaceValidator(control);
  }
}
