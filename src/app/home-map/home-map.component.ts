import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import * as _ from 'lodash';

import * as topojson from 'topojson';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent implements OnInit {

  @Input() private mapService1: any;

  private mapName: string;
  private mapdata: any;
  private normalize: boolean;
  private mapDirPath: string;
  private fileExt: string;

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
  private populationDisabled: boolean;
  @ViewChild('map') private chartContainer: ElementRef;

  constructor(private http: HttpClient, private location: Location) { }
  public isMapLoaded = false;
  ngOnInit() {
    this.mapService1.getParameterListener().subscribe((newParameter) => {
      this.mapName = newParameter.mapName;
      this.mapDirPath = newParameter.mapDirPath;
      this.fileExt = newParameter.fileExt;
      this.xColumn = newParameter.xColumn;
      this.dataType = newParameter.dataType;
      this.keys = newParameter.keys;
      this.getMap();
      // this.mapService.onDistrictChanged.emit(this.mapName);

    });

    this.mapService1.getDataListener().subscribe((newData) => {
      this.mapdata = newData.data;
      this.normalize = newData.normalise;
      this.currkeys = newData.currkeys;
      if (this.isMapLoaded) {
        this.createMap();
      }
    });

  }
  goToDashboard() {
    this.location.back();
  } 
  getMap() {
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

  createMap() {
    let formattedDataTempCopy = null;
    this.formattedData = {};
    let maxVal = 0;

    if (this.mapdata != null) {
      // for (let d of mapdata){
      // .append({District : d.District, DistrictId : d.DistrictId, Total: d.Total});
      // }
      const groupWiseData = _.groupBy(this.mapdata, this.xColumn);

      this.formattedData = this.mapdata.reduce((acc, cur) => ({ ...acc, [cur[this.xColumn]]: groupWiseData[cur[this.xColumn]][0] }), {});
      formattedDataTempCopy = this.formattedData;
      for (const v of this.mapdata) {
        if (v.Total > maxVal) {
          maxVal = v.Total;
        }
      }
    }
    const element = this.chartContainer.nativeElement;
    d3.select('#' + this.xColumn + this.dataType).remove();
    this.width = element.offsetWidth - this.margin.left - this.margin.right;   // 800
    
    //this.height = element.offsetHeight - this.margin.top - this.margin.bottom; // 400
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    if (this.width < 0) {
      this.width = this.width * -1;
    }
    if (this.height < 0) {
      this.height = this.height * -1;
    }

    this.svg = d3.select(element)
      .append('svg')
      .attr('id', this.xColumn + this.dataType)
      .attr('width', this.width)// 500)
      .attr('height', this.height)// element.offsetHeight)
      .attr("transform", "scale(1.5)")

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
        [500,450]
        //end
      ],
      state
    );


    const path = d3.geoPath(projection);
    let tempColor = '';
    /* tooptip */
    const tip = d3Tip();
    tip.attr('class', 'd3-tip')
      .style('z-index', '99999999999')
      //begin below 2 lines for static content
       .style('background-color', '#40914C')
       
       

      // .style('border-radius','50%')
      //end
      .offset([-10, 0])
      .html(d => {
        const data = formattedDataTempCopy[d.properties.ST_NM];
        const keys = [...this.currkeys];
        const a = (this.normalize) ? '%' : '';
        
        //begin original tooltip content
        // let ret = '<div style=\'text-align: center;font-size: 13px;\'>' + data[this.xColumn] + '<br>';
        // // if (!this.populationDisabled) {
        // //   ret += '<small> (Population  ' + data.Population.toLocaleString() + ')</small>';
        // // }
        // ret += '</div><br><table style=\'width:200px;font-size: 14px;\'><tbody>';
        // for (const key of keys.reverse()) {
        //   // ret += '<tr style=\'color:' + this.z(key) + ';\'><td>' + key + ' </td><td style=\'text-align:right; padding-left:15px;\'> ' + data[key].toLocaleString() + a + '</td></tr>';
        //   ret += '<tr style=\'color:' + ';\'><td>' + key + ' </td><td style=\'text-align:right; padding-left:15px;\'> ' + data[key].toLocaleString() + a + '</td></tr>';
        // }
        // // ret += '<tr  style=\'font-size: 19px;\'><td>Total</td><td style=\'text-align:right; padding-left:15px;\'> ' + data.Total.toLocaleString() + a + '</td></tr>';

        // ret += '</tbody></table>';
        //end 

        //begin static content
        let ret = '<div style=\'color:' + "white" + ';\'>'+"TMC ID"+'<br>'+"1200"+'</div>';
        //end 
        return ret;
      });

    this.svg.call(tip);

    const xColumn = this.xColumn;
    this.svg.selectAll('.country')
      .data(state.features)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path)
      .attr('cursor', 'pointer')
      .attr('fill', (d) => {
        //
if (formattedDataTempCopy[d.properties.ST_NM] != null) {
          const n = formattedDataTempCopy[d.properties.ST_NM].Total || 0;
          // const color = '#ffffff'
          const color =
            n === 0
              ? '#ffffff'
              : d3.interpolateRainbow(
                (0.8 * n) / (maxVal || 0.1)
              );

              // (0.8 * n) / (maxVal || 0.009)  //interpolateRainbow //Blues,Reds,Greens


          tempColor = color;
          return color;

        } else {
          return 'white';
        }
        //
        // return "#cccccc";
      })
      .attr('stroke', '#660000')
      .attr('stroke-width', '0.5')
      .on('mouseover', function(d) {

        // scope of "this" here is to svg element so we can not call "regionSelected" directly
        // when used function(d) scope of "this" is to current svg element
        // when used (d)=> { } scope of "this" is same as angular "this"

        if (formattedDataTempCopy[d.properties.ST_NM]) {
          // d3.select(this).transition()
          //   .duration('50')
          //   .attr('stroke-width', '3');
          // .attr('fill', "grey")
          tip.show(d, this);
          fu(d.properties.ST_NM);
        }
        // d3.select(this).style("fill","#cccccc");
        // // abc(d.properties.district);
        // this.regionSelected(d.properties.ST_NM);
      })
      .on('mouseout', function(d) {
        // d3.select(this).transition()
        //      .duration('50')
        //      .attr('stroke', '#333333')
        // d3.select(this).classed('selected',false)
        // this.regionSelected(null);

        if (formattedDataTempCopy[d.properties.ST_NM] != null) {
          // d3.select(this).transition()
          //   .duration('50')
          //   .attr('stroke', '#660000')
          //   .attr('stroke-width', '0.5');
          tip.hide(d, this);
        } else {
          // d3.select(this).transition()
          //   .duration('50')
          //   .attr('fill', 'white');
        }

        //
      })
      .on('dblclick', (d) => {


        // alert(d.properties);
        // this.mapService.onDistrictClicked.emit(d.properties.district);
        this.mapService1.onDoubleClick.emit(d.properties.ST_NM);
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
      .attr('x', function(d) { 
        let xpath;
        if (path.centroid(d)[0]) {
          xpath = path.centroid(d)[0];
        }
        return xpath 
      })
      .attr('y', function(d) { 
        let ypath;
        if (path.centroid(d)[1]) {
          ypath = path.centroid(d)[1];
        }
        return ypath
      })
      .attr('dy', '.35em')
      .text((d) => d.properties.ST_NM)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .style('font-size', '7.5px')
      .style('font-family', 'Arial, Helvetica, sans-serif')
      .style('font-weight', 'bold')
      .style('fill', 'rgba(30, 0, 0, 0.9)')
      .attr('cursor', 'pointer')
      .on('mouseover', function(d) { if (formattedDataTempCopy[d.properties.ST_NM] != null) {
        tip.show(d, this); } })
      .on('mouseout', function(d) { if (formattedDataTempCopy[d.properties.ST_NM] != null) { tip.hide(d, this); } })
      .on('dblclick', (d) => { this.mapService1.onDoubleClick.emit(d.properties.ST_NM); });

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
    this.mapService1.onRegionHover.emit(emitData);

  }
}
