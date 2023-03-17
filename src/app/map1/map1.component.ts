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
  selector: 'app-map1',
  templateUrl: './map1.component.html',
  styleUrls: ['./map1.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Map1Component implements OnInit {
  // Input Parameter
  @Input() private mapService: any;

  private mapName: string;
  private mapdata: any;
  private mapDirPath: string;
  private fileExt: string;
  MIName: any;
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

  // Dimensions = [
  //   { x: "430.761", y: "1280.59", miName: "NIMHANS, Bengaluru, Karnataka", state: "Karnataka" },
  //   { x:"550.761", y:"1200.59", miName: "AIIMS, Mangalagiri, Andhra Pradesh", state: "Andhra Pradesh"},
  //   { x: "430.553", y: "410.137", miName: "IHBAS, Delhi, Delhi", state: "Delhi" },
  //   { x: "665.518", y:"825.61", miName: "AIIMS, Raipur, Chhattisgarh", state: "Chhattisgarh" },
  //   { x: "857.518", y:"600.61", miName: "IGIMS, Patna, Bihar", state: "Bihar" },
  //   { x: "240.761", y: "1135.59", miName: "Institute of Psychiatry and Human Behaviour, Goa", state: "Goa" },
  //   { x: "190.761", y: "705.59", miName: "Hospital for Mental Health, Ahmedabad, Gujarat", state: "Gujarat" },
  //   { x: "420.553", y:"310.137", miName: "PGIMER, Chandigarh, Chandigarh", state: "Chandigarh" },
  //   { x: "467.553", y:"250.137", miName: "IGMC, Shimla, Himachal Pradesh", state: "Himachal Pradesh" },
  //   { x: "305.878", y: "107.51", miName: "Psychiatric Diseases Hospital, Srinagar, Jammu & Kashmir", state: "Jammu & Kashmir" },
  //   { x: "855.531", y:"700.138", miName: "Central Institute of Psychiatry(CIP), Ranchi, Jharkhand", state: "Jharkhand" },
  //   { x: "348.256", y:"1400.806", miName: "The Institute of Mental Health & Neuro Sciences (IMHANS), Kozhikode, Kerala", state: "Kerala" },
  //   { x: "400.518", y:"710.61", miName: "AIIMS, Bhopal, Madhya Pradesh", state: "Madhya Pradesh" },
  //   { x: "490.761", y:"855.59", miName: "AIIMS, Nagpur, Maharashtra", state: "Maharashtra" },
  //   { x: "1230.545", y: "575.843", miName: "LGBRIMH, Tezpur, Assam", state: "Assam" },
  //   { x: "850.531", y:"860.138", miName: "Mental Health Institute (Centre of Excellence) SCB MCH, Cuttack, Orissa", state: "Orissa" },
  //   { x: "289.021", y:"512.094", miName: "Psychiatry Centre, Sawai Man Singh Medical College, Jaipur, Rajasthan", state: " Rajasthan" }, 
  //   { x: "550.761", y:"1395.59", miName: "JIPMER, Puducherry", state: "Puducherry" },
  //   { x: "580.761", y:"1280.59", miName: "Institute of Mental Health(IMH), Chennai, Tamil Nadu", state: "Tamil Nadu" },
  //   { x: "550.761", y:"1055.59", miName: "Institute of Mental Health(IMH), Hyderabad, Telengana", state: "Telengana" },
  //   { x: "657.518", y:"525.61", miName: "KGMU, Lucknow, Uttar Pradesh", state: "Uttar Pradesh" },
  //   { x: "510.518", y:"325.61", miName: "AIIMS, Rishikesh, Uttarakhand", state: "Uttarakhand" },
  //   { x: "999.531", y:"720.138", miName: "Pavlov Hospital and CoE, CNMCH, Kolkata, West Bengal", state: "West Bengal" },
  // ];

  constructor(private http: HttpClient, private gs: GeneralService, private location: Location, private router: Router) { }
  public isMapLoaded = false;
  miDimensions: any;

  ngOnInit() {
    this.miDimensions = [];
    if (JSON.parse(sessionStorage.getItem('MiArray')) === null) {
      this.getAllTMCs('0', 'MI');
    } else {
      this.miDimensions = JSON.parse(sessionStorage.getItem('MiArray'))
    }
  }

  getAllTMCs(stateId, type) {
    this.miDimensions = [];
    // this.tempArray = [];
    this.gs.getAllTMCs(stateId, type).subscribe(response => {
      this.miDimensions = response;
      sessionStorage.setItem('MiArray', JSON.stringify(this.miDimensions));
    });
  }

  // onClick(value) {
  //   var state = value.split(" ").join("");
  //   this.router.navigate(["state", state]);
  // }

  over_city_state(value){
    // console.log("mivalue1", value)
    this.tooltip = value;
  }
  over_MIName(value) {
    // console.log("mivalue", value)
    this.MIName =value;
  }

  out_state(value) {
    this.tooltip = "";
    this.MIName ="";
  }

  goToDashboard() {
    this.location.back();
  }
}

