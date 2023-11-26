import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageCrimeComponent } from './manage-crime/manage-crime.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { CrimeMappingComponent } from './crime-mapping/crime-mapping.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { LawAndOrderInformationComponent } from './law-and-order-information/law-and-order-information.component';
import { ReportsComponent } from './reports/reports.component';
import { UsersComponent } from './users/users.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CompliantGuardsGuard } from '../auth/guards/compliant-guards.guard';
import { AdminGuardsGuard } from '../auth/guards/admin-guards.guard';
import { SolvedCompletedReportsComponent } from './solved-completed-reports/solved-completed-reports.component';
import { PoliceInOutComponent } from './police-in-out/police-in-out.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'manage-crime',
    component: ManageCrimeComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'incident-report',
    component: IncidentReportComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'crime-mapping',
    component: CrimeMappingComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'police-in-out',
    component: PoliceInOutComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'solved-completed-reports',
    component: SolvedCompletedReportsComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'law-and-order-information',
    component: LawAndOrderInformationComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuardsGuard]
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate: [AdminGuardsGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
