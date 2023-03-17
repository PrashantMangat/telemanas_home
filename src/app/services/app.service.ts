import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  options;
  constructor(private http: Http, private httpC: HttpClient){

  }
}