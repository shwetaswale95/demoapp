import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crmdevelopment';
  showHeader: boolean = false;
  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.getHeader().subscribe(res => {
      res?this.showHeader = true:this.showHeader= false;
    });
    if(this.auth.isLoggedIn()) {
      this.showHeader = true;
    }
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['auth','login']).then();
    this.showHeader = false;
  }
}
