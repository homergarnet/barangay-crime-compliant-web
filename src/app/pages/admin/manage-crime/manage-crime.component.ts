import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReceiveCrimeService } from 'src/app/services/receive-crime.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-manage-crime',
  templateUrl: './manage-crime.component.html',
  styleUrls: ['./manage-crime.component.scss']
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
      'name': 'Active',
      'value': 'active',
      'isSelected': false,
    },
    {
      'name': 'Fake Report',
      'value': 'fake report',
      'isSelected': false,
    },
    {
      'name': 'Resolved',
      'value': 'resolved',
      'isSelected': false,
    },
    {
      'name': 'In Progress',
      'value': 'in progress',
      'isSelected': true,
    },
    {
      'name': 'Investigation',
      'value': 'investigation',
      'isSelected': false,
    },
    {
      'name': 'Completed',
      'value': 'completed',
      'isSelected': false,
    },
    {
      'name': 'Close',
      'value': 'close',
      'isSelected': false,
    },

  ];

  receivedCrimeForm: FormGroup = new FormGroup({



    status: new FormControl('', [

    ]),

  });

  reportId: number = 0;

  API_URL: string = environment.apiUrl;

  constructor(
    private toastr: ToastrService,
    private receiveCrimeService: ReceiveCrimeService,

    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {

    this.initialReceiveCrimeList();

  }

    applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;



    if(filterValue != '') {
      let regex = new RegExp( filterValue, 'i');
      this.receiveCrimeFilteredList = this.receiveCrimeList.filter((item: any) =>
        regex.test(item.ReportIdStr) || regex.test(this.datePipe.transform(item.Date, 'yyyy-MM-dd')) ||
        regex.test(item.Date) || regex.test(item.ReporterName) || regex.test(item.Category) ||
        regex.test(item.Description) || regex.test(item.Status)
      );
    } else {
      this.receiveCrimeFilteredList = this.receiveCrimeList;
    }


  }

  initialReceiveCrimeList(currentPageVal: number = 1, resultPerPageVal: number = 10) {

    this.spinner.show();

    this.receiveCrimeService.receiveCrimeList('crime','','',currentPageVal == 0? this.currentPage : currentPageVal,resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal).subscribe(
      (res) => {

        let result: any = res;
        this.receiveCrimeList = result;
        this.receiveCrimeFilteredList = result;
        console.log("this.receiveCrimeList: ", this.receiveCrimeList);
        this.numberOfPages = Math.ceil(this.receiveCrimeList.length / this.resultPerPage);

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

    this.receiveCrimeService.getCrimeImageVideoByIdList(this.reportId).subscribe(
      (res) => {

        let result: any = res;

        result.forEach((item, index)=>{
          const lastDotIndex = item.Image.lastIndexOf('.');
          if (lastDotIndex !== -1) {
            if(item.Image.slice(lastDotIndex + 1) != 'mp4' && item.Image.slice(lastDotIndex + 1) != 'avi' &&
            item.Image.slice(lastDotIndex + 1) != 'mkv' && item.Image.slice(lastDotIndex + 1) != 'mov' &&
            item.Image.slice(lastDotIndex + 1) != 'wmv' && item.Image.slice(lastDotIndex + 1) != 'flv'
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
    this.receiveCrimeFilteredList = this.receiveCrimeList.slice(this.thisPageFirstResult, this.resultPerPage * this.currentPage);
    this.numberOfPages = Math.ceil(this.receiveCrimeList.length / this.resultPerPage);
    // [0,1,2,3,4]
    this.numberOfPagesArr = Array(this.numberOfPages).fill(this.numberOfPages).map((x,i)=>i);

  }

  onMinusCurrentPage(): void {
    if(this.currentPage > 1) {

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


    if(this.currentPage != this.numberOfPages || this.numberOfPages == 1) {

      this.currentPage++;
      this.paginationUpdateList();

    }

  }

  showHideModal(modalTitle: string, showEdit: boolean, reportId: number = 0, status: string = ''): void {

    this.isModalShow = !this.isModalShow;
    this.modalTitle = modalTitle;
    this.showEdit = showEdit;

    this.reportId = reportId;
    let receivedCrimeFormValue = {

      status: status,

    }

    this.receivedCrimeForm.patchValue(receivedCrimeFormValue);

    this.getCrimeImageVideoByIdList();

  }

  updateCrimeStatus() {

    this.spinner.show();

    this.receiveCrimeService.updateCrimeStatusById(this.reportId,this.status?.value).subscribe(
      (res) => {

        let result: any = res;

        Swal.fire("Info", "Updated", "info");
        this.initialReceiveCrimeList(this.currentPage);
        this.spinner.hide();

      },
      (error) => {
        this.spinner.hide();
        console.log("error: ", error)
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );



  }

  get status() {

    return this.receivedCrimeForm.get('status');

  }

}
