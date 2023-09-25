import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ReceiveCrimeService } from 'src/app/services/receive-crime.service';
import Swal from 'sweetalert2';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  // { path: '/admin', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  accountType: string = '';
  routesObj: any = {};
  public menuItems: any[];
  public isCollapsed = true;
  adminType: any;

  crimeCount: number;
  compliantCount: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private receiveCrimeService: ReceiveCrimeService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    ROUTES = [];
    this.authService.loginTypeSubject$.subscribe((res) => {
      this.accountType = res;
    });

    this.adminType = this.authService.getAdminDecodedToken().UserType;
    if (this.accountType == 'admin' || this.accountType == 'police') {
      this.routesObj = {
        path: '/admin',
        title: 'Dashboard',
        icon: 'ni-tv-2 text-primary',
        class: '',
      };
    } else {
      this.routesObj = {
        path: '/barangay',
        title: 'Dashboard',
        icon: 'ni-tv-2 text-primary',
        class: '',
      };
    }

    ROUTES.push(this.routesObj);

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

    this.receiveCrimeService.manageCrimeCount('crime').subscribe(
      (res) => {
        let result: any = res;
        this.crimeCount = result;
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );

    this.receiveCrimeService.manageCrimeCount('compliant').subscribe(
      (res) => {
        let result: any = res;
        this.compliantCount = result;
      },
      (error) => {
        this.spinner.hide();
        Swal.fire('Warning', 'Something went wrong', 'warning');
      }
    );
  }

  onLogout() {
    this.authService.logout(this.accountType);
  }
}
