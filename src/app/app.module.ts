import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralService } from './general.service';
import { VersionCheckService } from './version-check.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberDirective } from './utilities/number.directive';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { specialPipe } from './replacespecial.pipe';
import { AddressDirective } from './utilities/address.directive';
import { NameDirective } from './utilities/name.directive';
import { OrgnameDirective } from './utilities/orgname.directive';
import { AlphaDirective } from './utilities/alphabet.directive';
import { AlphaNumDirective } from './utilities/aphaNum.directive';
import { UsernameDirective } from './utilities/username.directive';
import { PasswordDirective } from './utilities/password.directive';
import { MhmsidDirective } from './utilities/mhmsid.directive';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { TokenInterceptor } from './token.interceptor';
import { RouteGuard } from './route-guard';
import { FaqComponent } from './faq/faq.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PhoneFilterPipe } from './phone-filter.pipe';
import { FooterComponent } from './shared/footer/footer.component';
import {
  MatAutocompleteModule,
  MatInputModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { HelpComponent } from './shared/help/help.component';
import { UsefullinksComponent } from './usefullinks/usefullinks.component';
import { AimobjComponent } from './aimobj/aimobj.component';
import { BgrationaleComponent } from './bgrationale/bgrationale.component';
import { OrgstructureComponent } from './orgstructure/orgstructure.component';
import { IECPromotionalMaterialComponent } from './iecpromotional-material/iecpromotional-material.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberDirective,
    AddressDirective,
    NameDirective,
    OrgnameDirective,
    AlphaDirective,
    AlphaNumDirective,
    UsernameDirective,
    PasswordDirective,
    MhmsidDirective,
    routingComponents,
    FaqComponent,
    specialPipe,
    NewsComponent,
    NewsDetailsComponent,
    ContactUsComponent,
    PhoneFilterPipe,
    FooterComponent,
    HelpComponent,
    UsefullinksComponent,
    AimobjComponent,
    BgrationaleComponent,
    OrgstructureComponent,
    IECPromotionalMaterialComponent,
    NewsletterComponent,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoderFatactroy,
        deps: [HttpClient]

      }
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GeneralService,
    NgxSpinnerService,
    NgxSpinnerModule,
    VersionCheckService,
    RouteGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoderFatactroy(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/',
    '.json'
  );
}
