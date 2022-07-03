import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly showToolBar$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  signup(data: any) {
    return this.http.post(`${environment.baseUrl}/signupUsers`, data);
  }

  login() {
    return this.http.get(`${environment.baseUrl}/signupUsers`);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  public getHeader(): Observable<any> {
    return this.showToolBar$.asObservable();
  }

  public setHeader(value: any): void {
    this.showToolBar$.next(value);
  }
}
