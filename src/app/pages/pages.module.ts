import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from './shared/shared.module';
import { LayoutComponent } from './_layout/layout.component';
import { SidebarComponent } from './_layout/components/sidebar/sidebar.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { NavbarComponent } from './_layout/components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [

    LayoutComponent,
      SidebarComponent,
      FooterComponent,
      NavbarComponent,
      HomeComponent,

  ],
  imports: [
    SharedModule,
    PagesRoutingModule,
    NgbModule
  ],
})
export class PagesModule { }
