import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';
import { SharedModule } from '../shared/shared.module';
import { BarangaySignInComponent } from './barangay-sign-in/barangay-sign-in.component';
import { AdminSignInComponent } from './admin-sign-in/admin-sign-in.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    UserSignInComponent,
    UserSignUpComponent,
    BarangaySignInComponent,
    AdminSignInComponent,
    ResetPasswordComponent,

  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
