import { Component, OnInit } from '@angular/core';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver-home',
  templateUrl: './approver-home.component.html',
  styleUrls: ['./approver-home.component.css']
})
export class ApproverHomeComponent implements OnInit {

  pendingSignUpsCount: any = null;
  apiLoading: boolean = false;
  Subscription: Subscription = new Subscription();

  constructor(
    private _router: Router,
    private _authStore: AuthStore,
    private _settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    );
    this.pendingSignUps();
  }

  pendingSignUps() {
    this._authStore.setLoading();
    this._settingsService.getPendingSignups().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        console.log("PENDING SIGNUPS:--", result);
        this.pendingSignUpsCount = result.length;
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR PENDING SIGNUPS:--", error);
      }
    );
  }

  goToRoute(route) {
    this._router.navigate([route]);
  }

}
