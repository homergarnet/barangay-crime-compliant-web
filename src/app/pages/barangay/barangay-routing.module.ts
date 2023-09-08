import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReceivedCrimeComponent } from './received-crime/received-crime.component';
import { ReceivedCrimeComplaintComponent } from './received-crime-complaint/received-crime-complaint.component';
import { LocationAlertComponent } from './location-alert/location-alert.component';
import { SolvedCompletedReportsComponent } from './solved-completed-reports/solved-completed-reports.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ReportsComponent } from './reports/reports.component';
import { CompliantGuardsGuard } from '../auth/guards/compliant-guards.guard';
import { BarangayGuardsGuard } from '../auth/guards/barangay-guards.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [BarangayGuardsGuard]
  },
  {
    path: 'received-crime',
    component: ReceivedCrimeComponent,
    canActivate: [BarangayGuardsGuard]
  },
  {
    path: 'received-crime-compliant',
    component: ReceivedCrimeComplaintComponent,
    canActivate: [BarangayGuardsGuard]
  },
  {
    path: 'location-alert',
    component: LocationAlertComponent,
    canActivate: [BarangayGuardsGuard]
  },
  {
    path: 'solved-completed-reports',
    component: SolvedCompletedReportsComponent,
    canActivate: [BarangayGuardsGuard]
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
    canActivate: [BarangayGuardsGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [BarangayGuardsGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarangayRoutingModule { }
