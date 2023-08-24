import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReceivedCrimeComponent } from './received-crime/received-crime.component';
import { ReceivedCrimeComplaintComponent } from './received-crime-complaint/received-crime-complaint.component';
import { LocationAlertComponent } from './location-alert/location-alert.component';
import { SolvedCompletedReportsComponent } from './solved-completed-reports/solved-completed-reports.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'received-crime',
    component: ReceivedCrimeComponent,
  },
  {
    path: 'received-crime-compliant',
    component: ReceivedCrimeComplaintComponent,
  },
  {
    path: 'location-alert',
    component: LocationAlertComponent,
  },
  {
    path: 'solved-completed-reports',
    component: SolvedCompletedReportsComponent,
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarangayRoutingModule { }
