import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' ,
    'AgentId' : 'none',

  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = environment.apiUrl;

  private authLocalStorageToken = 'MARKET_PLACE_USER';
  public loginTypeSubject$ = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token') as string;
    let parseToken = JSON.parse(token);
    const helper = new JwtHelperService();


    if(parseToken?.access_token == null) {

      this.loginTypeSubject$.next('');
      return false;

    } else if(helper.isTokenExpired(parseToken.access_token)) {

      this.loginTypeSubject$.next('');
      this.clearSession();
      this.router.navigate(['/auth/compliant-sign-in'], { queryParams: {} });
      const isExpired = helper.isTokenExpired(parseToken.access_token);
      return isExpired;

    }

    else {

      this.loginTypeSubject$.next('compliant');
      const isExpired = helper.isTokenExpired(parseToken.access_token);
      return !isExpired;
    }


  }

  // JWT
  setSession(result: any): void {

    this.loginTypeSubject$.next('compliant');
    // const user: UserModel = jwt_decode(result.access_token);
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(result));
    localStorage.setItem("token", JSON.stringify(result));

  }

  clearSession(): void {

    localStorage.clear();

  }

  redirectToCompliantPage(): void {

    const isAuthenticated = this.isAuthenticated();
    if( isAuthenticated ) {
      //to route back to previous route
      this.router.navigate(['/compliant'], {relativeTo: this.activatedRoute});
    }

  }

  getAccessToken(Username: string, Password: string, UserType: string): Observable<any> {
    return this.http.post(this.API_URL + 'api/login', { Username, Password, UserType }, { ...httpOptions, responseType: 'text' });
  }

}
