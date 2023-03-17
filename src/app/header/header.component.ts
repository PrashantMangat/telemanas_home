import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from 'ng-connection-service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { VersionCheckService } from '../version-check.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  baseUrl = environment.cors;
  navbar: any;
  sticky: any;
  // window: any;
  text: any;
  count: any;
  versionUrl = environment.versionUrl;
  title = 'patient-portal';
  status = 'ONLINE';
  fontSize = 'mm';
  isConnected = true;
  pgNotAvail: boolean;

  userName: any;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private versionCheck: VersionCheckService, private connectionService: ConnectionService, private snackBar: MatSnackBar,
    private translate: TranslateService, private router: Router,) {
    this.getdate();
     
    // language options
    const pgNotAvail = false;
    translate.addLangs(['en', 'hn', 'ka']);
    translate.setDefaultLang('en');
    versionCheck.initVersionCheck(this.versionUrl);
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

  useLanguage(language: string) {
    this.translate.use(language);
  }

  home(home: string) {
    this.translate.use(home);
  }

  getdate() {
    this.text = document.lastModified;
  }
  getstickynav(){
    if (window.pageYOffset >= this.sticky) {
      this.navbar.classList.add("sticky")
    } else {
      this.navbar.classList.remove("sticky");
    }
  }
  ngOnInit() {
    this.navbar = document.getElementById("navbar");
    this.sticky = this.navbar.offsetTop;
  }
}


