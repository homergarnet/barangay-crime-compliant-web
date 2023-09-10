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

  isAuthenticated(pageType: string): boolean {
    const token = localStorage.getItem(pageType + '_token') as string;
    let parseToken = JSON.parse(token);

    const helper = new JwtHelperService();

    if(parseToken == null) {

      this.loginTypeSubject$.next('');
      return false;

    } else if(helper.isTokenExpired(parseToken)) {

      this.loginTypeSubject$.next('');
      this.clearSession();

      if(pageType == 'compliant'){

        this.router.navigate(['/auth/sign-in'], { queryParams: {} });

      }

      if(pageType == 'admin'){

        this.router.navigate(['/auth/admin-sign-in'], { queryParams: {} });

      }

      if(pageType == 'barangay'){

        this.router.navigate(['/auth/barangay-sign-in'], { queryParams: {} });

      }

      const isExpired = helper.isTokenExpired(parseToken);
      return isExpired;

    }

    else {

      this.loginTypeSubject$.next(pageType);
      const isExpired = helper.isTokenExpired(parseToken);
      return !isExpired;

    }


  }

  // JWT
  setSession(result: any, pageType: string): void {

    this.loginTypeSubject$.next(pageType);
    // const user: UserModel = jwt_decode(result.access_token);
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(result));

    localStorage.setItem(pageType + "_token", JSON.stringify(result));

  }

  clearSession(): void {

    localStorage.clear();

  }

  redirectToPage(pageType: string): void {
    const isAuthenticated = this.isAuthenticated(pageType);
    if( isAuthenticated ) {

      //to route back to previous route
      this.router.navigate(['/' + pageType], {relativeTo: this.activatedRoute});
    }

  }

  getAccessToken(Username: string, Password: string, UserType: string): Observable<any> {
    return this.http.post(this.API_URL + 'api/login', { Username, Password, UserType }, { ...httpOptions, responseType: 'text' });
  }

  logout(pageType: string = '') {

    this.clearSession();
    this.loginTypeSubject$.next('');
    if(pageType == 'compliant'){

      this.router.navigate(['/auth/sign-in'], { queryParams: {} });

    }

    if(pageType == 'admin'){

      this.router.navigate(['/auth/admin-sign-in'], { queryParams: {} });

    }

    if(pageType == 'barangay'){

      this.router.navigate(['/auth/barangay-sign-in'], { queryParams: {} });

    }

  }

  getCurrentUserPersonalInfo(): Observable<any> {

    return this.http.get(this.API_URL + `api/get-current-user-personal-info`);

  }

}
