import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AdminIncidentReportService } from 'src/app/services/admin-incident-report.service';

@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss']
})
export class IncidentReportComponent implements OnInit {

  currentDate: Date = new Date();
  currentYear: number = new Date().getFullYear();
  years: number[] = [];

  incidentReportForm: FormGroup = new FormGroup({

    date: new FormControl('', [
      Validators.required,

    ]),

    year: new FormControl('', [
      Validators.required,

    ]),

    timeStart: new FormControl('', [


    ]),

    timeEnd: new FormControl('', [


    ]),



  });

  incidentReportList: any;
  crimeCompliantList: any;

  constructor(
    private adminIncidentReportService: AdminIncidentReportService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {

    for (let year = this.currentYear; year >= 1970; year--) {
      this.years.push(year);
    }

  }

  ngOnInit(): void {

    let incidenReportFormValue = {

      date: this.getCurrentDateFormatted(),
      year: this.currentYear

    }

    this.incidentReportForm.patchValue(incidenReportFormValue);

    this.initialReceiveCrimeList();

  }

  initialReceiveCrimeList(): void {

    this.spinner.show();

    let incidenReportFormValue = {

      date: this.date?.value,
      year: this.year?.value,
      timeStart: this.timeStart?.value,
      timeEnd: this.timeEnd?.value

    }

    this.incidentReportForm.patchValue(incidenReportFormValue);

    this.adminIncidentReportService.getIncidentReportList(this.date?.value,this.year?.value, this.timeStart?.value, this.timeEnd?.value).subscribe(
      (res) => {

        let result: any = res;
        console.log("result: ", result);
        this.incidentReportList = result;
        this.spinner.hide();
      },
      (error) => {

        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');

      }
    );

    this.adminIncidentReportService.getCrimeCompliantList(1, 100).subscribe(
      (res) => {

        let result: any = res;
        console.log("result: ", result);
        this.crimeCompliantList = result;
        this.spinner.hide();
      },
      (error) => {

        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');

      }
    );

  }

  dateYearTimeChange(): void {

    let incidenReportFormValue = {

      date: this.date?.value,
      year: this.year?.value,
      timeStart: this.timeStart?.value,
      timeEnd: this.timeEnd?.value

    }

    this.incidentReportForm.patchValue(incidenReportFormValue);
    this.initialReceiveCrimeList();
  }

  getCurrentDateFormatted(): string {
    return this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') || '';
  }

  get date() {

    return this.incidentReportForm.get('date');

  }

  get year() {

    return this.incidentReportForm.get('year');

  }

  get timeStart() {

    return this.incidentReportForm.get('timeStart');

  }

  get timeEnd() {

    return this.incidentReportForm.get('timeEnd');

  }

}
