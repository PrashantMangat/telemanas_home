import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import { _MatChipListMixinBase } from '@angular/material';
import { environment } from '../../environments/environment';
import { GeneralService } from '../general.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-general-home',
  templateUrl: './general-home.component.html',
  styleUrls: ['./general-home.component.css']
})

export class GeneralHomeComponent implements OnInit {
  version: any;
  autdioSelected = true;
  videoSelected = false;
  personSelected = false;
  fullImagePath: string;

  constructor(private router: Router, private generalService: GeneralService, private translate: TranslateService) {
    this.version = environment.version;
  }

  fontSize = 'mm';
  newsData;
  serviceData;
  states: any;
  name = 'Angular';
  location = {
    phoneNumber: "1-800 891 4416",
    phoneNumbertwo: 14416,
  }

  stateId = 0;

  ngOnInit() {
    if (sessionStorage.getItem('language') === 'en') {
      this.fullImagePath = '/assets/img/header/WebP/image1.webp'
    } else {
      this.fullImagePath = '/assets/img/header/WebP/image2.webp'
    }

    
    this.stateId = 0;

    this.getNews();
    this.getAllStates();
  }

  getAllTMCs(stateId) {
    this.generalService.getServiceAvailability(stateId).subscribe(response => {
      let serviceList: Array<any> = [];
      let resnewsList = <any>response;
      for (let i = 0; i < resnewsList.length; i++) {
        let service = resnewsList[i];
        serviceList.push(service);
        this.serviceData = serviceList;
      }
    });
  }

  selectedState(event) {
    this.stateId = event;
    this.getAllTMCs(event);

  }

  getNews() {
    this.generalService.getAllNewsRecord().subscribe(response => {
      let NewsList: Array<any> = [];
      let resnewsList = <any>response;
      for (let i = 0; i < resnewsList.length; i++) {
        let district = resnewsList[i];
        if (district.status === "Active") {
          NewsList.push(district);
          this.newsData = NewsList;
          NewsList.sort((a, b) => (Number(a.id) > Number(b.id)) ? -1 : 1);
        }
      }
    });
  }

  getNewsRecord(row) {
    sessionStorage.setItem('newsDetailsData', JSON.stringify(row));
    this.router.navigate(['News-details']);
  }

  getAllStates() {
    this.generalService.getAllStates().subscribe(response => {
      this.states = response;
    });

  }

  modeSelected(x) {
    if (x == 1) {
      this.personSelected = false;
      this.videoSelected = false;
      this.autdioSelected = true;
    } else if (x == 2) {
      this.personSelected = false;
      this.autdioSelected = false;
      this.videoSelected = true;
    } else {
      if (x == 3) {
        this.videoSelected = false;
        this.autdioSelected = false;
        this.personSelected = true;
      }
    }

  }
}
