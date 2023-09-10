import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  fullName: string = '';
  constructor(location: Location,  private element: ElementRef, private router: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService,

    ) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getCurrentUserPersonalInfo();
  }

  getCurrentUserPersonalInfo(): void {
    this.spinner.show();

    this.authService.getCurrentUserPersonalInfo().subscribe(
      (res) => {

        let result: any = res;
        this.fullName = result.FirstName + " " + result.LastName;

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  onBarangayLogout() {
    this.authService.logout('barangay');
  }



}
