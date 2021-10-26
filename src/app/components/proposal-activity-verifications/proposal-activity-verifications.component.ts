import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MobileService } from 'src/app/services/mobile.service';
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';

@Component({
  selector: 'app-proposal-activity-verifications',
  templateUrl: './proposal-activity-verifications.component.html',
  styleUrls: ['./proposal-activity-verifications.component.css']
})
export class ProposalActivityVerificationsComponent implements OnInit {

  selectedProjectId: any = null;
  projectImpPlan: any = null;
  allVerifications: any = [];
  apiLoading: boolean = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mobileService: MobileService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      this.getActivityDetails();
    });
    this._primaryAppraisalFormsStore.state$.subscribe(result => {
      this.projectImpPlan = typeof (result.selectedProject.implementationPlan) === 'string' ? JSON.parse(result.selectedProject.implementationPlan)
        : result.selectedProject.implementationPlan;
      console.log("************************PROPOSAL IMPLEMENTATION PAN IS************************:--", this.projectImpPlan);

    })
  }

  getActivityDetails() {
    this.apiLoading = true;
    this._mobileService.getActivitiesForProposal(this.selectedProjectId).subscribe(
      result => {
        this.apiLoading = false;
        console.log("************************data from API************************:--", result);
        this.allVerifications = result;
      },
      error => {
        this.apiLoading = false;
        console.log("************************data from verifications API************************:--", error);
      }
    );
  }

  getActivityName(activityId) {
    // console.log("ACTIVTY ID CALLED:--");
    for (let i = 0; i < this.projectImpPlan.costs.length; i++) {
      let x = this.projectImpPlan.costs[i];
      if (x._id === activityId) {
        return x.title;
      }
    }
  }

}
