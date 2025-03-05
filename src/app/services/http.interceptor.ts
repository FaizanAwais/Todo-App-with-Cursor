import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Bad Request';
              break;
            case 401:
              errorMessage = 'Unauthorized';
              break;
            case 403:
              errorMessage = 'Forbidden';
              break;
            case 404:
              errorMessage = 'Not Found';
              break;
            case 500:
              errorMessage = 'Internal Server Error';
              break;
            default:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        this.alertService.error(errorMessage);
        return throwError(() => error);
      })
    );
  }
} 