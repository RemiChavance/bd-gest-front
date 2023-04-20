import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      
      if ([401, 403].includes(err.status) && this.authService.getToken()) {
        
        // auto signOut if 401 or 403 response returned from api
        this.authService.signOut();
        // then send to login page
        this.router.navigateByUrl('/signin');

        console.error(err);
      }

      return throwError(() => err);
    }))
  }
}
