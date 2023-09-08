import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

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
    this.authService.redirectToPage('compliant');
    this.redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectUrl') || 'compliant';
  }

  sampleLogin(): void {

    this.spinner.show();
    this.authService.getAccessToken(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value, "compliant").subscribe(res => {

      let result: any = res;
      this.authService.setSession(result, 'compliant');

      this.router.navigateByUrl(this.redirectUrl);
      this.spinner.hide();

    }, error => {

      this.spinner.hide();
      this.toastr.error('user name or password is wrong');
      // console.log("error: ", error);

    });
  }

}
