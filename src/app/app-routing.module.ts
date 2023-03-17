import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportComponent } from './report/report.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { IndiamapComponent } from './indiamap/indiamap.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { MapComponent } from './map/map.component';
import { Map1Component } from './map1/map1.component';
import { Map2Component } from './map2/map2.component';


const routes: Routes = [
  { path: 'map', component: IndiamapComponent },
  { path: 'policy', component: PrivacyPolicyComponent },
  { path: 'view_details', component: ViewDetailsComponent }, //, canActivate: [AuthGuard, PassGuardService] },
  { path: 'home', component: DashboardComponent }, //, canActivate: [AuthGuard, PassGuardService, MHProffGuardService] },
  { path: 'addUser', component: AddUsersComponent }, //, canActivate: [AuthGuard, PassGuardService, AdminGuardService] },
  { path: 'manageUsers', component: ManageUsersComponent }, //, canActivate: [AuthGuard, PassGuardService, AdminGuardService] },
  { path: 'editUser', component: EditUserComponent }, //, canActivate: [AuthGuard, PassGuardService, AdminGuardService] },
  { path: 'updatePass', component: UpdatePassComponent }, //, canActivate: [AuthGuard, PassGuardService] },
  { path: 'adminDashboard', component: AdminDashboardComponent }, // , canActivate: [AuthGuard, PassGuardService, AdminGuardService] },
  { path: 'report', component: ReportComponent }, //, canActivate: [AuthGuard, PassGuardService, AdminGuardService] },
  { path: 'adminLogin', component: AdminloginComponent },
  { path: '', component: DashboardhomeComponent },
  {path: 'mapp', component: MapComponent},
  {path: 'map1', component: Map1Component},
  {path: 'map2', component: Map2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  ViewDetailsComponent,
  DashboardComponent,
  AddUsersComponent,
  ManageUsersComponent,
  UpdatePassComponent,
  EditUserComponent,
  AdminDashboardComponent,
  PrivacyPolicyComponent,
  AdminloginComponent,
  DashboardhomeComponent,
  MapComponent,
  Map1Component,
  Map2Component
];
