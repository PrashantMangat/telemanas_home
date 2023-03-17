import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar } from '@angular/material';
//import { VersionCheckService } from './version-check.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseUrl = environment.cors;
  //versionUrl = environment.versionUrl;
  title = 'patient-portal';
  status = 'ONLINE';
  fontSize = 'mm';
  isConnected = true;
  pgNotAvail: boolean;
  selected = 'en';

  constructor( private connectionService: ConnectionService, private snackBar: MatSnackBar,
              private translate: TranslateService,private router: Router,) {
   const pgNotAvail = false;
    translate.addLangs(['en', 'hn', 'ka']);
    translate.setDefaultLang('en');
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
        this.snackBar.open('You are Online Now', 'x', {
          duration: 5000,
          panelClass: ['green-snackbar']
       });
      } else {
        this.snackBar.open('You are OFFLINE, Please Check your internet connection', 'x', {
          duration: 15000,
          panelClass: ['warning']
       });
        this.status = 'OFFLINE';
        alert('You are Offline, Please check your internet connection');
      }
    });

  }
  ngOnInit() {
  }
  ngAfterViewInit(){
    
    if(localStorage.getItem('language') != null){
      this.selected = localStorage.getItem('language');
      this.translate.use(localStorage.getItem('language'));

    }else{
      this.translate.use(this.selected);
    }
    
  }
  toggle(size) {
   
    this.fontSize = size;
  }
  phome() {
    this.router.navigate(['home']);
  }
  ehome() {
      this.pgNotAvail = false;
      window.open(environment.cors);
    }
  


  route() {
    sessionStorage.setItem('validRoute', 'true');
  }
  
  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language',language);
  }
  home(home: string) {
    this.translate.use(home);
  }
  mblhome(mblhome: string) {
    this.translate.use(mblhome);
  }
  routeScreen(){
    window.open(environment.cors + '#/help');
  }
}

