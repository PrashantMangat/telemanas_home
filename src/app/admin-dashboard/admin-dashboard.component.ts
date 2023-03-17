import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GeneralService } from '../general.service';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType,} from 'chart.js';
import { DataService } from '../services/data.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  
//linechart
// public lineChartData: ChartDataSets[] = [];

//  public lineChartData: ChartDataSets[] = [
//   { data: [200, 300, 150, 400, 100, 300, 400], label: 'Total Consultation', fill: false, lineTension:0 },
//   { data: [150, 200, 100, 50, 244, 200, 300], label: 'Male', fill: false, lineTension: 0 },
//   { data: [50, 100, 50, 100, 156, 100, 100], label: 'Female' , fill: false, lineTension: 0},
//   { data: [25, 30, 50, 68, 80, 98, 35], label: 'Minor', fill: false, lineTension: 0 }
// ];
public lineChartData: ChartDataSets[] = [
    { data: [200, 300, 150, 400, 100, 300, 400,350,450,500], label: 'Total Calls', fill: false, lineTension:0 }]
showLChart = true;

dt = new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy');
dt6 = new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy');

 //this.yesterday.setDate(this.today.getDate() - 1)
public lineChartLabels: Label[] =  ['07-08-2022','08-08-2022','09-08-2022','10-08-2022','11-08-2022','12-08-2022','13-08-2022','14-08-2022','15-08-2022',this.dt];

public ratingChartLabels: Label[] = ['Karnataka','Goa','Maharashtra','Kerala','Andra','Punjab','Jharkhand'];


public lineChartColors: Color[] =
[
 {
    borderColor: '#813D7E',
    backgroundColor: 'rgba(129,61,126,0.15)',
    borderWidth: 2,
    pointBackgroundColor: '#fff'
  },
  {
    borderColor: '#0033FF',
 backgroundColor: 'rgba(0,51,255,0.15)',
    borderWidth: 2,
    pointBackgroundColor: '#fff',
  },
  {
    borderColor: '#FFCC00',
    backgroundColor: 'rgba(255,204,0,0.15)',
    borderWidth: 2,
    pointBackgroundColor: '#fff',
  },
  {
    borderColor: '#00CC00',
   backgroundColor: 'rgba(129,204,0,0.15)',
    borderWidth: 2,
    pointBackgroundColor: '#fff',
  },
];
public lineChartOptions: any = {
  scales: {
    yAxes: [{
        ticks: {
            beginAtZero: true,
            stepSize: 2
        }
    }]
},
  legend: {
   
    position: 'bottom',
    
    display: false,
    labels: {
      padding: 20,
      boxWidth: 20,
    },
  },
};

public lineChartType = 'line';
  public lineChartPlugins = [];

  //barchart

  // public barChartOptions: ChartOptions = {
  //   responsive: true, 
  //   scales: {
  //     yAxes: [{
  //         ticks: {
  //             beginAtZero: true,
  //             stepSize: 5
  //         }
  //     }]
  // },legend: {
  //     position: 'bottom',
  //     labels: {
  //       padding: 20,
  //       boxWidth: 20,
  //     },
  //   },
  // };
 // public barChartLabels: Label[] = ['<12', '13-18', '19-24', '25-49', '50-59', '60+'];
 public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
chartTitle: any;
// public barChartData: ChartDataSets[] = [];
    //  { data: [0,0,0,0,0,0], label: 'Male', stack: 'a'},
     // { data: [0,0,0,0,0,0], label: 'Female', stack: 'a'},
    //  { data: [0,0,0,0,0,0], label: 'Other', stack: 'a'}
//];
   
public barChartColor: Color[] =  
[
 {
    backgroundColor: '#ffffff',
    borderWidth: 2,
  pointBackgroundColor: '#ffffff'
  },
  {
    backgroundColor: '#82c4c3',
    borderWidth: 2,
   pointBackgroundColor: '#fff',
  },
  {
    backgroundColor: '#f9d89c',
    borderWidth: 2,
   pointBackgroundColor: '#fff',
  },
];
   

  // Doughnut
  public AgeLabels: string[] = [ 'Child%', 'Adult%'];
  public AgeData: number[] = [200,1700] ;
  public VisitLabels: string[] = [ 'New%', 'Followup%'];
  public VisitData: number[] = [1800,1700] ;
  public VisitTypeLabels: string[] = [ 'Tele%', 'In-person%'];
  public VisitTypeData: number[] = [2400,600] ;
  public GenderLabels: string[] = [ 'Male%', 'Female%', 'Other%'];
  public GenderData: number[] = [ 300, 400, 20];  
  public FecilityLabels: string[] = ['Tier 1%','MHPs%','Tier 3%','Health Workers%'];
  public FecilityData: number[] =[1700,400,30,600];
  public PsychiatricLabels: string[] = [ 'Yes%', 'No%'];
  public PsychiatricData: number[] = [700,1500] ;
  public testPositiveLabels: string[] = [ 'Counselled', 'Treated'];
  public testPositiveData: number[] = [1,1] ;
  public MigrantsLabels: string[] = [ 'Counselled', 'Treated'];
  public MigrantsData: number[] = [1,1] ;
  public HomeIsolateLabels: string[] = [ 'Counselled', 'Treated'];
  public HomeIsolateData: number[] = [1,1] ;
  public ChartType = 'doughnut';
  public DoughnutColor: any = [
    {
        backgroundColor: [
          '#bc658d',
          '#82c4c3',
          '#f9d89c',
          '#7f78d2',
          '#d4ebd0',
          'rgba(255,0,0,0.2)'
  
        ]
    }
  ];

public DoughnutChartOptions: any = {
  legend: {
    position: 'bottom',
    display: false,
    labels: {
      padding: 20,
      boxWidth: 20,
    },
  },
};


  fromDate: any;
  toDate: any;
  countArray: any;
  followupPercentage;
  today: any;

  totalPsychiNo: number;
  totalFollowup: number;
  totalNew: number;
  totalTele: number;
  totalInperson: number;
  totalpsycyes: number;
  totalIso: number;
  totalMigrant: number;
  totalQuarant: number;
  totalOther: number;
  psychiNo: number;
  totalMale: number;
  totalFemale: number;
  totalChild: number;
  totalAdult: number;
  totalGenOther : number;
  showBarChart = false;
  totalHealthWorkers: number;
  totalDoctors: number;

 // events
 public chartClicked(e: any): void {
 }

 public chartHovered(e: any): void {
 }

 public barChartOptions: any = {
  scaleShowVerticalLines: false,
  responsive: true,
  scales: {
          xAxes: [{
              stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
      }
};




public barChartData: any[] = [
  { data: [150, 200, 100, 50, 244, 200, 300],  label: 'Male' },
  { data: [50, 100, 50, 100, 156, 100, 100],label: 'Female' },


];
public ratingChartData: any[] = [
  { data: [5, 6, 7, 8,2, 4, 5],backgroundColor: '#FF7722', label: 'T1C' },
  { data: [6, 7, 8, 5, 6, 7, 9], label: 'T1P' },

];

public barChartColors:any;


  constructor(private router: Router, private gs: GeneralService, private ds: DataService,
    private translate: TranslateService) {
      translate.addLangs(['en', 'hn', 'ka']);
    translate.setDefaultLang('en');
     }
     baseUrl = environment.cors;
     fontSize = 'mm';
     step = 1;
  ngOnInit() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this.today = new Date();
    this.chartTitle = 'Hourly Calls Trend'
    // this.getDashboardCount();
    // this.getAgeCount();
    // this.get7DaysCount();
    this.ds.getGender().subscribe(data => {
      this.barChartLabels = Object.keys(data);
      this.barChartLabels.forEach(label => {
        this.barChartData[0].data.push(data["Male"]);
        this.barChartData[1].data.push(data['Female']);
      });
    });
    
  }

  

  report() {
    this.router.navigate(['report']);
  }
  users() {
    this.router.navigate(['manageUsers']);
  }

  opcs() {
    this.router.navigate(['manageUsers']);
  }

  Hourly() {
    this.chartTitle = 'Hourly Calls Trend';
    this.lineChartLabels = ['10','11','12','01','02','03','04','05','06','07'];
    this.lineChartData = [
      { data: [20, 30, 15, 40, 10, 70, 85,45,90,120], label: 'Total Calls', fill: false, lineTension:1 }]
  
  }
  Daily() {
    this.chartTitle = 'Daily Calls Trend'
    this.lineChartLabels = ['07-08-2022','08-08-2022','09-08-2022','10-08-2022','11-08-2022','12-08-2022','13-08-2022','14-08-2022','15-08-2022',this.dt];
    this.lineChartData = [
      { data: [200, 300, 150, 400, 100, 300, 400,456,500,550], label: 'Total Calls', fill: false, lineTension:0 }]
  
  }

  Weekly() {
    this.chartTitle = 'Weekly Calls Trend'
    this.lineChartLabels = ['21-06-2022','28-06-2022','05-07-2022','12-07-2022','19-07-2022','26-07-2022','18-07-2022','02-08-2022','09-08-2022',this.dt];
    this.lineChartData = [
      { data: [2000, 3000, 1150, 1400, 2100, 3300, 4400,2456,3500,4550], label: 'Total Calls', fill: false, lineTension:0 }]
  
  }

  get7DaysCount() {
    // const reportObject = {
    //    fromDate:  new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy'),
    //    // fromDate:  '13-04-2020', 
    // };
    // this.gs.get7DaysCount(reportObject).subscribe(response => {
    //  const res = response;
     
    //  this.lineChartLabels =response.Dates;

    //  const chartdataConsult =  {data : [], label: 'Total Consultation', fill: false, lineTension: 0};
    //  const chartdataPositive = {data : [], label: 'Covid-19 Positive', fill: false, lineTension: 0};
    //  const chartdataMigrants = {data : [], label: 'Migrants', fill: false, lineTension: 0};
    //  const chartdataQuarnIso = {data : [], label: 'Quarantined/Isolated', fill: false, lineTension: 0};
    //  chartdataConsult.data = JSON.parse(response.TotalConsultations);
    //  chartdataPositive.data = JSON.parse(response.TotalTestPositive);
    //  chartdataMigrants.data =  JSON.parse(response.TotalMigrants);
    //  chartdataQuarnIso.data = JSON.parse(response.TotalQuarantinedIso);
    //   this.lineChartData.push(chartdataConsult);
    //   this.lineChartData.push(chartdataPositive);
    //   this.lineChartData.push(chartdataMigrants);
    //   this.lineChartData.push(chartdataQuarnIso);
    //   this.showLChart = true;
    // });
  }

  getAgeCount(){
    this.gs.getAgeCount().subscribe(response => {
      const count = response;
      this.barChartLabels = response.label;
      const chartdataMale = { data: [],  label: 'Male', stack: 'a'};
     const chartdataFemale = { data: [], label: 'Female', stack: 'a'};
      const chartdataOther = { data: [], label: 'Other', stack: 'a'};
      chartdataMale.data = (response.Male);
      chartdataFemale.data = (response.Female);
      chartdataOther.data = (response.Other);
       this.barChartData.push(chartdataMale);
       this.barChartData.push(chartdataFemale);
       this.barChartData.push(chartdataOther);
       this.showBarChart = true;
    });
  }

  getDashboardCount() {

   
    const reportObject = {
      fromDate:  new DatePipe('en-US').transform(this.fromDate, 'dd-MM-yyyy'),
      toDate: new DatePipe('en-US').transform(this.toDate, 'dd-MM-yyyy'),
    };

    
    this.gs.getAdminDashboardCount(reportObject).subscribe(response => {
      this.countArray = response;
      this.psychiNo = (Number(this.countArray.TotalConsultations) - Number(this.countArray.TotalPsychiatricProblem ));

     // this.GenderData = [this.countArray.TotalConsultationMale, this.countArray.TotalConsultationFemale, this.countArray.TotalConsultationOther];
     // this.FecilityData = [this.countArray.TotalFIsolation, this.countArray.TotalFMigrant, this.countArray.TotalFQuarantine, this.countArray.TotalFOthers];
    // this.AgeData = [this.countArray.TotalConsultationChild, this.countArray.TotalConsulationAdult];
     // this.VisitData = [this.countArray.TotalNew, this.countArray.TotalFollowUp];
      //this.VisitTypeData = [this.countArray.TotalTele, this.countArray.TotalInPerson];
      //this.PsychiatricData = [this.countArray.TotalPsychiatricProblem, this.psychiNo];

      
      this.totalMale =  Math.round( (Number(this.countArray.TotalConsultationMale ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalFemale = Math.round( (Number(this.countArray.TotalConsultationFemale ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalGenOther =  Math.round( (Number(this.countArray.TotalConsultationOther ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalChild =  Math.round( (Number(this.countArray.TotalConsultationChild ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalAdult = Math.round( (Number(this.countArray.TotalConsulationAdult ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalNew = Math.round((Number(this.countArray.TotalNew ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalFollowup = Math.round( (Number(this.countArray.TotalFollowUp ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalTele = Math.round((Number(this.countArray.TotalTele ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalInperson = Math.round( (Number(this.countArray.TotalInPerson ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalpsycyes = Math.round( (Number(this.countArray.TotalPsychiatricProblem ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalPsychiNo = Math.round( ((Number(this.countArray.TotalConsultations) - Number(this.countArray.TotalPsychiatricProblem )) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalIso = Math.round( (Number(this.countArray.TotalFIsolation ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalMigrant = Math.round((Number(this.countArray.TotalFMigrant ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalQuarant = Math.round((Number(this.countArray.TotalFQuarantine ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalOther = Math.round((Number(this.countArray.TotalFOthers ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalDoctors = Math.round((Number(this.countArray.TotalFDoctors ) / Number(this.countArray.TotalConsultations ) * 100));
      this.totalHealthWorkers = Math.round((Number(this.countArray.TotalFHealthWorkers ) / Number(this.countArray.TotalConsultations ) * 100));

      this.GenderData = [this.totalMale, this.totalFemale, this.totalGenOther];

      this.AgeData = [this.totalChild, this.totalAdult ];
      this.FecilityData = [this.totalIso,this.totalMigrant,this.totalQuarant,this.totalOther,this.totalDoctors,this.totalHealthWorkers];
      this.VisitData = [ this.totalNew,this.totalFollowup ];
      this.VisitTypeData = [this.totalTele,this.totalInperson];
      this.PsychiatricData = [ this.totalpsycyes,this.totalPsychiNo];
      this.testPositiveData = [this.countArray.TotalCounselledPositive, this.countArray.TotalTreatedPositive];
      this.MigrantsData = [this.countArray.TotalCounselledMigrants, this.countArray.TotalTreatedMigrants];
      this.HomeIsolateData = [this.countArray.TotalCounselledHQ, this.countArray.TotalTreatedHQ];

    });
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

toggle(size) {
    
  this.fontSize = size;
  if(size == "mm"){
  this.step = 1;
  }else if(size == "sm"){
    this.step = 2;
    }else{
      this.step = 3;
    }

}
useLanguage(language: string) {
     
  this.translate.use(language);
   
} 

route() {
  sessionStorage.setItem('validRoute', 'true');
}
}
