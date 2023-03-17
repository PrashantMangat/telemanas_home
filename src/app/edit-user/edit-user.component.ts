import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import * as GlobalVariables from '../global';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userObj: any;

  isUpdated: boolean;
  orgArray = [];
  phoneNumber;
  emailId;
  role;
  toggleOrg;
  orgObj;
  status;
  newOrg = {
    id: null,
    org_id: '',
    org_remarks: '',
    user_id: '',
    org_name: '',
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
  orgDispArr = [];
  isSubOrgList: any;
  duplicateEntry: boolean;

  constructor(private router: Router, private generalService: GeneralService,
    private snackBar: MatSnackBar, private spinn: NgxSpinnerService) { }

  ngOnInit() {
    this.userObj = JSON.parse(sessionStorage.getItem('userDetails'));
    this.getAllOrg();
  }


  getAllOrg() {
    this.generalService.getAdminOrg().subscribe(response => {
      this.reGainArr = response;
      this.orgArray = response;
      this.autoFill();
    });
  }
  getSubOrg(orgid) {
    this.subOrgArr = [];
    this.spinn.show();
    this.generalService.getSubOrg(orgid).subscribe(response => {
      this.subOrgArr = response;
      if (this.subOrgArr.length > 0) {
        this.isSubOrgList = true;
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
  autoFill() {
    this.emailId = this.userObj.email;
    this.phoneNumber = this.userObj.mobileNo;
    this.desgN = this.userObj.designation;
    this.status = this.userObj.status;
  }
  cancel() {
    this.router.navigate(['manageUsers'], { replaceUrl: true });
  }
  setValue(i, e) {
    if (e.checked) {
      this.userObj.userOrg[i].status = 'ACTIVE';
    } else {
      this.userObj.userOrg[i].status = 'INACTIVE';
    }
  }
  selectOrg() {
    this.duplicateEntry = false;
    this.isDMHP = false;
    for (let i = 0; i < this.orgArr.length; i++) {
      if (this.orgArr[i].org_id === 1) {
        this.isDMHP = true;
      }
    }
    for (let i = 0; i < this.userObj.userOrg.length; i++) {
      if (this.userObj.userOrg[i].org_id === 1) {
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
      this.newOrg.org_id = this.newOrgObj.orgid;
      this.newOrg.org_name = this.newOrgObj.orgname;
      this.newOrg.user_id = this.userObj.userOrg[0].user_id;
      this.getSubOrg(this.newOrgObj.orgid);
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
    for (let i = 0; i < this.orgArr.length; i++) {
      if (this.orgArr[i].org_id === this.newOrg.org_id) {
        this.duplicateEntry = true;
      }
    }
    for (let i = 0; i < this.userObj.userOrg.length; i++) {
      if (this.userObj.userOrg[i].org_id === this.newOrg.org_id) {
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
        id: null,
        org_id: '',
        org_remarks: '',
        user_id: '',
        org_name: '',
        status: 'ACTIVE'
      };
      this.newOrgObj = null;
      this.newSubOrgObj = null;
      this.dispOrg = {
        orgName: '',
        subOrgName: '',
        org_remarks: ''
      };
    }

  }

  update() {
    this.orgArr = this.orgArr.concat(this.userObj.userOrg);
    const obj = {
        email: this.emailId,
        mobileNo: this.phoneNumber,
        status: this.status,
        designation: this.desgN,
        userOrg: this.orgArr,
        userId: this.userObj.userOrg[0].user_id + ''
      };
    this.generalService.updateUser(obj).subscribe(response => {
        const res = response;
        this.isUpdated = true;
        this.spinn.hide();
      }, (error) => {
        this.spinn.hide();
      });
  }

}
