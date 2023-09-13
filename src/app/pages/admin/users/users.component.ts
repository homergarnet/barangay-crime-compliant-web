import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AdminUsersService } from 'src/app/services/admin-users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userInfoList: any[] = [];
  userInfoListFilteredList: any[] = [];
  barangayList: any[] = [];

  currentPage: number = 1;
  resultPerPage: number = 10;
  thisPageFirstResult: number = (this.currentPage - 1) * this.resultPerPage;
  numberOfPages: number = 0;
  numberOfPagesArr: any;

  API_URL: string = environment.apiUrl;
  keyword: string = '';
  userForm: FormGroup = new FormGroup({



    firstName: new FormControl('', [

    ]),

    middleName: new FormControl('', [

    ]),

    lastName: new FormControl('', [

    ]),

    barangay: new FormControl('', [

    ]),

  });

  constructor(
    private toastr: ToastrService,
    private adminUsersService: AdminUsersService,

    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {

    this.initialUserInfoList();
    this.initialGetBarangayNameList();

  }

    applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;



    if(filterValue != '') {
      let regex = new RegExp( filterValue, 'i');
      this.userInfoListFilteredList = this.userInfoList.filter((item: any) =>
        regex.test(item.ReportIdStr) || regex.test(this.datePipe.transform(item.Date, 'yyyy-MM-dd')) ||
        regex.test(item.Date) || regex.test(item.ReporterName) || regex.test(item.Category) ||
        regex.test(item.Description) || regex.test(item.Status)
      );
    } else {
      this.userInfoListFilteredList = this.userInfoList;
    }


  }

  initialUserInfoList(currentPageVal: number = 1, resultPerPageVal: number = 10) {

    this.spinner.show();

    this.adminUsersService.getAllPersonalInfo(this.keyword,currentPageVal == 0? this.currentPage : currentPageVal,resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal).subscribe(
      (res) => {

        let result: any = res;
        this.userInfoList = result;
        this.userInfoListFilteredList = result;
        console.log("this.userInfoList: ", this.userInfoList);
        this.numberOfPages = Math.ceil(this.userInfoList.length / this.resultPerPage);

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );

  }

  initialGetBarangayNameList(): void {

    this.spinner.show();

    this.adminUsersService.getAllBarangayList('36913', 1, 100).subscribe(
      (res) => {

        let result: any = res;
        this.barangayList = result;
        console.log("this.barangayList: ", this.barangayList);
        this.spinner.hide();

      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );

  }



  async paginationUpdateList() {

    const firstData = await this.initialUserInfoList(this.currentPage);

    this.thisPageFirstResult = (this.currentPage - 1) * this.resultPerPage;
    this.userInfoListFilteredList = this.userInfoList.slice(this.thisPageFirstResult, this.resultPerPage * this.currentPage);
    this.numberOfPages = Math.ceil(this.userInfoList.length / this.resultPerPage);
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

  onChangeFirstNameField(): void {

    let userFormValue = {

      firstName: this.firstName?.value,

    }

    this.userForm.patchValue(userFormValue);
    this.keyword = this.firstName?.value;
    this.initialUserInfoList();

  }

  onChangeMiddleNameField(): void {

    let userFormValue = {

      middleName: this.middleName?.value,

    }

    this.userForm.patchValue(userFormValue);
    this.keyword = this.middleName?.value;
    this.initialUserInfoList();

  }

  onChangeLastNameField(): void {

    let userFormValue = {

      lastName: this.lastName?.value,

    }

    this.userForm.patchValue(userFormValue);
    this.keyword = this.lastName?.value;
    this.initialUserInfoList();

  }

  onChangeBarangayField(): void {
    let userFormValue = {

      barangay: this.barangay?.value,

    }

    this.userForm.patchValue(userFormValue);
    this.keyword = this.barangay?.value;
    this.initialUserInfoList();

  }

  get firstName() {

    return this.userForm.get('firstName');

  }

  get middleName() {

    return this.userForm.get('middleName');

  }

  get lastName() {

    return this.userForm.get('lastName');

  }

  get barangay() {

    return this.userForm.get('barangay');

  }

}
