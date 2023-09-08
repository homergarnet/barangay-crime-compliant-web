import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.scss']
})
export class AdminSignInComponent implements OnInit {

  redirectUrl: any = '';
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });


  constructor(

    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.authService.redirectToPage('admin');
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || 'admin';
  }

  sampleLogin(): void {

    this.spinner.show();
    this.authService.getAccessToken(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value, "admin").subscribe(res => {

      let result: any = res;
      this.authService.setSession(result, 'admin');

      this.router.navigateByUrl(this.redirectUrl);
      this.spinner.hide();

    }, error => {

      this.spinner.hide();
      this.toastr.error('user name or password is wrong');
      // console.log("error: ", error);

    });
  }

}
