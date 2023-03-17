import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  text: any;
  fontSize = 'mm';
  step = 1;
  baseUrl = environment.cors;
  constructor(private router: Router,private translate: TranslateService) {
    translate.addLangs(['en', 'hn', 'ka']);
    translate.setDefaultLang('en');
   }

  ngOnInit() {
  }

  login(){
    this.router.navigate(['adminDashboard']);
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
  getdate() {
    this.text = document.lastModified;
  }
}
