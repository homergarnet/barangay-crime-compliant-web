import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BarangayAnnouncementService } from 'src/app/services/barangay-announcement.service';
import { SignalrService } from 'src/app/services/signalr.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  announcementForm: FormGroup = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(1000),
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

  constructor(
    private toastr: ToastrService,
    private barangayAnnouncementService: BarangayAnnouncementService,

    private spinner: NgxSpinnerService,
    private signalRService: SignalrService
  ) {}

  ngOnInit(): void {}

  onCreateAnnouncement(): void {
    this.spinner.show();
    if (this.announcementForm.valid) {
      this.barangayAnnouncementService
        .createAnnouncement(this.description?.value)
        .subscribe(
          (res) => {
            let result: any = res;
            console.log('result: ', result);
            let announcementFormValue = {
              description: '',
            };
            this.signalRService.sendMessage('There is a new announcement');
            this.announcementForm.patchValue(announcementFormValue);
            this.toastr.success('Successfully created announcement');
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            Swal.fire('Warning', 'Something went wrong', 'warning');
          }
        );
    } else {
      this.toastr.error(
        'Minimum Length of announcement is 1 and maximum announcement is 1000',
        'Error'
      );
      this.spinner.hide();
    }
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
