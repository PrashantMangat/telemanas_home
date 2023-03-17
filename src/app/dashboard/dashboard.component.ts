import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { DatePipe } from '@angular/common';
import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType,} from 'chart.js';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalDoctors: number;
  totalHealthWorkers: number;



  constructor(private router: Router, private gs: GeneralService, private authService: AuthService) { }

//linechart
public lineChartData: ChartDataSets[] = [];

//  public lineChartData: ChartDataSets[] = [
//   { data: [0, 0, 0, 0, 0, 0, 0], label: 'Total Consultation', fill: false, lineTension:0 },
//   { data: [0, 0, 0, 0, 0, 0, 0], label: 'Covid-19 Positive', fill: false, lineTension: 0 },
//   { data: [0, 0, 0, 0, 0, 0, 0], label: 'Migrants' , fill: false, lineTension: 0},
//   { data: [0, 0, 0, 0, 0, 0, 0], label: 'Quarantined/Isolated', fill: false, lineTension: 0 }
// ];
dt = new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy');
// this.yesterday.setDate(this.today.getDate() - 1)
public lineChartLabels: Label[] = [];
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
            stepSize: 1
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

  public barChartOptions: ChartOptions = {
    responsive: true, 
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
              stepSize: 5
          }
      }]
  },
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        boxWidth: 20,
      },
    },
  };
 // public barChartLabels: Label[] = ['<12', '13-18', '19-24', '25-49', '50-59', '60+'];
 public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

public barChartData: ChartDataSets[] = [];
    //  { data: [0,0,0,0,0,0], label: 'Male', stack: 'a'},
     // { data: [0,0,0,0,0,0], label: 'Female', stack: 'a'},
    //  { data: [0,0,0,0,0,0], label: 'Other', stack: 'a'}
//];
   
public barChartColor: Color[] =  
[
 {
    backgroundColor: '#bc658d',
    borderWidth: 2,
  pointBackgroundColor: '#fff'
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
  public AgeData: number[] = [1,1] ;
  public VisitLabels: string[] = [ 'New%', 'Followup%'];
  public VisitData: number[] = [1,1] ;
  public VisitTypeLabels: string[] = [ 'Tele%', 'In-person%'];
  public VisitTypeData: number[] = [1,1] ;
  public GenderLabels: string[] = [ 'Male%', 'Female%', 'Other%'];
  public GenderData: number[] = [ 1, 1, 1];
  public FecilityLabels: string[] = [ 'Isolation%', 'Migrants%', 'Quarantine%','Others%','Doctors%','Health Workers%'];
  public FecilityData: number[] =[1,1,1,1,1,1];
  public PsychiatricLabels: string[] = [ 'Yes%', 'No%'];
  public PsychiatricData: number[] = [1,1] ;
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

  today = new Date();
  fromDate: any;
  toDate: any;
  userID: any;
  dataSource1: any;
  RecordArray: any;
  role: string;
  searchText;
  showRecord = false;
  countArray: any;
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
  totalGenOther: number;

  showLChart = false;
  showBarChart = false;
 // events
 public chartClicked(e: any): void {
 }

 public chartHovered(e: any): void {
 }

  ngOnInit() {
    this.role = sessionStorage.getItem('role');
    this.fromDate = new Date();
    this.toDate = new Date();
    // this.getAllRecordsUrl();
    this.get7DaysCount();
    this.getAgeCount();
    this.getDashboardCount();
  }
  fillForm() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['covid_bmr']);
    } else {
      this.authService.logout();
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }

  view(rec) {
    sessionStorage.setItem('rec', JSON.stringify(rec));
    this.router.navigate(['view_details']);
  }

  getAllRecordsUrl() {
      this.gs.getUserRecords(sessionStorage.getItem('userID')).subscribe(response => {
        this.RecordArray = response;
        this.showRecord = true;
      });
    }

    get7DaysCount() {
      const reportObject = {
         fromDate:  new DatePipe('en-US').transform(new Date(), 'dd-MM-yyyy'),
        // fromDate:  '22-05-2020',
      };
      this.gs.get7DaysCount(reportObject).subscribe(response => {
       const res = response;
       this.lineChartLabels =response.Dates;
       const chartdataConsult =  {data : [], label: 'Total Consultation', fill: false, lineTension: 0};
       const chartdataPositive = {data : [], label: 'Covid-19 Positive', fill: false, lineTension: 0};
       const chartdataMigrants = {data : [], label: 'Migrants', fill: false, lineTension: 0};
       const chartdataQuarnIso = {data : [], label: 'Quarantined/Isolated', fill: false, lineTension: 0};
       chartdataConsult.data = JSON.parse(response.TotalConsultations);
       chartdataPositive.data = JSON.parse(response.TotalTestPositive);
       chartdataMigrants.data =  JSON.parse(response.TotalMigrants);
       chartdataQuarnIso.data = JSON.parse(response.TotalQuarantinedIso);
        this.lineChartData.push(chartdataConsult);
        this.lineChartData.push(chartdataPositive);
        this.lineChartData.push(chartdataMigrants);
        this.lineChartData.push(chartdataQuarnIso);
        this.showLChart = true;
      });
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
      const obj = {
        userID: (sessionStorage.getItem('userID')),
      };
      const reportObject = {
        fromDate:  new DatePipe('en-US').transform(this.fromDate, 'dd-MM-yyyy'),
        toDate: new DatePipe('en-US').transform(this.toDate, 'dd-MM-yyyy'),
      };
      this.gs.getDashboardCount(reportObject, obj).subscribe(response => {
        this.countArray = response;
        this.psychiNo = (Number(this.countArray.TotalConsultations) - Number(this.countArray.TotalPsychiatricProblem ));

      this.totalMale = Math.round( (Number(this.countArray.TotalConsultationMale ) / Number(this.countArray.TotalConsultations ) * 100));
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

}


