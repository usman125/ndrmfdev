import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { AuthStore } from "../../stores/auth/auth-store";

@Component({
  selector: 'app-fip-home',
  templateUrl: './fip-home.component.html',
  styleUrls: ['./fip-home.component.css']
})
export class FipHomeComponent implements OnInit, OnDestroy {

  eligibilityFlag: string;
  qualificationFlag: string;
  Subscription: Subscription = new Subscription();

  loggedUser: any = null;
  orgName: any = null;

  accredited: boolean = false;
  canInitiate: boolean = false;

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    console.log(this.loggedUser);
    setTimeout(() => {
      this._authStore.setRouteName('FIP-HOME');
    })
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.eligibilityFlag = data.auth.eligibaleFlag;
        this.qualificationFlag = data.auth.qualifiationFlag;
        this.accredited = data.auth.accredited;
        this.canInitiate = data.auth.canInitiate;
        this.orgName = data.auth.orgName;
        // console.log("FLAGS FROM FIP HOME:--", data.auth.eligibaleFlag)
      })
    );
    // window.location.reload();
    this.reloadPage();
  }

  reloadPage() {
    // var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    // // Current Time //
    // var now = Date.now();
    // // Total Process Lenght as Minutes //
    // var tenSec = 10 * 1000;
    // // End Time of Process //
    // var plusTenSec = currentDocumentTimestamp + tenSec;
    // if (now > plusTenSec) {
    //   location.reload();
    // }
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      }
      else
        localStorage.removeItem('firstLoad');
    }
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
