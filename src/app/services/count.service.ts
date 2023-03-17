import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TotalService } from './Total.service';
import { AppService } from './app.service';
import { DataService } from './data.service';
import { GeneralService } from '../general.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class CountDistrictService extends TotalService {

  constructor(http: HttpClient, appService: AppService, ds: DataService, gs : GeneralService,
     spinn: NgxSpinnerService) {

    super(http, appService, ds, gs,spinn);
  }

  name() {
    return 'CountDistrictService';
  }

  initialize() {
    super.initialize();
     
    // const keysn = ['tmc','mentoringInstitutes','regionalCoordinatingCenter'];
    const keysn = ['name'];

    this.setKeys(keysn);
    // this.setLabels('District', 'Cases');
    this.setxColumn('stateName');
    // this.setDataType('Patient');
    super.setMapParameter('assets/', 'india_states', '.topojson');
    // super.setMapParameter('assets/', 'Karnataka', '.json');

  }
}
