import { MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AppMaterialModule } from './app_material/app-material.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BnNgIdleService } from 'bn-ng-idle';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { TokenInterceptor } from '../app/services/token.interceptor';
import { SortPipe } from '../app/utilities/sort-pipe';
import { UpdatePassComponent } from './update-pass/update-pass.component';
import { PassGuardService } from '../app/auth/pass-guard.service';
import { AdminGuardService } from '../app/auth/admin-guard.service';
import { MHProffGuardService } from '../app/auth/mhProff-guard.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReportComponent } from './report/report.component';
import { ChartsModule } from 'ng2-charts';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { IndiamapComponent } from './indiamap/indiamap.component';
import { MapComponent } from './map/map.component';
import { MapInfoComponent } from './map-info/map-info.component';
import { CountDistrictService } from './services/count.service';
import { DataService } from './services/data.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { HomeindiamapComponent } from './homeindiamap/homeindiamap.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HomeMapInfoComponent } from './home-map-info/home-map-info.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TestmapComponent } from './testmap/testmap.component';
// import { specialPipe } from './replacespecial.pipe';
import { NgxLoadingModule } from "ngx-loading";
import { Map1Component } from './map1/map1.component';
import { Map2Component } from './map2/map2.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    AddUsersComponent,
    ManageUsersComponent,
    SortPipe,
    UpdatePassComponent,
    EditUserComponent,
    ViewDetailsComponent,
    AdminDashboardComponent,
    ReportComponent,
    PrivacyPolicyComponent,
    IndiamapComponent,
    MapComponent,
    MapInfoComponent,
    HomepageComponent,
    AdminloginComponent,
    DashboardhomeComponent,
    HomeindiamapComponent,
    HomeMapInfoComponent,
    HomeMapComponent,
    FooterComponent,
    TestmapComponent,
    Map1Component,
    Map2Component,
  ],
  imports: [

    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    RouterModule,
    AppMaterialModule,
    ChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoderFatactroy,
        deps: [HttpClient]

      }
    }),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    AuthGuard,
    AuthService,
    DatePipe,
    NgxSpinnerService,
    NgxSpinnerModule,
    PassGuardService,
    MHProffGuardService,
    AdminGuardService,
    BnNgIdleService,
    CountDistrictService,
    DataService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
export function HttpLoderFatactroy(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/',
    '.json'
  );
}
