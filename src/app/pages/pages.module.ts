import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './_layout/layout.component';


@NgModule({
  declarations: [

    LayoutComponent
  ],
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
})
export class PagesModule { }
