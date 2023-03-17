import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { JSEncrypt } from 'jsencrypt';
import * as GlobalVariables from '../global';



@Component({
  selector: 'app-update-pass',
  templateUrl: './update-pass.component.html',
  styleUrls: ['./update-pass.component.css']
})

export class UpdatePassComponent implements OnInit {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  currentENCPassword = '';
  newENCPassword = '';
  confirmENCPassword = '';
  hide1 = true;
  hide2 = true;
  hide3 = true;
  showError = false;
  passMisMatch: boolean;
  role: string;
  userid: any;
  isPasswordChanged: any;
  constructor(private router: Router, private generalService: GeneralService,
    private snackBar: MatSnackBar, private authService: AuthService, private spinn: NgxSpinnerService) { }

  ngOnInit() {
    this.isPasswordChanged = false;
    this.role = sessionStorage.getItem('role');
  }

  matchPass() {
    if (this.newPassword.length > 7) {
      if (this.newPassword === this.confirmPassword) {
        this.passMisMatch = false;
      } else {
        this.passMisMatch = true;
      }
    }
  }

  updatePassword() {
    this.userid = sessionStorage.getItem('userID');
    if (this.newPassword === this.confirmPassword) {
      this.encodePassword(this.currentPassword, this.newPassword);
      this.spinn.show();
      this.generalService.getUpdatePassword(this.userid, this.currentENCPassword, this.newENCPassword).subscribe(response => {
        const res = response;
        this.isPasswordChanged = true;
        sessionStorage.setItem('isUpdate', 'false');
        this.spinn.hide();
      }, (error) => {
        this.spinn.hide();
          // this.snackBar.open(error.message, 'x', {
          //   duration: 5000,
          //   panelClass: ['warning']
          // });
      });
    } else {
      this.passMisMatch = true;
    }

  }

  encodePassword(currentPass, newPassword) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(GlobalVariables.rsapublicKey);

    const temp = currentPass;
    const encrypted = encrypt.encrypt(temp);
    // this.currentENCPassword = encrypted;

    const temp1 = newPassword;
    const encrypted1 = encrypt.encrypt(temp1);
    // this.newENCPassword = encrypted1;
  }

  goToAdminLogin() {
    this.spinn.show();
    this.authService.logout().subscribe(response => {
      localStorage.clear();
      sessionStorage.clear();
      this.spinn.hide();
      this.router.navigate(['login']);
    }, (error) => {
      localStorage.clear();
      sessionStorage.clear();
        this.spinn.hide();
      this.router.navigate(['login']);
    });
  }

  goToDashboard() {
    if (this.role === 'Admin') {
      this.router.navigate(['adminDashboard'], { replaceUrl: true });
    } else {
      this.router.navigate(['home'], { replaceUrl: true });
    }
  }
}
