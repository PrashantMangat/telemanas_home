import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as GlobalVariables from '../global';
import {Http, Headers} from '@angular/http';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': environment.cors});
headers1 = new Headers ({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': environment.cors, 'Authorization': 'Bearer' + ' ' + sessionStorage.getItem('token')});

  constructor(private http: Http, private snackBar: MatSnackBar, private httpClient: HttpClient) { }
  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', environment.cors);
    headers.append( 'Authorization', 'Bearer' + ' ' + sessionStorage.getItem('token'));
  }
  login(jsonObject) {
    return this.http.post(GlobalVariables.loginUrl, jsonObject, {headers: this.headers});
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
      const token = sessionStorage.getItem('token');
      const decodedToken = helper.decodeToken(token);
      const expirationDate = helper.getTokenExpirationDate(token);
      const isExpired = helper.isTokenExpired(token);
    if (!token) {
      return false;
    } else {
      if (isExpired) {
        this.snackBar.open('Session Expired Please Login to Continue', 'x', {
          duration: 6000,
      });
        return false;
      }
      return true;
    }

  }

  logout() {
    const headers = new Headers();
  this.createAuthorizationHeader(headers);
    return this.http.get(GlobalVariables.logoutUrl + '/' + sessionStorage.getItem('userID') + '/' +
     sessionStorage.getItem('sessionToken'), {headers: headers});
  }

  getSalt(username) {
    return this.http.get(GlobalVariables.genSaltUrl + username);
   }
   changePassword(obj) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(GlobalVariables.changePassUrl, obj, {headers: headers});

  }
   getCaptcha(purpose) {
    return this.http.post(GlobalVariables.getCaptchaUrl  + purpose, {}, {headers: this.headers});
  }

  getNewToken() {
    // const headers = new Headers();
    // this.createAuthorizationHeader1(headers);
    const path = GlobalVariables.refreshToken + sessionStorage.getItem('sessionId') + '/' +
    sessionStorage.getItem('sessionToken') + '/' + sessionStorage.getItem('userName');
    return this.httpClient.get(path);
  }

  refreshToken(): Observable<any> {
    // const refreshToken = sessionStorage.getItem('refreshToken');
    const path = GlobalVariables.refreshToken + sessionStorage.getItem('sessionId') + '/' +
    sessionStorage.getItem('sessionToken') + '/' + sessionStorage.getItem('userName');
    return this.httpClient.get(path);
   }

  isAdmin() {
    if (sessionStorage.getItem('role') === 'Admin') {
      return true;
    } else {
      return false;
    }
  }
  isMHP() {
    if (sessionStorage.getItem('role') === 'MHProfessional') {
      return true;
    } else {
      return false;
    }
  }

  isUpdate() {
    if (sessionStorage.getItem('isUpdate') === 'true') {
      return true;
    } else {
      return false;
    }
  }


}
