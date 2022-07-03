import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EncrpassService } from 'src/app/services/auth/encrpass.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authDatabase: AuthService, private router:Router,
    private EncrDecr:EncrpassService) { }

  ngOnInit(): void {
    this.setupLoginForm();
  }

  private setupLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  public getFC(controlName: string): AbstractControl {
    return this.loginForm.controls[controlName];
  }

  public login() : void {
    this.authDatabase.login().subscribe((res:any) => {
      const user = res.find((item: any) => {
        const decryPassord = this.EncrDecr.get('password', item.password);
        return item.email === this.loginForm.value.email && decryPassord === this.loginForm.value.password
      });
      if(user) {
        this.loginForm.reset();
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs');
        this.router.navigate(['employee']).then();
        this.authDatabase.setHeader(true);
      } else {
        alert('Invalid credentials, user not found !!!');
      }
    }, error => {
      alert(error);
    })
  }
}
