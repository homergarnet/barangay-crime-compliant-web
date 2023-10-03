import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatch } from 'src/validators/passwordMatch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  redirectUrl: any = '';
  email: string = '';
  token: string = '';
  resetPasswordForm: FormGroup = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ]),

      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(100),
      ]),
    },
    [passwordMatch('newPassword', 'confirmNewPassword')]
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.authService.redirectToPage('barangay');
    this.redirectUrl =
      this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') ||
      'barangay';
  }

  onUpdatePassword(): void {
    this.spinner.show();
    if (this.resetPasswordForm.valid) {
      this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
      this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
      this.authService
        .resetPassword(
          this.resetPasswordForm.get('newPassword')?.value,
          this.email,
          this.token
        )
        .subscribe(
          (res) => {
            let result: any = res;
            Swal.fire({
              title: 'Success',
              text: `Password has been updated`,
              icon: 'success',
              // showCancelButton: true,
              confirmButtonColor: '#3085d6',
              // cancelButtonColor: '#d33',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/auth/barangay-sign-in'], { queryParams: {} });
              }
            });
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
            this.toastr.error("the token expired you may now request new forgot password");
            console.log('error: ', error);
          }
        );
    } else {
      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: `check all validations`,
        icon: 'warning',
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }
  }

  //for newConfirmPassword
  getControl(name: any): AbstractControl | null {
    return this.resetPasswordForm.get(name);
  }
}
