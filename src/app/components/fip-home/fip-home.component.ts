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

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('FIP-HOME');
    })
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.eligibilityFlag = data.auth.eligibaleFlag;
        this.qualificationFlag = data.auth.qualifiationFlag;
        // console.log("FLAGS FROM FIP HOME:--", data.auth.eligibaleFlag)
      })
    )
  }

  goToRoute(route){
    this._router.navigate([route]);
  }

  ngOnDestroy(){
    this.Subscription.unsubscribe();
  }

}
