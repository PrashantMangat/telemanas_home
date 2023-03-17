import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private snackBar: MatSnackBar, private SpinnerService: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthorizationHeader(req, null)).pipe(
            catchError(err => {
                this.SpinnerService.hide();
                if (err.error.message) {
                    this.snackBar.open(err.error.message, 'x', {
                        duration: 5000,
                    });
                }
                return throwError(err.error);
            })
        );
    }

    // private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    //     return request.clone({ setHeaders: { 'Content-Type': 'application/json' } });
    // }
    private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
        return request.clone({ setHeaders: { 'Access-Control-Allow-Origin': environment.cors } });
        // if (token) {
        //     return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        // }
        // return request;
    }
}
