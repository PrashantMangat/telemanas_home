import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  Faq;

  constructor(private appservice: GeneralService) { }
  
  ngOnInit() {
    this.getKMHMSFaq();
  }

  getKMHMSFaq() {
      this.appservice.getFaq().subscribe(response => {
        this.Faq = response;
        this.Faq.sort((a, b) => (Number(a.id) > Number(b.id)) ? 1 : -1);
      });
  }
}
