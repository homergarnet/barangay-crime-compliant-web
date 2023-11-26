import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { TotalCardsComponent } from './cards/total-cards/total-cards.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';

@NgModule({
  declarations: [


    TotalCardsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AutocompleteLibModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TotalCardsComponent,
    AngularEditorModule,
    AutocompleteLibModule
  ]
})
export class SharedModule { }
