import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { ScrollToTopComponent } from './pages/shared/scroll-to-top/scroll-to-top.component';
import { DatePipe } from '@angular/common';
import { AdminTokenInterceptorService } from './services/admin-token-interceptor.service';
import { BarangayTokenInterceptorService } from './services/barangay-token-interceptor.service';
import { CompliantTokenInterceptorService } from './services/compliant-token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ScrollToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      progressAnimation: 'increasing',
      progressBar: true,
    }),
  ],
  providers: [
    DatePipe,

    {

      provide: HTTP_INTERCEPTORS,
      useClass: AdminTokenInterceptorService,
      multi: true
    },
    {

      provide: HTTP_INTERCEPTORS,
      useClass: BarangayTokenInterceptorService,
      multi: true
    },
    {

      provide: HTTP_INTERCEPTORS,
      useClass: CompliantTokenInterceptorService,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
