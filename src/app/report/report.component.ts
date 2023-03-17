import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  fromDate: any;
  toDate: any;
  today = new Date();
  distDate: any;
  orgDate: any;
  selectType: any;
  constructor(private router: Router, private gs: GeneralService, private spinn: NgxSpinnerService) { }

  ngOnInit() {
    this.today = new Date();

  }
  goToDashboard() {
    this.router.navigate(['adminDashboard']);
  }

  downloadReport() {
    this.spinn.show();
    const reportObject = {
      fromDate:  new DatePipe('en-US').transform(this.fromDate, 'dd-MM-yyyy'),
      toDate: new DatePipe('en-US').transform(this.toDate, 'dd-MM-yyyy'),
    };
    this.gs.getReport(reportObject)
      .subscribe(x => {
        this.gs.getCsvFile(x, 'Report');
        this.spinn.hide();
      }, (error) => {
          this.spinn.hide();
      });
  }

  distReport(){
    this.spinn.show();
    const reportObject = {
      selectedDate:  new DatePipe('en-US').transform(this.distDate, 'dd-MM-yyyy'),
      // toDate: new DatePipe('en-US').transform(this.toDate, 'dd-MM-yyyy'),
    };
    this.gs.getDistrictReport(reportObject)
      .subscribe(x => {
        this.gs.getCsvFile(x, 'DistrictReport');
        this.spinn.hide();
      }, (error) => {
          this.spinn.hide();
      });
  }

  orgReport(){
    this.spinn.show();
    const reportObject = {
      selectedDate:  new DatePipe('en-US').transform(this.orgDate, 'dd-MM-yyyy'),
      // toDate: new DatePipe('en-US').transform(this.toDate, 'dd-MM-yyyy'),
    };
    this.gs.getOrgReport(reportObject)
      .subscribe(x => {
        this.gs.getCsvFile(x, 'OrgWiseReport');
        this.spinn.hide();
      }, (error) => {
          this.spinn.hide();
      });
  }

}


