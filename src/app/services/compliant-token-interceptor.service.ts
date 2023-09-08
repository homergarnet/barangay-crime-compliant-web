import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompliantTokenInterceptorService {

  constructor() { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('compliant_token') as string;
    let parseToken = JSON.parse(token);
    if (token) {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${parseToken}`,
            }
        });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('error.status: ', error.status);
        }
        return throwError(error);
      })
    );

  }

}
