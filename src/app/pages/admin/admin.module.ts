import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ManageCrimeComponent } from './manage-crime/manage-crime.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { CrimeMappingComponent } from './crime-mapping/crime-mapping.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { LawAndOrderInformationComponent } from './law-and-order-information/law-and-order-information.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    HomeComponent,
    ManageCrimeComponent,
    IncidentReportComponent,
    CrimeMappingComponent,
    AnnouncementComponent,
    LawAndOrderInformationComponent,
    ReportsComponent,
    UsersComponent,
    AccountSettingsComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
