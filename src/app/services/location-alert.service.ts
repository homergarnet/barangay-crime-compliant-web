import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json' ,
    'AgentId' : 'none',

  })
};

@Injectable({
  providedIn: 'root'
})
export class LocationAlertService {

  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getLocationList(status: string = '', keyword: string = '', page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-location?status=${status}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`);

  }

}
