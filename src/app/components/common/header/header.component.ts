import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from "../../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { OverlayContainer } from "@angular/cdk/overlay";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition('void => *', [
        animate(4000)
      ])
    ]),
  ]
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private Subscription: Subscription = new Subscription();
  public loggedUser: any = null;
  routeName: string = '';
  themeName: string = '';
  checked: boolean = false;
  sideNavMode: boolean = false;

  favoriteSeason: { name: string, key: string, active: boolean };
  seasons: { name: string, key: string, active: boolean }[] = [
    { name: 'Blue & Pink', key: 'material-base-theme', active: true },
    { name: 'Blue & Green', key: 'unicorn-light-theme', active: false },
    { name: 'Light Blue & Green', key: 'unicorn-dark-theme', active: false },
  ];

  themeInputForm: FormGroup;

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) {
    this.themeInputForm = this._formBuilder.group({
      theme: ['']
    });
    this.themeInputForm.patchValue({ theme: 'material-base-theme' }, { onlySelf: true })
  }


  ngOnInit() {
    this.Subscription.add(
      this._authStore.state$.subscribe((auth) => {
        this.routeName = auth.auth.routeName;
        this.checked = auth.auth.checked;
        this.sideNavMode = auth.auth.sideNavMode;
        setTimeout(() => {
          this.themeName = auth.auth.checkedThemeName;
        })
      })
    );
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  toggleSideNav() {
    this._authStore.toogleSideNav();
  }

  toggleDarkTheme(checked) {
    // console.log("TOGGLE VALUE:--", checked);
    // this.checked = checked;
    this._authStore.toggleTheme();
    // if (checked){
    //   this._overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    // }
  }

  radioChange($event) {
    console.log("RADIO CHANGED:--", $event);
    // this._authStore.toggleTheme();
    this._authStore.setThemeName($event.value);
  }

  goToRoute(route) {
    this._router.navigate(['/' + route]);
  }


  logOut() {
    localStorage.removeItem('user');
    this._authStore.setLoginState(false);
    this._authStore.setEligibleFlag(false);
    this._router.navigate(['/login']);
  }


  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
