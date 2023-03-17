import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import * as topojson from 'topojson';
import { Location } from '@angular/common';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-map2',
  templateUrl: './map2.component.html',
  styleUrls: ['./map2.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Map2Component implements OnInit {
  // Input Parameter
  @Input() private mapService: any;

  private mapName: string;
  private mapdata: any;
  private mapDirPath: string;
  private fileExt: string;
  RCCName: any;
  private margin: any = { top: 20, bottom: 10, left: 40, right: 60 };
  private svg: any;
  private width: number;
  private height: number;
  private jsondata: any;
  private formattedData: any = null;
  private xColumn: string;
  private dataType: string;
  private keys: string[];
  private currkeys: string[];
  private z: any;
  public state: any
  public tmc: any;
  orgType = '';
  @ViewChild('map') private chartContainer: ElementRef;

  // new map
  title = "map1";
  tooltip: string;

  // RccDimensions = [
  //   { x: "855.531", y: "700.138", rccName: "CIP, Ranchi, Jharkhand", state: "Jharkhand" },
  //   { x: "430.761", y: "1280.59", rccName: "NIMHANS, Bengaluru, Karnataka", state: "Karnataka" },
  //   { x: "430.553", y: "410.137", rccName: "IHBAS, Delhi, Delhi", state: "Delhi" },
  //   { x: "1230.545", y: "575.843", rccName: "LGBRIMH, Tezpur, Assam", state: "Assam" },
  //   { x: "420.553", y: "310.137", rccName: "PGIMER, Chandigarh, Chandigarh", state: "Chandigarh" },
  // ];

  constructor(private http: HttpClient, private gs: GeneralService ,private location: Location, private router: Router) { }
  public isMapLoaded = false;
  RccDimensions: any;

  ngOnInit() {
    this.RccDimensions = [];
    if (JSON.parse(sessionStorage.getItem('RccArray')) === null) {
      this.getAllTMCs('0', 'RCC');
    } else {
      this.RccDimensions = JSON.parse(sessionStorage.getItem('RccArray'))
    }
  }

  getAllTMCs(stateId, type) {
    this.RccDimensions = [];
    // this.tempArray = [];
    this.gs.getAllTMCs(stateId, type).subscribe(response => {
      this.RccDimensions = response;
      sessionStorage.setItem('RccArray', JSON.stringify(this.RccDimensions));
    });
  }

  over_city_state(value){
    // console.log("RCCvalue1", value)
    this.tooltip = value;
  }
  over_RCCName(value) {
    // console.log("RCCvalue", value)
    this.RCCName =value;
  }

  out_state(value) {
    this.tooltip = "";
    this.RCCName ="";
  }

  goToDashboard() {
    this.location.back();
  }

}
