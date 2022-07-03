import { AbstractControl, ValidationErrors } from "@angular/forms";
import * as moment from 'moment';

export class CustomValidators {

  public static validateNumber(control: AbstractControl): ValidationErrors | null {
      const reqExp = !/\D+/g.test(control.value);
      return reqExp ? null : { isNumber: false };
  }

  public static minAge(minAge: number) {

    return (control: AbstractControl) => {
      const age = moment(control.value);
      const now = moment();
      return now.diff(age, 'years') >= minAge ?
        null : { tooYoung: true }
    }
  }



}