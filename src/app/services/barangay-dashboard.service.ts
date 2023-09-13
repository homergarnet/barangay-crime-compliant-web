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
export class BarangayDashboardService {

  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTotalDashboardCount() {

    return this.http.get(this.API_URL + `api/total-dashboard-card-count`);

  }

}
