import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { GeneralHomeComponent } from './general-home/general-home.component';
import { RouteGuard } from './route-guard';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { AimobjComponent } from './aimobj/aimobj.component';
import { BgrationaleComponent } from './bgrationale/bgrationale.component';
import { OrgstructureComponent } from './orgstructure/orgstructure.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HelpComponent } from './shared/help/help.component';
import { UsefullinksComponent } from './usefullinks/usefullinks.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { IECPromotionalMaterialComponent } from './iecpromotional-material/iecpromotional-material.component';

const routes: Routes = [
  { path: 'home', component: GeneralHomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'aim&objectives', component: AimobjComponent },
  { path: 'bgrationale', component: BgrationaleComponent },
  { path: 'orgstructure', component: OrgstructureComponent },
  { path: 'contactus', component: ContactUsComponent},
  { path: 'faq', component: FaqComponent, canActivate: [RouteGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'News', component: NewsComponent },
  { path: 'News-details', component: NewsDetailsComponent },
  { path: 'help', component: HelpComponent },
  { path: 'UsefulLinks', component: UsefullinksComponent},
  { path: 'Newsletter', component: NewsletterComponent},
  { path: 'promotional-material', component: IECPromotionalMaterialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HeaderComponent,
  FooterComponent,
  GeneralHomeComponent,
  FaqComponent,
  AboutComponent,
  BgrationaleComponent,
  AimobjComponent,
  OrgstructureComponent,
  ContactUsComponent,
  HelpComponent,
  UsefullinksComponent,
  NewsletterComponent,
  IECPromotionalMaterialComponent
];

