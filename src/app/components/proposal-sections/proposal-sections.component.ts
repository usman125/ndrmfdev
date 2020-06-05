import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { SettingsService } from "../../services/settings.service";
import { setThematicAreaValue } from "../../stores/proposal-forms/proposal-forms-replay";

@Component({
  selector: 'app-proposal-sections',
  templateUrl: './proposal-sections.component.html',
  styleUrls: ['./proposal-sections.component.css']
})
export class ProposalSectionsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  areaName: any = null;
  apiLoading: boolean = false;


  constructor(
    private _proposalFormsStore: ProposalFormsStore,
    private _authStore: AuthStore,
    private _settingsService: SettingsService,
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this._authStore.setRouteName('PROPOSAL-SECTIONS');
    })
    this.Subscription.add(
      this._authStore.state$.subscribe((data) => {
        this.apiLoading = data.auth.apiCall;
      })
    );

  }

  editSection(section) {

  }

  goToAdd() {
    // this._router.navigate(['add-proposal-section']);
    this._authStore.setLoading();
    this._settingsService.addThematicArea({ name: this.areaName, processOwnerId: null }).subscribe(
      (result: any) => {
        console.log("ADDED SUCCEFULLY:--", result);
        this._proposalFormsStore.addProposalForm(result.id, result.name, result.enabled, result.processOwner);
        this.areaName = null;
        this._authStore.removeLoading();
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR ADDING:--", error);
      }
    );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
