import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    AgentId: 'none',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ReceiveCrimeService {
  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  receiveCrimeList(
    reportType: string = '',
    status: string = '',
    keyword: string = '',
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get(
      this.API_URL +
        `api/get-manage-crime?reportType=${reportType}&status=${status}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`
    );
  }

  manageCrimeCount(reportType: string = ''): Observable<any> {
    return this.http.get(
      this.API_URL + `api/get-manage-crime-count?reportType=${reportType}`
    );
  }

  updateCrimeStatusById(
    id: number = 0,
    responderId: number = 0,
    responderDescription: string = '',
    status: string = ''
  ) {
    return this.http.put(
      this.API_URL +
        `api/update-crime-status?id=${id}&responderId=${responderId}&responderDescription=${responderDescription}&status=${status}`,
      httpOptions
    );
  }

  getCrimeImageVideoByIdList(crimeCompliantReportId: number) {
    return this.http.get(
      this.API_URL +
        `api/get-crime-image?crimeCompliantReportId=${crimeCompliantReportId}`
    );
  }
}
