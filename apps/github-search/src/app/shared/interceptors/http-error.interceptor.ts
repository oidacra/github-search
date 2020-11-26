import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private modalService: NzMessageService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let throwErrorMessage = 'Error en la aplicación';
        console.log(error);
        if (error.error instanceof ErrorEvent) {
          // client-side error
          throwErrorMessage = `Error: ${error.error.message}`;
        } else {
          const serverSideMessage = error.error;
          console.log(serverSideMessage);

          switch (error.status) {
            case 403:
              throwErrorMessage = serverSideMessage.message;
              this.modalService.error(serverSideMessage.message, {
                nzDuration: 5000,
              });
              break;

            default:
              throwErrorMessage =
                'No se puede acceder al servidor. Intente nuevamente';
              this.modalService.error(throwErrorMessage);
              break;
          }
        }

        return throwError(throwErrorMessage);
      })
    );
  }
}
