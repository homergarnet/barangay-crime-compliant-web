import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { BarangaySignInComponent } from './barangay-sign-in/barangay-sign-in.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: UserSignInComponent,
  },
  {
    path: 'sign-up',
    component: UserSignUpComponent,
  },
  {
    path: 'barangay-sign-in',
    component: BarangaySignInComponent,
  },
  {
    path: 'admin-sign-in',
    component: AdminSignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
