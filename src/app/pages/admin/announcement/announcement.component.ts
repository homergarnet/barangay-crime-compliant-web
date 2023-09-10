import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {

  announcementForm: FormGroup = new FormGroup({

    description: new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),

  });
  //FOR angular-editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  onCreateAnnouncement(): void {

  }

  get description() {

    return this.announcementForm.get('description');

  }

  //use this if you want to remove the validators
  clearNotRequiredValidators() {

    this.description?.clearValidators();
    this.description?.updateValueAndValidity();

    // this.initialValue?.clearValidators();
    // this.initialValue?.updateValueAndValidity();

  }

}
