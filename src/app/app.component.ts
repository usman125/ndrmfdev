import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import {
  Router
} from '@angular/router';
import { Subscription } from "rxjs";
import { AuthStore } from "../app/stores/auth/auth-store";
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'survey-manager';
  loggedUser: boolean = false;
  loggedUserRole: any = null;
  sideNavMode: boolean = false;
  private subscriptions: Subscription = new Subscription();
  // private subscriptions2: Subscription = new Subscription();

  currentUser: any = null;
  appRouteName: any = null;
  userEligibleStatus: boolean;
  userQualificationStatus: boolean;
  appRouteActive: any = null;
  themeName: any = null;
  checked: boolean = false;

  addMobileClasses: boolean = false;

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
    public breakpointObserver: BreakpointObserver,
    private _overlayContainer: OverlayContainer,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser) {
      this._authStore.setLoginState(true);
      this._authStore.setEligibleFlag(this.currentUser.eligibileFlag);
    }
  }

  ngOnInit() {
    // console.log("APP COMPONENT");
    this._authStore.setThemeName('material-base-theme');
    if (this.currentUser) {
      this._authStore.setUserRole(this.currentUser.role);
      this.subscriptions.add(
        this._authStore.state$.subscribe((auth) => {
          this.loggedUser = auth.auth.loggedUser;
          this.sideNavMode = auth.auth.sideNavMode;
          this.loggedUserRole = auth.auth.userRole;
          this.appRouteName = auth.auth.routeName;
          this.userEligibleStatus = auth.auth.eligibaleFlag;
          this.userQualificationStatus = auth.auth.qualifiationFlag;
          this.checked = auth.auth.checked;
          this.themeName = auth.auth.checkedThemeName;
          this.addMobileClasses = auth.auth.applyMobileClasses;
          if (this.themeName === 'unicorn-dark-theme') {
            this._overlayContainer.getContainerElement().classList.remove('unicorn-light-theme');
            this._overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
          } else if (this.themeName === 'unicorn-light-theme') {
            this._overlayContainer.getContainerElement().classList.add('unicorn-light-theme');
            this._overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
          } else if (this.themeName === 'material-base-theme') {
            this._overlayContainer.getContainerElement().classList.remove('unicorn-light-theme');
            this._overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
          }
        })
      );
    } else {
      this._authStore.setLoginState(false);
      this.subscriptions.add(
        this._authStore.state$.subscribe((auth) => {
          this.loggedUser = auth.auth.loggedUser;
        })
      );
      this._authStore.setRouteName('Login');
      this._router.navigate(['login']);
    }

    this.breakpointObserver
      .observe(['(max-width: 994px)', '(min-width: 995px)', '(max-width: 699px)', '(min-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints['(max-width: 994px)'] === true) {
          this._authStore.closeSideNav();
          this._authStore.closeSiteLayoutSideNav();
        }
        if (state.breakpoints['(min-width: 995px)'] === true) {
          this._authStore.openSideNav();
          this._authStore.openSiteLayoutSideNav();
        }
        if (state.breakpoints['(max-width: 699px)'] === true) {
          console.log("LESS THAN 699:--");
          this._authStore.addMobileClass();
        }
        if (state.breakpoints['(min-width: 700px)'] === true) {
          console.log("> THAN 699:--");
          this._authStore.removeMobileClass();
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth <= 995) {
  //     this._authStore.closeSideNav();
  //     this._authStore.closeSiteLayoutSideNav();
  //   }
  //   if (event.target.innerWidth >= 996) {
  //     this._authStore.openSideNav();
  //     this._authStore.openSiteLayoutSideNav();
  //   }
  //   if (event.target.innerWidth < 699) {
  //     console.log("LESS THAN 699:--");
  //     this._authStore.addMobileClass();
  //   }
  //   if (event.target.innerWidth > 699) {
  //     console.log("> THAN 699:--");
  //     this._authStore.removeMobileClass();
  //   }
  // }
}