import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JSEncrypt} from 'jsencrypt';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../general.service';
import * as GlobalVariables from '../global';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  baseUrl = environment.cors;
 
  color = 'blue';
  mode = 'indeterminate';
  value = 100;
  loading = false;
  showMsg = false;
  orgID: any;
  username: any;
  hide = true;
  password: any;
  hideLogin = true;
  error_disp: any;
  public positionSelectOPS = [];
  public positionSelectOP:  any;
  userOrgRole = [];
  showSelect = false;
  projectUrl: any;
  email: any;
  step1 = true;
  saltRes: any;
  captchaImage: any;
  captchaID: any;
  captcha: any;
  hash1: string;
  ophash1: string;
  version: any;
  lastLoggedOrg: any;
  lastLogedTime: any;
  lastLaggedOrgName: any;
  selected: any;
  opData1: any;
  statelogo_web = "";
  footerImage = "";
  opData: {
    'name': '',
    'uuid': '',
    'mheAppData': any
  };
  showError: boolean;
  constructor(private router: Router, @Inject(DOCUMENT) document, private route: ActivatedRoute,
    private homepageService: GeneralService, private snackBar: MatSnackBar, private authService: AuthService,
    private spinn: NgxSpinnerService) {
      // this.projectUrl = environment.projectUrl;
      this.opData = {
        'name': '',
        'uuid': '',
        'mheAppData': {}
      };
    }
     openNav() {
      document.getElementById('mySidenav').style.width = '190px';
    }

     closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    }
  ngOnInit() {
    // localStorage.clear();
    // sessionStorage.clear();
    sessionStorage.setItem('isUpdate', 'true');
    this.version = environment.version;

  }

  policy() {
    sessionStorage.setItem('external', 'true');
    this.router.navigate(['policy']);
  }

next(){
  this.router.navigate(['adminDashboard']);
}

  login() {

    if (this.username && this.password) {
      this.showError = false;
      this.router.navigate(['adminDashboard']);
      // const encrypt = new JSEncrypt();
      // encrypt.setPublicKey(GlobalVariables.rsapublicKey);
      // const encrypted = encrypt.encrypt(this.password);
      // const loginObject = {
      //   username: this.username,
      //   password: encrypted
      // };
      // this.spinn.show();
      // this.authService.login(loginObject).subscribe(response => {
      //   const JWtoken = response.json().token;
      //   sessionStorage.setItem('token', JWtoken);
      //   const helper = new JwtHelperService();
      //   const decodedToken = helper.decodeToken(JWtoken);
      //   const role = decodedToken.role;
      //   sessionStorage.setItem('userName', decodedToken.username);
      //   sessionStorage.setItem('isLoggedIn', 'true');
      //   sessionStorage.setItem('userID', decodedToken.userId);
      //   sessionStorage.setItem('role', role);
      //   sessionStorage.setItem('sessionId', decodedToken.sessionId);
      //   sessionStorage.setItem('sessionToken', decodedToken.sessionToken);
      //   sessionStorage.setItem('name', decodedToken.firstName);
      //     if (role === 'Admin') {
      //       this.router.navigate(['adminDashboard']);
      //     } else {
      //       this.router.navigate(['home']);
      //     }
      //     this.spinn.hide();
      // }, (error) => {
      //     this.spinn.hide();
      //   this.snackBar.open(error.json().message, 'x', {
      //     duration: 5000,
      //   });
      // });
    } else {
      this.showError = true;
    }
  }

map(){
  this.router.navigate(['map']);

}

selectState(x){

}

create_account(){
  
}

}
