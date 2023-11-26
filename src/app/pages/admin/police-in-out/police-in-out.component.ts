import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PoliceInOutService } from 'src/app/services/police-in-out.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-police-in-out',
  templateUrl: './police-in-out.component.html',
  styleUrls: ['./police-in-out.component.scss']
})
export class PoliceInOutComponent implements OnInit {
  policeInOutList: any[] = [];
  policeInOutFilteredList: any[] = [];
  barangayList: any[] = [];

  currentPage: number = 1;
  resultPerPage: number = 10;
  thisPageFirstResult: number = (this.currentPage - 1) * this.resultPerPage;
  numberOfPages: number = 0;
  numberOfPagesArr: any;
  keyword: string = '';

  policeInOutForm: FormGroup = new FormGroup({
    search: new FormControl('', []),

  });
  constructor(
    private toastr: ToastrService,
    private policeInOutService: PoliceInOutService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initialPoliceInOutList();
  }

  initialPoliceInOutList(
    currentPageVal: number = 1,
    resultPerPageVal: number = 10
  ) {
    this.spinner.show();

    this.policeInOutService
      .getPoliceInOut(
        this.keyword,
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;
          this.policeInOutList = result;
          this.policeInOutFilteredList = result;
          console.log('this.policeInOutList: ', this.policeInOutList);
          this.numberOfPages = Math.ceil(
            this.policeInOutList.length / this.resultPerPage
          );

          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire('Warning', 'Something went wrong', 'warning');
        }
      );
  }

  async paginationUpdateList() {
    const firstData = await this.initialPoliceInOutList(this.currentPage);

    this.thisPageFirstResult = (this.currentPage - 1) * this.resultPerPage;
    this.policeInOutFilteredList = this.policeInOutList.slice(
      this.thisPageFirstResult,
      this.resultPerPage * this.currentPage
    );
    this.numberOfPages = Math.ceil(
      this.policeInOutList.length / this.resultPerPage
    );
    // [0,1,2,3,4]
    this.numberOfPagesArr = Array(this.numberOfPages)
      .fill(this.numberOfPages)
      .map((x, i) => i);
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

  onChangeSearchField(): void {
    let policeInOutFormValue = {
      search: this.search?.value,
    };

    this.policeInOutForm.patchValue(policeInOutFormValue);
    this.keyword = this.search?.value;
    this.initialPoliceInOutList();
  }

  get search() {
    return this.policeInOutForm.get('search');
  }

}
