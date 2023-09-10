import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { TotalCardsComponent } from './cards/total-cards/total-cards.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [


    TotalCardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TotalCardsComponent,
    AngularEditorModule
  ]
})
export class SharedModule { }
