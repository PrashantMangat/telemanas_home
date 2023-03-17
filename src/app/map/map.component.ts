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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  // Input Parameter
  @Input() private mapService: any;

  private mapName: string;
  private mapdata: any;
  private mapDirPath: string;
  private fileExt: string;
  tmcName: any;
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
  //   { x: "927.518", y: "600.61", tmcName: "Jawaharlal Nehru Medical College and Hospital (JNMCH), Bhagalpur, Bihar", state: "Bihar" },
  //   { x: "787.518", y: "590.61", tmcName: "Bihar Institute of Mental Health and Allied Sciences (BIMHAS), Bhojpur, Bihar", state: "Bihar" },
  //   { x: "1230.518", y: "665.61", tmcName: "Directorate of Hospital & Medical Education, MINECO, Khatla, Aizawl", state: "Mizoram" },
  //   { x: "720.518", y: "595.61", tmcName: "Mental Hospital, Varanasi, Uttar Pradesh", state: "Uttar Pradesh" },
  //   { x: "480.518", y: "385.61", tmcName: "Mental Health Institute & Hospital, Agra, Uttar Pradesh", state: "Uttar Pradesh" },
  //   { x: "640.518", y: "565.61", tmcName: "Mental Health Hospital, Bareilly, Uttar Pradesh", state: "Uttar Pradesh" },
  //   { x: "480.553", y:"300.137", tmcName: "Mental Health Institute, Selaqui, Dehradun, Uttarakhand", state: "Uttarakhand"},
  //   { x: "470.518", y: "580.61", tmcName: "Gwalior Mental Hospital, Gwalior, Madhya Pradesh", state: "Madhya Pradesh" },
  //   { x: "350.518", y: "750.61", tmcName: "MGM Medical College, Indore, Madhya Pradesh", state: "Madhya Pradesh" },
  //   { x: "720.518", y: "535.61", tmcName: "BRD Medical College, Gorakhpur, Uttar Pradesh", state: "Uttar Pradesh" },
  //   { x: "670.518", y: "845.61", tmcName: "District Hospital, Raipur, Chhattisgarh", state: "Chhattisgarh" },
  //   { x: "830.531", y: "920.138", tmcName: "District Mental Health Programme (DMHP) / De-Addiction Centre (DAC) Unit of MKCG MCH Campus, Berhampur, Ganjam, Orissa", state: "Orissa" },
  //   { x: "870.531", y: "860.138", tmcName: "Mental Health Institute (Centre of Excellence) SCB MCH, Cuttack, Orissa", state: "Orissa" },
  //   { x: "999.531", y: "740.138", tmcName: "Swasthya Bhawan Campus, Kolkata, West Bengal", state: "West Bengal" },
  //   { x: "855.531", y: "700.138", tmcName: "CIP, Ranchi, Jharkhand", state: "Jharkhand" },
  //   { x: "390.761", y: "995.59", tmcName: "Geriatric Health & Mental Illness Center, Ambejogai, Beed or District Hospital, Osmanabad, Maharashtra", state: "Maharashtra" },
  //   { x: "260.761", y: "955.59", tmcName: "Regional Mental Hospital, Pune, Maharashtra", state: "Maharashtra" },
  //   { x: "210.761", y: "925.59", tmcName: "Regional Mental Hospital, Thane, Maharashtra", state: "Maharashtra" },
  //   { x: "310.761", y: "1145.59", tmcName: "DIMHANS, Dharwad, Karnataka", state: "Karnataka" },
  //   { x: "430.761", y: "1280.59", tmcName: "NIMHANS, Bengaluru, Karnataka", state: "Karnataka" },
  //   { x: "610.761", y: "1100.59", tmcName: "Siddartha Medical College, Vijayawada, Andhra Pradesh", state: "Andhra Pradesh" },
  //   { x: "550.761", y: "1055.59", tmcName: "Institute of Mental Health, Hyderabad, Telangana", state: "Telangana" },
  //   { x: "570.761", y: "1300.59", tmcName: "104 Helpline, The Director of Medical & Rural Health Services, Chennai-6, Tamil Nadu", state: "Tamil Nadu" },
  //   { x: "857.518", y: "600.61", tmcName: "Indira Gandhi Institute of Medical Science, Patna, Bihar", state: "Bihar" },
  //   { x: "210.761", y: "865.59", tmcName: "Shri Vinoba Bhave Civil Hospital(IT Cell/108 building), Silvassa, Dadra And Nagar Haveli And Daman And Diu", state: "Dadra And Nagar Haveli And Daman And Diu" },
  //   { x: "430.553", y: "410.137", tmcName: "IHBAS, Delhi, Delhi", state: "Delhi" },
  //   { x: "305.878", y: "107.51", tmcName: "IMHANS, Kashmir, Srinagar, Jammu and Kashmir", state: "Jammu and Kashmir" },
  //   { x: "1265.712", y: "1300.239", tmcName: "A & N Islands institute of Medical Sciences (ANIIMS), Port Blair, Andaman & Nicobar Islands", state: "Andaman & Nicobar Islands" },
  //   { x: "1160.545", y: "535.843", tmcName: "State Head Quarters, NHM, Guwahati, Assam", state: "Assam" },
  //   { x: "1230.545", y: "455.843", tmcName: "Mental Hospital, Midpu, Arunachal Pradesh", state: "Arunachal Pradesh" },
  //   { x: "378.256", y: "1500.806", tmcName: "State Mental Health Programme office, Mental Health Center Campus, Peroorkada, Thiruvananthapuram, Kerala", state: "Kerala" },
  //   { x: "190.761", y:"705.59", tmcName: "Hospital for Mental Health, Ahmedabad, Gujarat", state: "Gujarat" },
  //   { x: "400.553", y:"360.137", tmcName: "Civil Hospital, Sec-6, Panchkula, Haryana", state: "Haryana" },
  //   { x: "420.553", y:"310.137", tmcName: "Govt Medical College & Hospital (GMCH) Sector 32 in liason with GMCH Sector 16, Chandigarh, Chandigarh", state: "Chandigarh" }
  // ];


  constructor(private http: HttpClient, private gs: GeneralService, private location: Location, private router: Router) { }
  public isMapLoaded = false;
  allTMCData: any;

  ngOnInit() {
    this.orgType = sessionStorage.getItem('orgType');

    // this.mapService.getParameterListener().subscribe((newParameter) => {
    //   this.mapName = newParameter.mapName;
    //   this.mapDirPath = newParameter.mapDirPath;
    //   this.fileExt = newParameter.fileExt;
    //   this.xColumn = newParameter.xColumn;
    //   this.dataType = newParameter.dataType;
    //   this.keys = newParameter.keys;
    //   this.getMap(this.keys);
    // });

    // this.mapService.getDataListener().subscribe((newData) => {
    //   this.mapdata = newData.data;
    //   this.state = undefined;
    //   this.currkeys = newData.currkeys;
    //   let keys = [...this.currkeys];
    //   if (this.isMapLoaded) {
    //     this.createMap(keys);
    //   }
    // });
    this.allTMCData = [];
    if (JSON.parse(sessionStorage.getItem('tmcArray')) === null) {
      this.getAllTMCs('0', 'TMC');
    } else {
      this.allTMCData = JSON.parse(sessionStorage.getItem('tmcArray'))
    }
  }

  getAllTMCs(stateId, type) {
    this.allTMCData = [];
    // this.tempArray = [];
    this.gs.getAllTMCs(stateId, type).subscribe(response => {
      this.allTMCData = response;
      sessionStorage.setItem('tmcArray', JSON.stringify(this.allTMCData));
      // this.tempArray = response;
      // for (var k = 0; k < this.tempArray.length; k++) {
      //   this.tempArray[k].tmcName1 = this.tempArray[k].tmcName;
      // }
      // this.allTMCData.sort((a, b) => (a.state < b.state ? -1 : 1));
      // this.dataSource.data = this.allTMCData;
      // this.dataSource.paginator = this.paginator;
    });
  }

  // onClick(value) {
  //   var state = value.split(" ").join("");
  //   this.router.navigate(["state", state]);
  // }

  // over_state(value) {
  //   this.tooltip = value;
  // }
  over_city_state(value){
    // console.log("tmcvalue1", value)
    this.tooltip = value;
  }
  over_tmcName(value) {
    // console.log("tmcvalue", value)
    this.tmcName =value;
  }

  out_state(value) {
    this.tooltip = "";
    this.tmcName ="";
  }

  goToDashboard() {
    this.location.back();
  }
  getMap(keys) {
    this.http.get(this.mapDirPath + this.mapName + this.fileExt).subscribe(responseData => {
      this.mapName = this.mapName.replace(' ', '_');
      this.jsondata = responseData;
      this.isMapLoaded = true;
      // set the colors
      this.z = d3.scaleOrdinal([...d3.schemeSet2, ...d3.schemePaired, ...d3.schemeTableau10]);
      this.z = d3.scaleOrdinal();
      this.z.domain(this.keys);
      // this.createMap();
    });
  }

  createMap(keys) {
    let formattedDataTempCopy = null;
    this.formattedData = {};
    let maxVal = 0;

    if (this.mapdata != null) {
      const groupWiseData = _.groupBy(this.mapdata, this.xColumn);
      this.formattedData = this.mapdata.reduce((acc, cur) => ({ ...acc, [cur[this.xColumn]]: groupWiseData[cur[this.xColumn]][0] }), {});
      formattedDataTempCopy = this.formattedData;
    }
    const element = this.chartContainer.nativeElement;
    d3.select('#' + this.xColumn + this.dataType).remove();
    this.width = element.offsetWidth;  //- this.margin.left - this.margin.right;   // 800

    //this.height = element.offsetHeight - this.margin.top - this.margin.bottom; // 400
    this.height = element.offsetHeight; //- this.margin.top - this.margin.bottom;
    if (this.width < 0) {
      this.width = this.width * -1;
    }
    if (this.height < 0) {
      this.height = this.height * -1;
    }
    // this.height = 700;
    // this.width = 500;
    this.svg = d3.select(element)
      .append('svg')
      .attr('id', this.xColumn + this.dataType)
      .attr('width', this.width)// 500)
      .attr('height', this.height)// element.offsetHeight)
      // .attr("transform", "scale(1.4)")

      // .attr('viewBox',"0 0 480 450")
      // .attr('preserveAspectRatio', 'xMinYMax meet')
      .append('g');
    // .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const state = topojson.feature(this.jsondata, this.jsondata.objects[this.mapName]);
    const projection = d3.geoMercator();
    projection.fitExtent(
      [
        [10, 5],
        // [element.offsetWidth, element.offsetHeight],   // [500,450]
        //begin original code
        [this.width, this.height],   // [500,450]
        //end
        //begin  content code
        [500, 450]
        //end
      ],
      state
    );


    const path = d3.geoPath(projection);
    /* tooptip */
    const tip = d3Tip();
    tip.attr('class', 'd3-tip')
      // .style('z-index', '99999999999')
      //begin below 2 lines for static content 
      //  .style('background-color', '#40914C')
      //  .style('background-color', '#295583')
      //  .style('float','right')
      // .style('border-radius','50%')
      //end
      .offset([-10, 0])
      .html(d => {
        const data = formattedDataTempCopy[d.properties.ST_NM];

        // const a = (this.normalize) ? '%' : '';

        //begin original tooltip content
        this.orgType = sessionStorage.getItem('orgType');

        // let ret = '<div style=\'text-align: center;font-size: 13px;float: right\'>' + data[this.xColumn] + '<br>';
        this.state = data[this.xColumn];
        const keys = [...this.currkeys];

        for (const key of keys.reverse()) {
          // <tbody>';
          this.tmc = data[key].toLocaleString();
          // ret += '<tr style=\'color:' + this.z(key) + ';\'><td>' + key + ' </td><td style=\'text-align:right; padding-left:15px;\'> ' + data[key].toLocaleString() + a + '</td></tr>';
          // ret += ' </td><td style=\'text-align:right; padding-left:5px;word-wrap: break-word;\'> ' + data[key].toLocaleString() + '</td></tr>';
        }
        // ret += '<tr  style=\'font-size: 19px;\'><td>Total</td><td style=\'text-align:right; padding-left:15px;\'> ' + data.Total.toLocaleString() + a + '</td></tr>';

        // ret += '</tbody></table>';

        return '';
      });

    this.svg.call(tip);

    this.svg.selectAll('.country')
      .data(state.features)
      .enter()
      .append('path')
      // .attr('class', 'country')
      .attr('d', path)
      //.attr('cursor', 'cell')   //crosshair, pointer url('image-path.png')   
      .attr('fill', (d) => {
        //
        if (formattedDataTempCopy[d.properties.ST_NM] != null) {
          const n = formattedDataTempCopy[d.properties.ST_NM].Total || 0;
          //const color = '#52ae56'   //'#ffffff' 
          const color = '#8592CB'
          return color;

        } else {
          return 'white';
        }
      })

      .attr('stroke', '#660000')
      .attr('stroke-width', '0.5')
      .on('mouseover', function (d) {

        if (formattedDataTempCopy[d.properties.ST_NM] != null) {
          this.orgType = sessionStorage.getItem('orgType');
          const data = formattedDataTempCopy[d.properties.ST_NM];
          this.state = d.properties.ST_NM;
          d3.select(this).transition()
            //   // .duration('50')
            .attr('stroke-width', '3');
          // // .attr('fill', "grey")
          tip.show(d, this);
          // const keys = [...this.currkeys];
          for (const key of keys.reverse()) {
            this.tmc = data[key].toLocaleString();
          }
          fu(d.properties.ST_NM);


        }
      })
      .on('mouseout', function (d) {
        this.state = null;
        if (formattedDataTempCopy[d.properties.ST_NM] != null) {
          d3.select(this).transition()
            .duration('50')
            .attr('stroke', '#660000')
            .attr('stroke-width', '0.5');
          // tip.hide(d, this);
        } else {
          d3.select(this).transition()
            .duration('50')
            .attr('fill', 'white');
        }
        //
      })
      .on('click', (d) => {
        d3.select(this).transition()
        //   // .duration('50')
        // .attr('stroke-width', '3');
        const data = formattedDataTempCopy[d.properties.ST_NM];
        this.orgType = sessionStorage.getItem('orgType');

        const keys = [...this.currkeys];
        for (const key of keys.reverse()) {
          this.tmc = data[key].toLocaleString();
        }

        // alert(d.properties);
        // this.mapService.onDistrictClicked.emit(d.properties.district);
        this.state = d.properties.ST_NM;
        this.mapService.onDoubleClick.emit(d.properties.ST_NM);
        // location.href = "#TalukaPanel";
      });

    const fu = (d) => {
      //
      this.regionHovered(d);

    };

    this.svg.append('g')
      .selectAll('labels')
      .data(state.features)
      .enter()
      .append('text')
      .attr('x', function (d) {
        let xpath;
        if (path.centroid(d)[0]) {
          xpath = path.centroid(d)[0];
        }
        return xpath
      })
      .attr('y', function (d) {
        let ypath;
        if (path.centroid(d)[1]) {
          ypath = path.centroid(d)[1];
        }
        return ypath
      })

      // removed state names
      // .attr('dy', '.35em')
      // .text((d) => d.properties.ST_NM)
      // .attr('text-anchor', 'middle')
      // .attr('alignment-baseline', 'central')
      // .style('font-size', '3.5px')
      // .style('font-family', 'Arial, Helvetica, sans-serif')
      // .style('font-weight', 'bold')
      .style('fill', 'rgba(30, 0, 0, 0.9)')
      .attr('cursor', 'pointer')
      .on('mouseover', function (d) {
        if (formattedDataTempCopy[d.properties.ST_NM] != null) {
          tip.show(d, this);
        }
      })
      .on('mouseout', function (d) { if (formattedDataTempCopy[d.properties.ST_NM] != null) { tip.hide(d, this); } })
      .on('click', (d) => { this.mapService.onDoubleClick.emit(d.properties.ST_NM); });

  }

  regionHovered(data) {
    let total_cases = this.formattedData[data].Total;
    const emitData = {
      data
      // total_cases: total_cases.toLocaleString()
      // yColumnName : this.chartParameters.yColumnName,
      // parameterNumber : this.parameterNumber,
      // year: this.year
    };
    this.mapService.onRegionHover.emit(emitData);

  }
}
