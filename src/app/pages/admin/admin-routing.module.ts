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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'manage-crime',
    component: ManageCrimeComponent,
  },
  {
    path: 'incident-report',
    component: IncidentReportComponent,
  },
  {
    path: 'crime-mapping',
    component: CrimeMappingComponent,
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
  },
  {
    path: 'law-and-order-information',
    component: LawAndOrderInformationComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
