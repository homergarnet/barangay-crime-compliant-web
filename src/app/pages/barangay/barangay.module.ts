import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayRoutingModule } from './barangay-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ReceivedCrimeComponent } from './received-crime/received-crime.component';
import { ReceivedCrimeComplaintComponent } from './received-crime-complaint/received-crime-complaint.component';
import { LocationAlertComponent } from './location-alert/location-alert.component';
import { SolvedCompletedReportsComponent } from './solved-completed-reports/solved-completed-reports.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    HomeComponent,
    ReceivedCrimeComponent,
    ReceivedCrimeComplaintComponent,
    LocationAlertComponent,
    SolvedCompletedReportsComponent,
    AnnouncementComponent,
    ReportsComponent
  ],
  imports: [
    SharedModule,
    BarangayRoutingModule
  ]
})
export class BarangayModule { }
