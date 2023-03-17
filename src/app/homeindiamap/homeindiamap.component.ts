import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CountDistrictService } from '../services/count.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homeindiamap',
  templateUrl: './homeindiamap.component.html',
  styleUrls: ['./homeindiamap.component.css']
})
export class HomeindiamapComponent implements OnInit {
  range = "1 Week";
  data : any;
  displayedColumns = ['position', 'state', 'calls', 'tmcs'];
  pageObj: any;
  userPgLen: any;
  userArr = new MatTableDataSource<any>();

  @ViewChild('userPaginator', { read: MatPaginator }) userPaginator: MatPaginator;

  constructor(public districtService: CountDistrictService,private ds:DataService) { }

  ngOnInit() {
    this.districtService.initialize();
  }
  ngAfterViewInit() {
    // this.ds.getStatesDataW().subscribe(data => {
    //   this.userArr = new MatTableDataSource(data);
    // });
    // this.districtService.updateParameter();
    // this.districtService.getDataFromServer('W');
  }


  


 
  
}
