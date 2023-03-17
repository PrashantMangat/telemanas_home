import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take,finalize } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService,
              private router: Router, private snackBar: MatSnackBar, private SpinnerService: NgxSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.SpinnerService.show();
    const accessToken = sessionStorage.getItem('token');

    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      finalize(() => {
        if (sessionStorage.getItem('manualSpinn') !== 'true') {
            this.SpinnerService.hide();
        }
    }),
      catchError(err => {
        sessionStorage.setItem('manualSpinn', 'false');
        this.SpinnerService.hide();
          if (err instanceof HttpErrorResponse && err.status === 401) {
          // get refresh tokens
          const refreshToken = sessionStorage.getItem('token');

          // if there are tokens then send refresh token request
          if (refreshToken && accessToken) {
            return this.refreshToken(req, next);
          }

          // otherwise logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        this.SpinnerService.hide();
        // in case of 403 http error (refresh token failed)
        if (err instanceof HttpErrorResponse && err.status === 403) {
          // logout and redirect to login page
          return this.logoutAndRedirect(err);
        }
        // if error has status neither 401 nor 403 then just return this error
        return throwError(err);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return request;
  }

  private logoutAndRedirect(err): Observable<HttpEvent<any>> {
    const obj = {
        userId: sessionStorage.getItem('userID'),
        sessionToken: sessionStorage.getItem('sessionToken'),
      };
    this.authService.logout();
    this.snackBar.open('Session Expired, Please login again', 'x', {
      duration: 5000,
    });
    this.refreshingInProgress = false;
    // this.router.navigateByUrl('');
    this.router.navigate(['']);
    return throwError(err);
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          const nToken = res[`token`];
          sessionStorage.setItem('token', nToken);
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(nToken);
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, nToken));
        })
      );
    } else {
      // wait while getting new token
      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {
          // repeat failed request with new token
          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }
}