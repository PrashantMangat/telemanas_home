import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as GlobalVariables from '../global';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient) { }

getGender() {
    return of({
      "15-07-2022": {
        "volumeSales": "109",
        "valueSales": "1.23"
      },
      "16-07-2022": {
        "volumeSales": "0.11",
        "valueSales": "1.56"
      },
      "17-07-2022": {
        "volumeSales": "0.12",
        "valueSales": "1.69"
      },
      "18-07-2022": {
        "volumeSales": "0.12",
        "valueSales": "1.64"
      },
      "19-07-2022": {
        "volumeSales": "0.10",
        "valueSales": "1.41"
      },
      "20-07-2022": {
        "volumeSales": "0.55",
        "valueSales": "7.53"
      }
    });
  }

  getData() {
    // const headers = new Headers();
    // this.createAuthorizationHeader1(headers);
     return this.httpClient.get(GlobalVariables.getMapData);
  }

  getTMC(type) {
    // const headers = new Headers();
    // this.createAuthorizationHeader1(headers);
     return this.httpClient.get(GlobalVariables.getOrgData+type);
  }


}
