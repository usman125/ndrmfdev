import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { AuthStore } from "../../../../stores/auth/auth-store";
import { Subscription } from "rxjs";

@Component({
  selector: 'site-layout',
  providers: [FormBuilder],
  templateUrl: 'sitelayout.html',
  styleUrls: ['sitelayout.css']
})

export class SiteLayout {

  opened: boolean = false;
  Subscription: Subscription = new Subscription();

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authStore: AuthStore,
  ) {
    this._authStore.toogleSideNav();
  }

  ngOnInit() {
    var self = this;
    // console.log("SITE LAYOUT STARTED")
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.opened = data.auth.opened;
      })
    );
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   // .main-block {
  //   //   width: 50%;
  //   // }

  //   // .intimation-block {
  //   //   width: 20%;
  //   // }
  //   if (event.target.innerWidth <= 995) {
  //     // this.navMode = 'over';
  //     // this.sidenav.close();
  //     console.log("LESS THEN 886", event.target.innerWidth)
  //     // document.getElementById('get-main-block').style.width = '50%';
  //     // document.getElementById('get-intimation-block').style.width = '20%';
  //     this._authStore.closeSiteLayoutSideNav();
  //   }
  //   if (event.target.innerWidth >= 996) {
  //     console.log("GREATER 886", event.target.innerWidth)
  //     this._authStore.openSiteLayoutSideNav();
  //     //  this.navMode = 'side';
  //     //  this.sidenav.open();
  //   }
  //   // if 

  // }

}