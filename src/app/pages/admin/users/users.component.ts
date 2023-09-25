import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AdminUsersService } from 'src/app/services/admin-users.service';
import { passwordMatch } from 'src/validators/passwordMatch';
import { Router } from '@angular/router';
import { FormatterService } from 'src/app/services/formatter.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  isModalShow: boolean = false;
  modalTitle: string = '';

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

  imgDisplay: string | ArrayBuffer = environment.imgNoImageDisplay;
  imgDisplay2: string | ArrayBuffer = environment.imgNoImageDisplay;

  validIdFile: any;
  selfieIdFile: any;

  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1); // 1 to 31
  age: number = 0;

  months: any = [
    {
      Month: 'January',
      MonthNum: 1,
    },
    {
      Month: 'February',
      MonthNum: 2,
    },
    {
      Month: 'March',
      MonthNum: 3,
    },
    {
      Month: 'April',
      MonthNum: 4,
    },
    {
      Month: 'May',
      MonthNum: 5,
    },
    {
      Month: 'June',
      MonthNum: 6,
    },
    {
      Month: 'July',
      MonthNum: 7,
    },
    {
      Month: 'August',
      MonthNum: 8,
    },
    {
      Month: 'September',
      MonthNum: 9,
    },
    {
      Month: 'October',
      MonthNum: 10,
    },
    {
      Month: 'November',
      MonthNum: 11,
    },
    {
      Month: 'December',
      MonthNum: 12,
    },
  ];
  years: number[] = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  ); // Last 100 years

  @ViewChild('inputFile', { static: true }) inputFileVar: ElementRef;
  @ViewChild('inputFile2', { static: true }) inputFileVar2: ElementRef;

  createUserForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),

      middleName: new FormControl(''),

      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),

      birthMonth: new FormControl('', [Validators.required]),

      birthDay: new FormControl('', [Validators.required]),

      birthYear: new FormControl('', [Validators.required]),

      birthAge: new FormControl('', [Validators.required]),

      gender: new FormControl('', [Validators.required]),

      contactNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
      ]),

      validId: new FormControl('', [Validators.required]),

      selfieId: new FormControl('', [Validators.required]),

      residencyType: new FormControl('permanent', [Validators.required]),

      houseNo: new FormControl('', [Validators.required]),

      street: new FormControl('', [Validators.required]),

      village: new FormControl('', [Validators.required]),

      unitFloor: new FormControl('', [Validators.required]),

      building: new FormControl('', [Validators.required]),

      province: new FormControl('369', [Validators.required]),

      cityMunicipality: new FormControl('36913', [Validators.required]),

      barangay: new FormControl('', [Validators.required]),

      zipCode: new FormControl('2305', [Validators.required]),

      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),

      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),

      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    },
    [passwordMatch('password', 'confirmPassword')]
  );

  userForm: FormGroup = new FormGroup({
    firstNameSearch: new FormControl('', []),

    middleNameSearch: new FormControl('', []),

    lastNameSearch: new FormControl('', []),

    barangaySearch: new FormControl('', []),
  });

  constructor(
    private toastr: ToastrService,
    private adminUsersService: AdminUsersService,
    public formatterService: FormatterService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initialUserInfoList();
    this.initialGetBarangayNameList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue != '') {
      let regex = new RegExp(filterValue, 'i');
      this.userInfoListFilteredList = this.userInfoList.filter(
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
      this.userInfoListFilteredList = this.userInfoList;
    }
  }

  initialUserInfoList(
    currentPageVal: number = 1,
    resultPerPageVal: number = 10
  ) {
    this.spinner.show();

    this.adminUsersService
      .getAllPersonalInfo(
        this.keyword,
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;
          this.userInfoList = result;
          this.userInfoListFilteredList = result;
          console.log('this.userInfoList: ', this.userInfoList);
          this.numberOfPages = Math.ceil(
            this.userInfoList.length / this.resultPerPage
          );

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
        console.log('this.barangayList: ', this.barangayList);
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
    this.userInfoListFilteredList = this.userInfoList.slice(
      this.thisPageFirstResult,
      this.resultPerPage * this.currentPage
    );
    this.numberOfPages = Math.ceil(
      this.userInfoList.length / this.resultPerPage
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

  onChangeFirstNameField(): void {
    let userFormValue = {
      firstName: this.firstNameSearch?.value,
    };

    this.userForm.patchValue(userFormValue);
    this.keyword = this.firstNameSearch?.value;
    this.initialUserInfoList();
  }

  onChangeMiddleNameField(): void {
    let userFormValue = {
      middleName: this.middleNameSearch?.value,
    };

    this.userForm.patchValue(userFormValue);
    this.keyword = this.middleNameSearch?.value;
    this.initialUserInfoList();
  }

  onChangeLastNameField(): void {
    let userFormValue = {
      lastName: this.lastNameSearch?.value,
    };

    this.userForm.patchValue(userFormValue);
    this.keyword = this.lastNameSearch?.value;
    this.initialUserInfoList();
  }

  onChangeBarangayField(): void {
    let userFormValue = {
      barangay: this.barangaySearch?.value,
    };

    this.userForm.patchValue(userFormValue);
    this.keyword = this.barangaySearch?.value;
    this.initialUserInfoList();
  }

  showHideModal(modalTitle: string): void {
    this.isModalShow = !this.isModalShow;
    this.modalTitle = modalTitle;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgDisplay = e.target.result; // Display the selected image immediately
      };
      reader.readAsDataURL(file);

      this.validIdFile = event.target.files[0];
    } else {
      this.imgDisplay = environment.imgNoImageDisplay;
      this.validIdFile = null;
    }
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgDisplay2 = e.target.result; // Display the selected image immediately
      };

      reader.readAsDataURL(file);
      this.selfieIdFile = event.target.files[0];
    } else {
      this.imgDisplay2 = environment.imgNoImageDisplay;
      this.selfieIdFile = null;
    }
  }

  onSignUp(): void {
    if (this.createUserForm.valid) {
      this.spinner.show();
      this.adminUsersService
        .userRegistration(
          this.createUserForm.getRawValue(),
          this.validIdFile,
          this.selfieIdFile
        )
        .subscribe(
          (res) => {
            this.imgDisplay = environment.imgNoImageDisplay;
            this.imgDisplay2 = environment.imgNoImageDisplay;
            this.resetFields();
            this.toastr.success('Account Created Successfully', 'Success');
            // this.router.navigate(['/pages/auth/compliant-sign-in']);
            this.spinner.hide();
          },
          (error) => {
            if (error.error === 'User Already Exist') {
              this.toastr.error(error.error, 'Error');
            } else {
              this.toastr.error('Unavailable to use app', 'Error');
            }

            // if(error.error.err_msg == "User already exists.") {

            //   Swal.fire("Warning", "User already exist", "warning");

            // } else if(error.error.err_msg.indexOf("User already exists") !== -1) {

            //   Swal.fire("Warning", "Email already exist", "warning");

            // }

            this.spinner.hide();
          }
        );
    } else {
      this.toastr.error('re check all fields', 'Error');
      this.spinner.hide();
    }
  }

  resetFields() {
    this.inputFileVar.nativeElement.value = '';
    this.inputFileVar2.nativeElement.value = '';
    this.createUserForm.setValue({
      firstName: '',
      middleName: '',
      lastName: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      birthAge: '',
      gender: '',
      contactNumber: '',
      validId: '',
      selfieId: '',
      residencyType: '',
      houseNo: '',
      street: '',
      village: '',
      unitFloor: '',
      building: '',
      province: '',
      cityMunicipality: '',
      barangay: '',
      zipCode: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  }

  onChangeDayDateYear(): void {
    const birthDate: any = new Date(
      this.birthYear?.value,
      this.birthMonth?.value - 1,
      this.birthDay?.value
    );
    const currentDate: any = new Date();

    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / 3.15576e10);

    let createUserFormValue = {
      birthAge: ageInYears,
    };

    this.createUserForm.patchValue(createUserFormValue);
  }

  get firstNameSearch() {
    return this.userForm.get('firstNameSearch');
  }

  get middleNameSearch() {
    return this.userForm.get('middleNameSearch');
  }

  get lastNameSearch() {
    return this.userForm.get('lastNameSearch');
  }

  get barangaySearch() {
    return this.userForm.get('barangaySearch');
  }

  // For Create UserForm

  get firstName() {
    return this.createUserForm.get('firstName');
  }

  get middleName() {
    return this.createUserForm.get('middleName');
  }

  get lastName() {
    return this.createUserForm.get('lastName');
  }

  get birthMonth() {
    return this.createUserForm.get('birthMonth');
  }

  get birthDay() {
    return this.createUserForm.get('birthDay');
  }

  get birthYear() {
    return this.createUserForm.get('birthYear');
  }

  get birthAge() {
    return this.createUserForm.get('birthAge');
  }

  get gender() {
    return this.createUserForm.get('gender');
  }

  get contactNumber() {
    return this.createUserForm.get('contactNumber');
  }

  get validId() {
    return this.createUserForm.get('validId');
  }

  get selfieId() {
    return this.createUserForm.get('selfieId');
  }

  get residencyType() {
    return this.createUserForm.get('residencyType');
  }

  get houseNo() {
    return this.createUserForm.get('houseNo');
  }

  get street() {
    return this.createUserForm.get('street');
  }

  get village() {
    return this.createUserForm.get('village');
  }

  get unitFloor() {
    return this.createUserForm.get('unitFloor');
  }

  get building() {
    return this.createUserForm.get('building');
  }

  get province() {
    return this.createUserForm.get('province');
  }

  get cityMunicipality() {
    return this.createUserForm.get('cityMunicipality');
  }

  get barangay() {
    return this.createUserForm.get('barangay');
  }

  get zipCode() {
    return this.createUserForm.get('zipCode');
  }

  get email() {
    return this.createUserForm.get('email');
  }

  get username() {
    return this.createUserForm.get('username');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  //for confirmPassword
  getControl(name: any): AbstractControl | null {
    return this.createUserForm.get(name);
  }
}
