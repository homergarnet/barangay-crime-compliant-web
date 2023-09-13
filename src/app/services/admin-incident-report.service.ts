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
export class AdminIncidentReportService {
  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCrimeCompliantList(page: number, pageSize: number): Observable<any> {

    return this.http.get(this.API_URL + `api/get-crime-compliant?page=${page}&pageSize=${pageSize}`);

  }

  getIncidentReportList(date: string, year: number, timeStart: string, timeEnd: string) {

    return this.http.get(this.API_URL + `api/get-manage-incident-report?date=${date}&year=${year}&timeStart=${timeStart}&timeEnd=${timeEnd}`);

  }

}
