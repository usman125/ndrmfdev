import { Injectable } from '@angular/core';
import {
  Router, CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthStore } from '../stores/auth/auth-store';
// import { AuthStore } from "../stores/auth/auth-store";


@Injectable()
export class AuthGuard implements CanActivate {

  userEligibleStatus: boolean;

  constructor(
    private _authService: LoginService,
    private _router: Router,
    private _authStore: AuthStore,
  ) {
    this._authStore.state$.subscribe((auth) => {
      this.userEligibleStatus = auth.auth.eligibaleFlag;
    })
    // this._authStore.state$
  }

  // canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
  //   if (this._authService.loggedIn()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (this._authService.loggedIn()) {
      // if (state.url === '/fip-qualification') {
        // if (!this.userEligibleStatus && currentUser.role === 'sme') {
        //   this._router.navigate(['fip-eligibility']);
        // }
      //   this._router.navigate(['fip-qualification']);
      // }
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
      return true;
    }
  }
}
