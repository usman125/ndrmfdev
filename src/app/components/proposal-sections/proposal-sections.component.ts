import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { AuthStore } from "../../stores/auth/auth-store";
import { Subscription } from "rxjs";
import { SettingsService } from "../../services/settings.service";
import { setThematicAreaValue } from "../../stores/proposal-forms/proposal-forms-replay";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';

@Component({
  selector: 'app-proposal-sections',
  templateUrl: './proposal-sections.component.html',
  styleUrls: ['./proposal-sections.component.css'],
  providers: [ConfirmModelService]
})
export class ProposalSectionsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  areaName: any = null;
  apiLoading: boolean = false;


  constructor(
    private _proposalFormsStore: ProposalFormsStore,
    private _authStore: AuthStore,
    private _settingsService: SettingsService,
    private _confirmModelService: ConfirmModelService,
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
    const options = {
      title: 'Thematic area added!',
      message: 'OK to exit',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    // this._router.navigate(['add-proposal-section']);
    this._authStore.setLoading();
    this._settingsService.addThematicArea({ name: this.areaName, processOwnerId: null }).subscribe(
      (result: any) => {
        console.log("ADDED SUCCEFULLY:--", result);
        this._proposalFormsStore.addProposalForm(result.id, result.name, result.enabled, result.processOwner);
        this.areaName = null;
        this._authStore.removeLoading();
        // options.title = result.message;
        this._confirmModelService.open(options);
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR ADDING:--", error);
        options.title = error.error.message;
        this._confirmModelService.open(options);
      }
    );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
