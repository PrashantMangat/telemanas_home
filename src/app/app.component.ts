import { Component } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar } from '@angular/material';
import { VersionCheckService } from './version-check.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: any;
  count: any;
  baseUrl = environment.cors;
  versionUrl = environment.versionUrl;
  title = 'patient-portal';
  status = 'ONLINE';
  fontSize = 'mm';
  isConnected = true;
  pgNotAvail: boolean;

  selected = 'en';

  constructor(private versionCheck: VersionCheckService, private connectionService: ConnectionService, private snackBar: MatSnackBar,
    private translate: TranslateService, private router: Router,private generalService: GeneralService) {
    this.getdate();
    this. getNews();
    const pgNotAvail = false;
    translate.addLangs(['en', 'hn', 'ka']);
    translate.setDefaultLang('en');
    // versionCheck.initVersionCheck(this.versionUrl);
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

//   onActivate(event) {
//     window.scroll({ 
//             top: 0, 
//             left: 0, 
//             behavior: 'smooth' 
//      });
//  }

ngAfterViewInit(){
   
  if(localStorage.getItem('language') != null){
    this.selected = localStorage.getItem('language');
    this.translate.use(localStorage.getItem('language'));

  }else{
    this.translate.use(this.selected);
  }
  
}

onActivate(event) {
  let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 16);
}

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  toggle(size) {
    this.fontSize = size;
  }
  
  route() {
    sessionStorage.setItem('validRoute', 'true');
  }

  routeScreen() {
    window.open(environment.cors + '#/help');
  }

  useLanguage(event: string) {
    this.translate.use(event);
    localStorage.setItem('language',event);
  }

  home(home: string) {
    this.translate.use(home);
  }

  onClick(v){
    sessionStorage.setItem('about',v);
  }
  
  getdate() {
    this.text = document.lastModified;
  }

  getNews() {
    this.generalService.getPageViews().subscribe(response => {
     
    });
  }

}
