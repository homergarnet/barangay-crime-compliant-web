import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarangayRoutingModule } from './barangay-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    BarangayRoutingModule
  ]
})
export class BarangayModule { }
