import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit  {

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
      if(this.auth.isLoggedIn()) {
        this.router.navigate(['employee']).then();
      }
  }
}
