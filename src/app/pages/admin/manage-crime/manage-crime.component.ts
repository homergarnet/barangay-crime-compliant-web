import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReceiveCrimeService } from 'src/app/services/receive-crime.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { AuthService } from 'src/app/services/auth.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-manage-crime',
  templateUrl: './manage-crime.component.html',
  styleUrls: ['./manage-crime.component.scss'],
})
export class ManageCrimeComponent implements OnInit {
  receiveCrimeList: any[] = [];
  receiveCrimeFilteredList: any[] = [];
  crimeImageByIdList: any[] = [];
  crimeVideoByIdList: any[] = [];
  currentPage: number = 1;
  resultPerPage: number = 10;
  thisPageFirstResult: number = (this.currentPage - 1) * this.resultPerPage;
  numberOfPages: number = 0;
  numberOfPagesArr: any;

  isModalShow: boolean = false;
  modalTitle: string = '';

  showEdit: boolean = false;

  statusValue: any = [
    {
      name: 'Active',
      value: 'active',
      isSelected: false,
    },
    {
      name: 'Fake Report',
      value: 'fake report',
      isSelected: false,
    },
    {
      name: 'Resolved',
      value: 'resolved',
      isSelected: false,
    },
    {
      name: 'In Progress',
      value: 'in progress',
      isSelected: true,
    },
    {
      name: 'Investigation',
      value: 'investigation',
      isSelected: false,
    },
    {
      name: 'Completed',
      value: 'completed',
      isSelected: false,
    },
    {
      name: 'Close',
      value: 'close',
      isSelected: false,
    },
  ];

  receivedCrimeForm: FormGroup = new FormGroup({
    responderId: new FormControl('', []),
    responderName: new FormControl('', []),
    responderDescription: new FormControl({ value: '', disabled: true }, []),

    status: new FormControl('', []),
  });

  reportId: number = 0;

  API_URL: string = environment.apiUrl;

  generateDataPdf: any = [];
  pdfMake: any;
  keyword = 'name';
  responderData = [
    {
      id: 1,
      name: 'Georgia',
    },
    {
      id: 2,
      name: 'Usa',
    },
    {
      id: 3,
      name: 'England',
    },
  ];

  constructor(
    private toastr: ToastrService,
    private receiveCrimeService: ReceiveCrimeService,
    private adminUsersService: AdminUsersService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {
    this.pdfMake = pdfMake;
    this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.initialReceiveCrimeList();
    this.initialResponderList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue != '') {
      let regex = new RegExp(filterValue, 'i');
      this.receiveCrimeFilteredList = this.receiveCrimeList.filter(
        (item: any) =>
          regex.test(item.ReportIdStr) ||
          regex.test(this.datePipe.transform(item.Date, 'yyyy-MM-dd')) ||
          regex.test(item.Date) ||
          regex.test(item.ReporterName) ||
          regex.test(item.Category) ||
          regex.test(item.Description) ||
          regex.test(item.Status)
      );
    } else {
      this.receiveCrimeFilteredList = this.receiveCrimeList;
      this.updateGenerateDatePdf();
    }
  }

  initialReceiveCrimeList(
    currentPageVal: number = 1,
    resultPerPageVal: number = 10
  ) {
    this.spinner.show();

    this.receiveCrimeService
      .receiveCrimeList(
        'crime',
        '',
        '',
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;
          this.receiveCrimeList = result;
          this.receiveCrimeFilteredList = result;
          this.updateGenerateDatePdf();
          this.numberOfPages = Math.ceil(
            this.receiveCrimeList.length / this.resultPerPage
          );

          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire('Warning', 'Something went wrong', 'warning');
        }
      );
  }

  initialResponderList(): void {
    this.spinner.show();

    this.adminUsersService.getResponderInfoList('', 1, 1000).subscribe(
      (res) => {
        let result: any = res;
        this.responderData = result;

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );
  }

  getCrimeImageVideoByIdList() {
    this.crimeImageByIdList = [];
    this.crimeVideoByIdList = [];
    this.spinner.show();

    this.receiveCrimeService
      .getCrimeImageVideoByIdList(this.reportId)
      .subscribe(
        (res) => {
          let result: any = res;

          result.forEach((item, index) => {
            const lastDotIndex = item.Image.lastIndexOf('.');
            if (lastDotIndex !== -1) {
              if (
                item.Image.slice(lastDotIndex + 1) != 'mp4' &&
                item.Image.slice(lastDotIndex + 1) != 'avi' &&
                item.Image.slice(lastDotIndex + 1) != 'mkv' &&
                item.Image.slice(lastDotIndex + 1) != 'mov' &&
                item.Image.slice(lastDotIndex + 1) != 'wmv' &&
                item.Image.slice(lastDotIndex + 1) != 'flv'
              ) {
                //push
                this.crimeImageByIdList.push(item);
              } else {
                this.crimeVideoByIdList.push(item);
              }
            } else {
            }
          });

          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire('Warning', 'Something went wrong', 'warning');
        }
      );
  }

  async paginationUpdateList() {
    const firstData = await this.initialReceiveCrimeList(this.currentPage);

    this.thisPageFirstResult = (this.currentPage - 1) * this.resultPerPage;
    this.receiveCrimeFilteredList = this.receiveCrimeList.slice(
      this.thisPageFirstResult,
      this.resultPerPage * this.currentPage
    );
    this.numberOfPages = Math.ceil(
      this.receiveCrimeList.length / this.resultPerPage
    );
    // [0,1,2,3,4]
    this.numberOfPagesArr = Array(this.numberOfPages)
      .fill(this.numberOfPages)
      .map((x, i) => i);
    this.updateGenerateDatePdf();
  }

  onMinusCurrentPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginationUpdateList();
    } else {
      this.currentPage = 1;
    }
  }

  onClickcurrentPage(num: number): void {
    this.currentPage = num;
    this.paginationUpdateList();
  }

  onAddCurrentPage(): void {
    if (this.currentPage != this.numberOfPages || this.numberOfPages == 1) {
      this.currentPage++;
      this.paginationUpdateList();
    }
  }

  showHideModal(
    modalTitle: string,
    showEdit: boolean,
    reportId: number = 0,
    responderId: number = 0,
    responderName: string = '',
    responderDescription: string = '',
    status: string = ''
  ): void {
    this.isModalShow = !this.isModalShow;
    this.modalTitle = modalTitle;
    this.showEdit = showEdit;

    this.reportId = reportId;
    let receivedCrimeFormValue = {
      responderId,
      responderName,
      responderDescription,
      status: status,
    };

    this.receivedCrimeForm.patchValue(receivedCrimeFormValue);
    this.isEnableResponderDescription(responderId);
    this.getCrimeImageVideoByIdList();
  }

  isEnableResponderDescription(responderId: number): void {
    this.spinner.show();
    this.authService.isCurrentResponder(responderId).subscribe(
      (res) => {
        let result: any = res;
        let control = this.receivedCrimeForm.get('responderDescription');
        if (result === false) {
          control.disable();
        } else {
          control.enable();
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();

        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );
  }

  updateCrimeStatus() {
    this.spinner.show();
    if (this.receivedCrimeForm.valid) {
      this.receiveCrimeService
        .updateCrimeStatusById(
          this.reportId,
          this.responderId?.value,
          this.responderDescription?.value,
          this.status?.value
        )
        .subscribe(
          (res) => {
            let result: any = res;

            Swal.fire('Info', 'Updated', 'info');
            this.initialReceiveCrimeList(this.currentPage);
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            console.log('error: ', error);
            Swal.fire('Warning', 'Something went wrong', 'warning');
          }
        );
    } else {
      this.toastr.error('re check all fields', 'Error');
      this.spinner.hide();
    }
  }

  selectEvent(item) {
    // do something with selected item
    let receiveCrimeFormValue = {
      responderId: item.id,
    };

    this.receivedCrimeForm.patchValue(receiveCrimeFormValue);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  generatePDF() {
    const documentDefinition = {
      content: [
        { text: 'Manage Crime', style: 'header' },
        {
          table: {
            body: this.generateDataPdf,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
      },
    };

    const pdfDoc = this.pdfMake.createPdf(documentDefinition);
    pdfDoc.download('Manage Crime-' + Date.now() + '.pdf');
  }

  updateGenerateDatePdf(): void {
    this.generateDataPdf = [];
    this.generateDataPdf = [
      [
        'Report Number',
        'Date Received',
        'Reported By',
        'Type Of Crime',
        'Description',
        'Status',
      ],
    ];

    this.receiveCrimeFilteredList.forEach((item, index) => {
      let myArr = [
        item.ReportIdStr,
        item.Date,
        item.ReporterName,
        item.Category,
        item.Description,
        item.Status,
      ];
      this.generateDataPdf.push(myArr);
    });
  }

  get responderId() {
    return this.receivedCrimeForm.get('responderId');
  }

  get responderDescription() {
    return this.receivedCrimeForm.get('responderDescription');
  }

  get status() {
    return this.receivedCrimeForm.get('status');
  }
}
