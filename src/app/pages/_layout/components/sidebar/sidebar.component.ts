import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
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
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  accountType: string = '';
  routesObj: any = {};
  public menuItems: any[];
  public isCollapsed = true;
  adminType: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit() {

    this.authService.loginTypeSubject$.subscribe(res => {

      this.accountType = res;

    })

    this.adminType = this.authService.getAdminDecodedToken().UserType;
    if(this.accountType == 'admin') {
      this.routesObj = {
        path: '/admin',
        title: 'Dashboard',
        icon: 'ni-tv-2 text-primary',
        class: ''
      };
    } else {
      this.routesObj = {
        path: '/barangay',
        title: 'Dashboard',
        icon: 'ni-tv-2 text-primary',
        class: ''
      };
    }

    ROUTES.push(this.routesObj);



    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
