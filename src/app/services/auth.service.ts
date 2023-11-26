import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AgentId: 'none',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = environment.apiUrl;
  helper: any = new JwtHelperService();
  public loginTypeSubject$ = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  isAuthenticated(pageType: string): boolean {
    const token = localStorage.getItem(pageType + '_token') as string;
    let parseToken = JSON.parse(token);

    if (parseToken == null) {
      this.loginTypeSubject$.next('');
      return false;
    } else if (this.helper.isTokenExpired(parseToken)) {
      this.loginTypeSubject$.next('');
      this.clearSession(pageType);

      if (pageType == 'compliant') {
        this.router.navigate(['/auth/sign-in'], { queryParams: {} });
      }

      if (pageType == 'admin') {
        this.router.navigate(['/auth/admin-sign-in'], { queryParams: {} });
      }

      if (pageType == 'barangay') {
        this.router.navigate(['/auth/barangay-sign-in'], { queryParams: {} });
      }

      const isExpired = this.helper.isTokenExpired(parseToken);
      return isExpired;
    } else {
      this.loginTypeSubject$.next(pageType);
      const isExpired = this.helper.isTokenExpired(parseToken);
      return !isExpired;
    }
  }

  // JWT
  setSession(result: any, pageType: string): void {
    this.loginTypeSubject$.next(pageType);
    // const user: UserModel = jwt_decode(result.access_token);
    localStorage.setItem(pageType + '_token', JSON.stringify(result));
  }

  clearSession(pageType: string): void {
    localStorage.clear();
    // localStorage.removeItem(pageType + "_token");
  }

  redirectToPage(pageType: string): void {
    const isAuthenticated = this.isAuthenticated(pageType);
    if (isAuthenticated) {
      //to route back to previous route
      this.router.navigate(['/' + pageType], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  getAccessToken(
    Username: string,
    Password: string,
    UserType: string
  ): Observable<any> {
    return this.http.post(
      this.API_URL + 'api/login',
      { Username, Password, UserType },
      { ...httpOptions, responseType: 'text' }
    );
  }

  resetPassword(
    NewPassword: string,
    Email: string,
    Token: string
  ): Observable<any> {
    return this.http.put(
      this.API_URL + 'api/update-password',
      { NewPassword, Email, Token },
      { ...httpOptions, responseType: 'text' }
    );
  }

  logout(pageType: string = '') {

    this.loginTypeSubject$.next('');
    if (pageType == 'compliant') {
      this.router.navigate(['/auth/sign-in'], { queryParams: {} });
    }

    if (pageType == 'admin') {
      this.spinner.show();
      this.createPoliceInOut('out').subscribe(
        (res) => {
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();

          // console.log("error: ", error);
        }
      );
      this.router.navigate(['/auth/admin-sign-in'], { queryParams: {} });
    }

    if (pageType == 'barangay') {
      this.router.navigate(['/auth/barangay-sign-in'], { queryParams: {} });
    }

    this.clearSession(pageType);
  }

  getCurrentUserPersonalInfo(): Observable<any> {
    return this.http.get(this.API_URL + `api/get-current-user-personal-info`);
  }

  isCurrentResponder(responderId: number = 0): Observable<any> {
    return this.http.get(
      this.API_URL + `api/is-current-responder?responderId=${responderId}`
    );
  }

  createPoliceInOut(Type: string): Observable<any> {
    return this.http.post(
      this.API_URL + 'api/create-police-in-out',
      { Type },
      { ...httpOptions, responseType: 'text' }
    );
  }

  getAdminDecodedToken() {
    const token = localStorage.getItem('admin_token'); // Adjust this to your token retrieval logic
    if (token && !this.helper.isTokenExpired(token)) {
      return this.helper.decodeToken(token);
    }
    return null;
  }

  downloadApk(): Observable<any> {
    return this.http.get(this.API_URL + `Test/api/download`);
  }
}
