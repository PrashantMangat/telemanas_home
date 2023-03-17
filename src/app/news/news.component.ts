import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsData;
  
  constructor(private generalService: GeneralService, private router: Router,) { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    this.generalService.getAllNewsRecord().subscribe(response => {
      let NewsList: Array<any> = [];
      let resnewsList = <any>response;
      for (let i = 0; i < resnewsList.length; i++) {
        let district = resnewsList[i];
        if (district.status === "Active") {
          NewsList.push(district);
          this.newsData = NewsList;
          NewsList.sort((a, b) => (Number(a.id) > Number(b.id)) ? -1 : 1);
        }
      }
    });
  }

  getNewsRecord(row) {
    sessionStorage.setItem('newsDetailsData', JSON.stringify(row));
    this.router.navigate(['News-details']);
  }

}
