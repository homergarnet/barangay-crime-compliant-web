import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,

  ) {}

  ngOnInit(): void {

  }

  downloadApk(): void {
    // this.spinner.show();

    window.open(
      'https://hellokitty2-001-site1.etempurl.com/Test/api/download',
      '_blank'
    );
    // this.authService.downloadApk().subscribe(
    //   (res) => {

    //     this.spinner.hide();
    //   },
    //   (error) => {
    //     this.spinner.hide();
    //     // Swal.fire('Warning', 'Something went wrong', 'warning');
    //   }
    // );
  }
}
