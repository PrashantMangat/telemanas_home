import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { JSEncrypt} from 'jsencrypt';
import * as GlobalVariables from '../global';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  addUsername: any;
  addPassword;
  confirmPassword;
  isUserCreated: boolean;
  orgArray = [];
  firstName;
  lastName;
  phoneNumber;
  emailId;
  userCheckMsg;
  isAvailable: boolean;
  role;
  toggleOrg;
  hide = true;
  hide2 = true;
  orgObj;
  passMisMatch: boolean;
  roleArr = ['MHProfessional'];
  newOrg = {
    org_id: '',
    org_remarks: '',
    status: 'ACTIVE'
  };
  newOrgObj;
  newSubOrgObj;
  orgArr = [];
  subOrgArr = [];
  dispOrgArr = [];
  dispOrg = {
    orgName: '',
    subOrgName: '',
    org_remarks: ''
  };
  desgN;
  showPrimDist: boolean;
  districtArray = GlobalVariables.districtsList;
  isOrg: boolean;
  showOther: boolean;
  reGainArr: any[];
  isDMHP: boolean;
  showNote: string;
  isSubOrgList: boolean;
  duplicateEntry: boolean;


  constructor(private router: Router, private generalService: GeneralService,
              private snackBar: MatSnackBar, private spinn: NgxSpinnerService) { }

  ngOnInit() {
    this.role = 'MHProfessional';
    this.getAllOrg();
  }
  getAllOrg() {
    this.generalService.getAdminOrg().subscribe(response => {
      this.reGainArr = response;
      this.orgArray = response;
    });
  }
  getSubOrg(orgid) {
    this.subOrgArr = [];
    this.spinn.show();
    this.generalService.getSubOrg(orgid).subscribe(response => {
      this.subOrgArr = response;
      if (this.subOrgArr.length > 0) {
        this.isSubOrgList = true;
      } else {
        this.isSubOrgList = false;
      }
      this.spinn.hide();
    }, (error) => {
      this.spinn.hide();
      });

  }
  setSubOrg() {
    this.duplicateEntry = false;
    if (this.subOrgArr.length > 0) {
      this.dispOrg.subOrgName = this.newSubOrgObj.orgname;
      this.newOrg.org_id = this.newSubOrgObj.orgid;
    }
  }
  cancel() {
    this.router.navigate(['manageUsers'], { replaceUrl: true });
  }
  selectOrg() {
    this.duplicateEntry = false;
    this.isDMHP = false;
    this.newOrg.org_id = this.newOrgObj.orgid;
    for ( let i = 0; i < this.orgArr.length; i++) {
      if (this.orgArr[i].org_id === 1) {
        this.isDMHP = true;
      }
    }
    if (this.isDMHP === true && this.newOrgObj.orgid === 1) {
      this.showNote = 'Duplicate Entry!';
      this.subOrgArr = [];
    } else {
      this.showNote = '';
      this.newOrg.org_remarks = null;
      this.dispOrg.orgName = this.newOrgObj.orgname;
      this.getSubOrg(this.newOrgObj.orgid);
    }
  }
  activeAddBtn() {
    if (this.isSubOrgList) {
      if (!this.newOrg.org_remarks || !this.newOrgObj || !this.newSubOrgObj || this.showNote === 'Duplicate Entry!') {
        return true;
      } else {
        return false;
      }
    } else {
      if (!this.newOrg.org_remarks || !this.newOrgObj || this.showNote === 'Duplicate Entry!') {
        return true;
      } else {
        return false;
      }
    }
  }
  delOrg(index) {
    this.newOrgObj = null;
    this.showNote = '';
    this.orgArr.splice(index, 1);
    this.dispOrgArr.splice(index, 1);
  }
  addMoreOrg() {
    this.duplicateEntry = false;
    for ( let i = 0; i < this.orgArr.length; i++) {
      if (this.orgArr[i].org_id === this.newOrg.org_id) {
        this.duplicateEntry = true;
      }
    }
    if (!this.duplicateEntry) {
      this.orgArr.push(this.newOrg);
      this.dispOrg.org_remarks = this.newOrg.org_remarks;
      this.dispOrgArr.push(this.dispOrg);
      if (this.orgArr.length > 0) {
        this.isOrg = true;
      } else {
        this.isOrg = false;
      }
      this.newOrg = {
        org_id: '',
        org_remarks: '',
        status: 'ACTIVE',
      };
      this.newOrgObj = null;
      this.newSubOrgObj = null;
      this.dispOrg = {
        orgName: '',
        org_remarks: '',
        subOrgName: ''
      };
    }
  }


  matchPass() {
    if (this.addPassword.length > 7) {
      if (this.addPassword === this.confirmPassword) {
        this.passMisMatch = false;
       } else {
      this.passMisMatch = true;
    }
  }
}
userCheck() {
    if ( this.addUsername.length > 5) {
      this.spinn.show();
      this.generalService.checkUsername(this.addUsername).subscribe(response => {
        const res = response;
        this.isAvailable = true;
        this.userCheckMsg = res.message;
        this.spinn.hide();
      }, (error) => {
        this.spinn.hide();
        this.isAvailable = false;
        this.userCheckMsg = 'Username already taken';
        //  error[`message`];
      });
    }
  }
  createUser() {
    if (this.addPassword === this.confirmPassword) {
      this.spinn.show();
      this.passMisMatch = false;
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(GlobalVariables.rsapublicKey);
      const encrypted = encrypt.encrypt(this.addPassword);
      const obj = {
        username: this.addUsername,
        password: encrypted,
        email: this.emailId,
        firstName: this.firstName,
        lastName: this.lastName,
        mobileNo: this.phoneNumber,
        role: this.role,
        status: 'ACTIVE',
        designation: this.desgN,
        userOrg: this.orgArr
      };
      this.generalService.createUser(obj).subscribe(response => {
        const res = response;
        this.isUserCreated = true;
        this.spinn.hide();
      }, (error) => {
        this.spinn.hide();
      });
    } else {
      this.passMisMatch = true;
    }
  }
}
