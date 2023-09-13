import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
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
export class AdminUsersService {

  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPersonalInfo(keyword: string, page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-user-personal-info?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);

  }

  getAllBarangayList(keyword: string, page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-barangay-by-code?keyword=${keyword}&page=${page}&pageSize=${pageSize}`);

  }

}
