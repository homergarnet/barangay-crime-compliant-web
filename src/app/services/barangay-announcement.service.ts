import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' , 'AgentId' : 'none'})
};

@Injectable({
  providedIn: 'root'
})
export class BarangayAnnouncementService {
  API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createAnnouncement(Description: string): Observable<any> {
    return this.http.post(this.API_URL + 'api/create-announcement', { Description }, { ...httpOptions });
  }

}
