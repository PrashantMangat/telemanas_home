import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  displayedColumns = ['position', 'fullName', 'mobile', 'org', 'status'];
  pageObj: any;
  userPgLen: any;
  userArr = new MatTableDataSource<any>();

  @ViewChild('userPaginator', { read: MatPaginator }) userPaginator: MatPaginator;

  constructor(private router: Router, private spin: NgxSpinnerService, private gs: GeneralService) { }

  ngOnInit() {
    this.getUsers(10, 0);
  }
  addUser() {
    this.router.navigate(['addUser']);
  }
  editUser(row) {
    sessionStorage.setItem('userDetails', JSON.stringify(row));
    this.router.navigate(['editUser']);
  }
  onPgChange(event) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.getUsers(pageSize, pageIndex);
  }
  getUsers(pageSize, pageIndex) {
    // this.spin.show();
    this.gs.getAllUsers(pageIndex, pageSize).subscribe(response => {
      this.pageObj = response;
      this.userPaginator.pageSize = this.pageObj.size;
      this.userPgLen = this.pageObj.totalElements;
      this.userArr = new MatTableDataSource(this.pageObj.content);
      this.spin.hide();
    }, (error) => {
      this.spin.hide();
      this.userArr = null;
    });
  }

  back(){
    this.router.navigate(['adminDashboard']);

  }

}
