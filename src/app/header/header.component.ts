import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  role: string;
  orgArr = [];
  // selOrg;
  external;

  constructor(private router: Router, private gs: GeneralService, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.external = sessionStorage.getItem('external');
    this.userName = sessionStorage.getItem('userName');
    this.role = sessionStorage.getItem('role');
    // this.getUserOrg();
  }
  // getUserOrg() {
  //   this.gs.getUserOrg(this.userId).subscribe(response => {
  //     this.orgArr = response;
  //     this.selectMHE(this.orgArr[0]);
  //   });
  // }
  // selectMHE(org) {
  //   this.selOrg = org;
  //   // sessionStorage.setItem('selectedOrg', JSON.stringify(org));
  // }
  logOut() {
    this.authService.logout().subscribe(response => {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['login']);
    }, (error) => {
        this.snackBar.open(error.json().message, 'x', {
        duration: 5000,
      });
      localStorage.clear();
      sessionStorage.clear();
        this.router.navigate(['login']);
    });
  }
  policy() {
    this.router.navigate(['policy']);
  }
  dashboard() {
    if(this.role === 'Admin'){
      this.router.navigate(['adminDashboard']);

    } else {
      this.router.navigate(['home']);

    }
  }

  updatePass() {
    this.router.navigate(['updatePass']);
  }
}
