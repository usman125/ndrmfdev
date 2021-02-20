import { Component, OnInit, Output } from '@angular/core';
import { QprService } from '../../services/qpr.service';
import { ActivatedRoute } from '@angular/router';
import { QprSectionsStore } from 'src/app/stores/qpr-sections/qpr-sections-store';
import { ProjectService } from 'src/app/services/project.service';
import { QprStore } from 'src/app/stores/qpr/qpr-store';
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { AuthStore } from 'src/app/stores/auth/auth-store';

@Component({
  selector: 'app-fill-qpr',
  templateUrl: './fill-qpr.component.html',
  styleUrls: ['./fill-qpr.component.css']
})
export class FillQprComponent implements OnInit {

  loggedUser: any = null;
  apiLoading: boolean = false;

  selectedRequestId: any = null;
  selectedRequest: any = null;

  selectedProjectId: any = null;
  selectedProject: any = null;

  implementationPlan: any = null;

  quarterNdrmfArray: any = [];
  quarterFipArray: any = [];

  @Output() ndrmfShare = 0;
  @Output() fipShare = 0;
  @Output() quarter: any = 0;

  constructor(
    private _qprService: QprService,
    private _activatedRoute: ActivatedRoute,
    private _qprSectionsStore: QprSectionsStore,
    private _projectService: ProjectService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _qprStore: QprStore,
    private _authStore: AuthStore,
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
      this.getSingleQprRequests();
      // this.selectedProjectId = params.get("projectId");
      // this.getSingleProposalRequest();
    });
  }

  getSingleQprRequests() {
    this._qprService.getSingleQPR(this.selectedRequestId).subscribe(
      (result: any) => {
        console.log("RESULT SINGLE REQUEST:---", result);
        this.selectedRequest = result;
        this.quarter = this.selectedRequest.quarter;
        this._authStore.setCurrentQuarter(this.quarter);
        this._qprSectionsStore.addAllSections(result.sections);
        this._primaryAppraisalFormsStore.addSelectedProject({
          id: result.proposalRef,
          implementationPlan: JSON.parse(result.implementationPlan)
        });
      },
      error => {
        console.log("RESULT SINGLE REQUEST:---", error);
      }
    );
  }

  // getSingleProposalRequest() {
  //   this._projectService.getSingleProject("4da6a693-beac-46fa-b2ec-b5c7a9a50cfa").subscribe(
  //     (result: any) => {
  //       // this._qprSectionsStore.addAllSections(result.sections);
  //       this.implementationPlan = JSON.parse(result.implementationPlan);
  //       var quarter = this.selectedRequest.quarter * 3 - 1;
  //       this.getQuartersShare(quarter);
  //       console.log("RESULT SINGLE PROJECT:---", this.implementationPlan, quarter);
  //     },
  //     error => {
  //       console.log("RESULT SINGLE PROJECT:---", error);
  //     }
  //   );
  // }

  getQuartersShare(quarter) {
    this.quarterNdrmfArray = [];
    this.quarterNdrmfArray = [];
    this.quarterFipArray = [];

    let ndrmfShare = 0;
    let fipShare = 0;

    for (let i = 0; i < this.implementationPlan.length; i++) {
      let newFinancers = [];
      for (let j = quarter - 2; j <= quarter; j++) {
        newFinancers.push(this.implementationPlan[i].financers[j]);
        for (let k = 0; k < this.implementationPlan[i].financers[j].financers.length; k++) {
          if (this.implementationPlan[i].financers[j].financers[k].title === 'ndrmf') {
            this.implementationPlan[i].financers[j].financers[k].costTitle = this.implementationPlan[i].title;
            ndrmfShare = ndrmfShare + this.implementationPlan[i].financers[j].financers[k].cost;
            this.quarterNdrmfArray.push(this.implementationPlan[i].financers[j].financers[k]);
          } else {
            this.implementationPlan[i].financers[j].financers[k].costTitle = this.implementationPlan[i].title;
            fipShare = fipShare + this.implementationPlan[i].financers[j].financers[k].cost;
            this.quarterFipArray.push(this.implementationPlan[i].financers[j].financers[k]);
          }
        }
        this.ndrmfShare = ndrmfShare;
        this.fipShare = fipShare;
      }
      console.log("FILETERED ARRAY:---", newFinancers, this.implementationPlan[i].title, ndrmfShare, fipShare);
    }
    this._qprStore.setDefaults(this.quarter, this.ndrmfShare, this.fipShare);
    console.log(
      "FILETERED ARRAY FIP:---\n",
      this.quarterFipArray,
      "\nNDRMF ARRAY:--", this.quarterNdrmfArray,
      this.ndrmfShare,
      this.fipShare
    );
  }

}
