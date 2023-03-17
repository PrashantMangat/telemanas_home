import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AppService } from './app.service';
import { DataService } from './data.service';
import { GeneralService } from '../general.service';
import { NgxSpinnerService } from 'ngx-spinner';
// Enum - Granularity option
export enum Granualirity {
  ANNUAL = 0,
  MONTHWISE = 1,
  QUATERWISE = 2
}

// Enum - Normalize option
export enum Normalise {
  NO = 0,
  YES = 1
}

// Enum - Sorting option for chart
export enum SortOption {
  RANKWISE = 0,
  ALPHABETICALLY = 1
}

// export const START_YEAR = 2018;
@Injectable()
export abstract class TotalService {

  constructor(protected http: HttpClient, private appService: AppService,
     private ds:DataService, private gs:GeneralService,private spinn: NgxSpinnerService) {
    this.initialize();
    this.port = 3000;
    this.onLegendClick.subscribe((d) => {
      this.columnMap.set(d, !this.columnMap.get(d));
      this.updateData();
    });

  }

  public onDoubleClick = new EventEmitter<any>();
  public onLegendClick = new EventEmitter<any>();
  public onRegionHover = new EventEmitter<any>();

  private keys: string[];
  private currkeys: string[];
  private columnMap = new Map<string, boolean>();
  private granularity: number;
  private sortOption: number;
  private normalize: number;
  private year: number;
  private dataURL: {
    annual: string,
    monthly: string,
    quarterly: string
  };
  private data: {
    annualData: any
    // monthlyData: any,
    // quarterlyData: any
  };
  private currData: any;
  private newData = new Subject<any>();
  private parameter = new Subject<any>();
  private sortKey: string;
  private xLabel: string;
  private yLabel: string;
  private xColumn: string;
  private dataType: string;
  private mapName: string;
  private mapDirPath: string;
  private fileExt: string;
  private normalizeDisabled: boolean;
  private port: number;
  abstract name(): string;
  // abstract getSortOptions(): string[];

  initialize() {
    this.granularity = Granualirity.ANNUAL;
    this.normalize = Normalise.NO;
    this.sortOption = SortOption.RANKWISE;
    this.sortKey = 'Total';
    this.year = 2017_2018;
    this.normalizeDisabled = false;
  }

  // getDataFromServern() {
  //   this.gs.getMapData().subscribe(data => {
  //     setTimeout(() => {
  //       // let res = JSON.parse(sessionStorage.getItem('calls'));
  //       this.data = {
  //         annualData: data,
  //       };
  //       this.updateData();
  //     }, 600);
  //   });
  //     // this.ds.getStatesDataY().subscribe(data => {
  //     //   setTimeout(() => {
  //     //     // let res = JSON.parse(sessionStorage.getItem('calls'));
  //     //     this.data = {
  //     //       annualData: data,
  //     //     };
  //     //     this.updateData();
  //     //   }, 600);
  //     // });
    
  // }


  getDataFromServer(d) {
      // this.ds.getTMC(d).subscribe(data => {
        this.ds.getTMC(d).subscribe(data => {
        setTimeout(() => {
          // let res = JSON.parse(sessionStorage.getItem('calls'));
          let arr :any;
          arr = data;
          const result = arr.reduce((accum, cv) => {
            const index = accum.findIndex(item => item.stateName === cv.stateName);
            if (index === -1) {
              accum.push(cv);
            } else {
              accum[index].name += ", " + cv.name;
            }
            return accum;
          }, [])
          
          this.data = {
            annualData: result,
          };
          this.updateData();
        }, 600);
        
      });
      this.spinn.hide();
   
    
  }

  updateDataAsPerGranularity() {
    this.currData = this.data.annualData;
    this.currData = JSON.parse(JSON.stringify(this.currData));
  }

  

  sortData() {
    const key = this.sortKey;
    this.currData.sort(function(a, b) {
      return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    });
  }

  calculateTotal() {
    this.currkeys = [];
    // for (const [colName, colbool] of this.columnMap) {
    //   if (colbool) {
    //     this.currkeys.push(colName);
    //   }
    // }key: string
    this.columnMap.forEach((value: boolean, key: string) => {
      if (value) {
            this.currkeys.push(key);
          }
  });
    for (const d of this.currData) {
      let tempTotal = 0;
      for (const colName of this.currkeys) {
        tempTotal += d[colName];
      }
      // d.Total = Number(tempTotal.toFixed(2));
      d.Total = Number(tempTotal);

    }
  }

  updateData() {
    this.updateDataAsPerGranularity();
    // this.normalizeData();
    this.calculateTotal();
    // this.sortData();
    const newData = {
      // normalise: (this.normalize == Normalise.YES) ? true : false,
      currkeys: this.currkeys,
      data: this.currData
    };
    this.newData.next(newData);
  }

  updateParameter() {
    const parameter = {
      xLabel: this.xLabel,
      yLabel: this.yLabel,
      xColumn: this.xColumn,
      dataType: this.dataType,
      keys: this.keys,
      mapName: this.mapName,
      mapDirPath: this.mapDirPath,
      fileExt: this.fileExt,
    };
    this.parameter.next(parameter);
  }


  setNormalise(normalise: number) {
    this.normalize = normalise;
    this.updateData();
  }



  setMapParameter(mapDirPath: string, mapName: string, fileExt: string) {
    this.mapDirPath = mapDirPath;
    this.mapName = mapName;
    this.fileExt = fileExt;
  }

  setKeys(keys: string[]) {
    this.keys = keys;
    this.columnMap = new Map<string, boolean>();
    for (const key of this.keys.reverse()) {
      this.columnMap.set(key, true);
    }
    this.keys.reverse();
  }

  setxColumn(xColumn: string) {
    this.xColumn = xColumn;
  }

  setDataType(dataType: string) {
    this.dataType = dataType;
  }

  setLabels(xLabel: string, yLabel: string) {
    this.xLabel = xLabel;
    this.yLabel = yLabel;
  }

  setNormalizeDisabled(bool: boolean) {
    this.normalizeDisabled = bool;
  }

  getDataListener() {
    return this.newData.asObservable();
  }

  getParameterListener() {
    return this.parameter.asObservable();
  }

  getGranularity() {
    return this.granularity;
  }

  getNormalize() {
    return this.normalize;
  }

  getSortOption() {
    return this.sortOption;
  }

  getYear() {
    return this.year;
  }

  getPort() {
    return this.port;
  }

  getxColumn() {
    return this.xColumn;
  }

  getDataType() {
    return this.dataType;
  }
  getMapName() {
    return this.mapName;
  }

}
