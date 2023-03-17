import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as GlobalVariables from '../app/global';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  httpClient: any;

  constructor(private httpC: HttpClient) {
  }

  getFaq() {
    return this.httpC.get(GlobalVariables.getFaqUrl)
  }

  getNews() {
    return this.httpC.get(GlobalVariables.getNewsUrl);
  }

  getPageViews() {
    return this.httpC.get(GlobalVariables.getPageViews);
  }

  getAllStates() {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', environment.cors);
    return this.httpC.get<any[]>(GlobalVariables.getStatesList);
  }

  getServiceAvailability(stateId) {
    let headers = new HttpHeaders();
   headers = headers.append('Content-Type', 'application/json');
   headers.append('Access-Control-Allow-Origin', environment.cors);
    return this.httpC.get<any[]>(GlobalVariables.getServiceAvailability +stateId, {  headers });
  }

  getAllNewsRecord() {
    return this.httpC.get(GlobalVariables.getAllNewsRecord);
  }

  isValidRoute() {
    if (sessionStorage.getItem('validRoute') === 'true') {
      sessionStorage.setItem('validRoute', 'false');
      return true;
    } else {
      return false;
    }
  }

}
