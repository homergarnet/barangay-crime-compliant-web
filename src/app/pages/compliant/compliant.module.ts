import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompliantRoutingModule } from './compliant-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    CompliantRoutingModule
  ]
})
export class CompliantModule { }
