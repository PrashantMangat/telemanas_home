import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CountDistrictService } from '../services/count.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-indiamap',
  templateUrl: './indiamap.component.html',
  styleUrls: ['./indiamap.component.css']
})
export class IndiamapComponent implements OnInit {

  @Input()
  public orgType;

  type:any;

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
    this.type = this.orgType;
    // this.ds.getData().subscribe(data => {
    //   this.userArr = new MatTableDataSource(data);
    // });
    // if(sessionStorage.getItem('type') != null){
    //   this.type = sessionStorage.getItem('type');
    // } else {
    //   this.type = 'TMC';
    // }
    this.districtService.updateParameter();
    this.districtService.getDataFromServer(this.type);
  }

  selectedType(type){
    sessionStorage.setItem('type',type);
    this.districtService.getDataFromServer(type);

  }

  
}

