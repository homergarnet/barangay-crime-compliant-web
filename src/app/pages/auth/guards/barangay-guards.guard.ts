import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BarangayGuardsGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    const isAuthenticated = this.authService.isAuthenticated('barangay');

    if (isAuthenticated) {

      return true;

    }
    else {

    }

    this.router.navigate(['/auth/barangay-sign-in'], { queryParams: { redirectUrl: state.url } });

    return false;

  }

}
