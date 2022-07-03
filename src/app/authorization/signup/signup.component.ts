import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncrpassService } from 'src/app/services/auth/encrpass.service';
import { CustomValidators } from '../custom.validators';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signUpForm!: FormGroup;
  private readonly destroyer$: Subject<void> = new Subject();

  constructor(private authDatabase: AuthService, private router:Router, private EncrDecr:EncrpassService) { }

  ngOnInit(): void {
    this.setupSignUpForm();
  }

  ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  private setupSignUpForm(): void {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dob: new FormControl('',  [Validators.required, CustomValidators.minAge(15)]),
    });
  }

  public getFC(controlName: string): AbstractControl {
    return this.signUpForm.controls[controlName];
  }

  public signUp() : void {
    const dob = this.signUpForm.controls['dob'].value.format('MM/DD/YYYY');
    const password = this.EncrDecr.set('password', this.signUpForm.controls['password'].value);
    
    const params = {
      ...this.signUpForm.value,
      dob,
      password
    }
    this.authDatabase.signup(params).pipe(takeUntil(this.destroyer$)).subscribe(_ =>{
      this.router.navigate(['auth','login']).then();
    }, error => {
      alert(error);
    })
  }
}
