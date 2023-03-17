import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { map } from 'rxjs-compat/operator/map';
import { GeneralService } from '../general.service';
import { MatPaginator } from '@angular/material/paginator';
import { CountDistrictService } from '../services/count.service';
import { DataService } from '../services/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';

export interface TMCData {
  Mentor: string,
  Location: string,
  Email: string,
}

@Component({
  selector: 'app-dashboardhome',
  templateUrl: './dashboardhome.component.html',
  styleUrls: ['./dashboardhome.component.css']
})

export class DashboardhomeComponent implements OnInit {
  @Input()
  public loading;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  fontSize = 'mm';
  baseUrl = environment.cors;
  sub: any;
  sh: any;
  isChecked = true;

  constructor(private connectionService: ConnectionService, private http: Http,
    private translate: TranslateService, private gs: GeneralService,
    public districtService: CountDistrictService, private ds: DataService, private spinn: NgxSpinnerService) {
    translate.addLangs(['en', 'hn', 'ka']);
    translate.setDefaultLang('en');

  }
  mrSelected = false;
  displayedColumns: string[] = ['tmcName', 'city', 'state'];
  stateSelected = true;
  mapSelected = true;
  listSelected = false;
  status = 'ONLINE';
  isConnected = true;
  pgNotAvail: boolean;
  selected = "Select any State/Union Territory";
  states: any;
  step = 1;
  //selectedVal2 ="list";
  selectedVal = "map";
  selectedVal3 = "RCC"
  selected3 = "rcc";
  tempArray = [];
  tempArray2 = [];
  tempType = "rcc";
  orgType = "TMC";
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA_dashboard1);
  allTMCData: any;
  countObj: any;
  callCount: any;
  stateId = 0;
  stateIdTemp = 0;
  text: any;
  isHidePageSize: boolean = true;
  type: any;
  range = "1 Week";
  data: any;
  tmcSelected = true;
  miSelected = false;
  rccSelected = false;

  ngOnInit() {
    this.isChecked = true;
    this.districtService.initialize();
    this.allTMCData = [];
    this.tempArray = [];
    this.tempArray2 = [];
    this.callCount;
    this.tempType = "rcc";
    this.orgType = "TMC";
    this.tmcSelected = true;
    this.miSelected = false;
    this.rccSelected = false;
    sessionStorage.setItem('orgType', this.orgType)
    this.stateId = 0;
    this.stateIdTemp = 0;
    // this.mapOrgType = "TMC";
    this.getAllStates();
    this.getAllTMCs(this.stateId, this.orgType);
    this.getCount();
    this.getCallCount();
    this.sub = Observable.interval(60000)
      .subscribe((val) => {
        this.getCallCount();
      });
  }

  ngAfterViewInit() {
    this.showLoader();
    this.districtService.updateParameter();
    this.districtService.getDataFromServer(this.orgType);
  }

  selectedView(value) {
    this.districtService.getDataFromServer(this.orgType);
    if (value === "map") {
      this.showLoader();
      this.step = 1;
      this.listSelected = false;
      this.mapSelected = true;
      this.selectedVal = "map";
    } else {
      this.loading = false;
      if (this.orgType == "TMC") {
        this.step = 2;
      } else {
        this.step = 1;
      }
      this.mapSelected = false;
      this.listSelected = true;
      this.selectedVal = "list";
    }
  }

  route() {
    sessionStorage.setItem('validRoute', 'true');
  }

  getAllStates() {
    this.gs.getAllStates().subscribe(response => {
      this.states = response;
      this.states.sort((a, b) => (a.stateName < b.stateName ? -1 : 1));
      let obj = {
        "stateid": 0,
        "stateName": "All"
      }
      this.states.unshift(obj)
    });
  }

  getAllTMCs(stateId, type) {
    this.allTMCData = [];
    this.tempArray = [];
    this.gs.getAllTMCs(stateId, type).subscribe(response => {
      this.allTMCData = response;
      this.tempArray = response;
      for (var k = 0; k < this.tempArray.length; k++) {
        this.tempArray[k].tmcName1 = this.tempArray[k].tmcName;
      }
      this.allTMCData.sort((a, b) => (a.state < b.state ? -1 : 1));
      this.dataSource.data = this.allTMCData;
      this.dataSource.paginator = this.paginator;
    });
  }

  getCount() {
    this.gs.getCount().subscribe(response => {
      this.countObj = response;
    })
  }

  getCallCount() {
    this.gs.getCallCount().subscribe(response => {
      
      this.callCount = response;
      // console.log("call count", this.callCount);
    })
  }

  selectedState(event) {
    this.stateId = event;
    this.stateIdTemp = event;
    this.getAllTMCs(event, this.orgType);
  }


  selectedType(x) {
    if (this.mapSelected) {
      this.showLoader();
    }
    this.stateId = this.stateIdTemp;
    this.districtService.getDataFromServer(x);
    this.selectedVal3 = x;
    this.tempType = x;
    this.orgType = x;
    sessionStorage.setItem('orgType', x)
    if (x === "TMC") {
      this.tmcSelected = true;
      this.miSelected = false;
      this.rccSelected = false;
      if (this.listSelected) {
        this.step = 2;
      } else {
        this.step = 1;
      }
      this.mrSelected = false;
      this.getAllTMCs(this.stateId, this.orgType);
      for (var i = 0; i < this.allTMCData.length; i++) {
        this.allTMCData[i].tmcName = this.tempArray[i].tmcName1;
      }
    } else if (x === "MI") {
      this.tmcSelected = false;
      this.miSelected = true;
      this.rccSelected = false;
      this.step = 1;
      this.mrSelected = true;
      this.stateId = 0;
      this.getAllTMCs(this.stateId, this.orgType);
      for (var i = 0; i < this.allTMCData.length; i++) {
        this.allTMCData[i].tmcName = this.tempArray[i].mentoringInstitute;
      }
    }
    else {
      this.tmcSelected = false;
      this.miSelected = false;
      this.rccSelected = true;
      this.step = 1;
      this.mrSelected = true;
      this.stateId = 0;
      this.getAllTMCs(this.stateId, this.orgType);
      for (var i = 0; i < this.allTMCData.length; i++) {
        this.allTMCData[i].tmcName = this.tempArray[i].rcc;
      }
    }
    this.dataSource.data = this.allTMCData;
    this.dataSource.paginator = this.paginator;
  }

  getdate() {
    this.text = document.lastModified;
  }

  onPaginateChange(event) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
  }

  showLoader() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}

export interface PeriodicElement_dashboard1 {
  tmcName: string;
  city: string;
  state: string;
}

const ELEMENT_DATA_dashboard1: PeriodicElement_dashboard1[] = [
  { tmcName: '', city: '', state: '' },
];