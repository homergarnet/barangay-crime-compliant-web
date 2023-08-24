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
  public loginTypeSubject$ = new BehaviorSubject<string>('barangay');
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }
}
