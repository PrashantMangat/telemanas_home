import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  RecordArray: any;
  rec: any;
  complaints: any;
  presc: any;
  diagnosis = [];
  constructor(private router: Router, private gs: GeneralService, private lService: LocationService) { }

  ngOnInit() {
    this.rec = JSON.parse(sessionStorage.getItem('rec'));
    this.complaints = JSON.parse(this.rec.complaint);
    this.presc = JSON.parse(this.rec.prescription);

    if(this.rec.diagnosis != null) {
      this.diagnosis = this.rec.diagnosis;
    }
  }


  back() {
    this.router.navigate(['home'], { replaceUrl: true });
  }

}
