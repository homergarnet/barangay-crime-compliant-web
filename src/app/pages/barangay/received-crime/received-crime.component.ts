import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReceiveCrimeService } from 'src/app/services/receive-crime.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-received-crime',
  templateUrl: './received-crime.component.html',
  styleUrls: ['./received-crime.component.scss'],
})
export class ReceivedCrimeComponent implements OnInit {



  receiveCrimeList: any[] = [];
  receiveCrimeFilteredList: any[] = [];

  currentPage: number = 1;
  resultPerPage: number = 10;
  thisPageFirstResult: number = (this.currentPage - 1) * this.resultPerPage;
  numberOfPages: number = 0;
  numberOfPagesArr: any;

  isModalShow: boolean = false;
  modalTitle: string = '';

  showEdit: boolean = false;

  constructor(
    private toastr: ToastrService,
    private receiveCrimeService: ReceiveCrimeService,

    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {

    this.spinner.show();
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
    this.receiveCrimeService.receiveCrimeList('','',currentPageVal == 0? this.currentPage : currentPageVal,resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal).subscribe(
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

  showHideModal(modalTitle: string, showEdit: boolean): void {

    this.isModalShow = !this.isModalShow;
    this.modalTitle = modalTitle;
    this.showEdit = showEdit;
  }

}
