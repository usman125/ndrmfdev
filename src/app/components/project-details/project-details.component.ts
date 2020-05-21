import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { ProposalRequestsStore } from "../../stores/proposal-requests/proposal-requests-store";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { setCurrentProject, currentProjectReplay } from "../../stores/projects/project-replay";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ConfirmModelService],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();
  proposalSections: any = [];
  proposalForms: any = [];
  proposalRequests: any = [];
  groupType: any = null;
  costTabsType: any = null;
  loggedUser: any = null;
  form: any = null;
  formSubmitData: any = null;
  selectedProject: any = null;
  selectedProjectId: any = null;
  sub: any = null;
  costSections = [
    {
      name: "Project Implementation Plan",
      key: 'pip'
    },
    {
      name: "Result Framework",
      key: 'rf'
    },
  ]

  @Output() show: any = null;
  @Input() showFillApprasialBtn: boolean = true;
  @Input() viewType: string = 'user';
  @Output() viewType2: string = 'view';
  // @Output() preAppViewType: string = 'view';

  apiLoading: boolean = false;



  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _proposalFormsStore: ProposalFormsStore,
    private _proposalRequestsStore: ProposalRequestsStore,
    private _projectsStore: ProjectsStore,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
  ) {

  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      // const project = this._projectsStore.getProject(this.selectedProjectId);
      // setCurrentProject(
      //   project.name,
      //   project.type,
      //   project.status,
      //   project.userRef,
      //   project.key,
      //   project.primaryAppraisalStatus,
      //   project.primaryAppraisalStartDate,
      //   project.primaryAppraisalEndDate,
      //   project.extendedAppraisalStatus,
      //   project.extendedAppraisalExpiry,
      // );
      this._projectService.getSingleProject(this.selectedProjectId).subscribe(
        (result: any) => {
          this.selectedProject = result;
          console.log("PROJECT DETAILS FROM DATABASE:--", this.selectedProject);
          let proposalSections = result.sections.map(c => {
            return {
              ...c,
              template: c.template ? JSON.parse(c.template) : null,
            }
          })
          this._proposalSectionsStore.addAllSections(proposalSections);
          this.apiLoading = false;
        },
        error => {
          this.apiLoading = false;
          console.log("ERROR DETAILS FROM DATABASE:--", error);
        },
      );
    });
    // currentProjectReplay.subscribe((data) => {
    //   this.selectedProject = data;
    // });

    this.Subscription.add(
      this._proposalSectionsStore.state$.subscribe(data => {
        this.proposalSections = data.sections;
        console.log("PROPOSAL SECTION FROM STORE:---", this.proposalSections);
        if (this.proposalSections.length){
          this.groupType = this.proposalSections[0];
          this.tabChanged(this.groupType);
        }
        // this.groupType = this.proposalSections[0].name;
      })
    );
    // this.Subscription.add(
    //   this._proposalFormsStore.state$.subscribe(data => {
    //     this.proposalForms = data.forms;
    //     console.log("PROPOSAL FORMS:---", this.proposalForms);
    //     // this.groupType = this.proposalSections[0].name;
    //   })
    // );
    // this.Subscription.add(
    //   this._proposalRequestsStore.state$.subscribe(data => {
    //     this.proposalRequests = data.proposals;
    //     console.log("PROPOSAL Requests:---", this.proposalRequests);
    //   })
    // );
    // this.Subscription.add(
    //   this._proposalSectionsStore.state$.subscribe(data => {
    //     // this.proposalSections = data.sections;
    //     var dummySections = [];
    //     if (data.sections) {
    //       for (let i = 0; i < data.sections.length; i++) {
    //         var object = {
    //           formGenerated: data.sections[i].formGenerated,
    //           key: data.sections[i].key,
    //           name: data.sections[i].name,
    //           userRef: data.sections[i].userRef,
    //           form: null,
    //         }
    //         dummySections.push(object);
    //       }
    //     }
    //     this.proposalSections = dummySections;
    //     if (this.proposalSections.length) {
    //       this.groupType = this.proposalSections[0].key;
    //       for (let i = 0; i < this.proposalForms.length; i++) {
    //         if (this.proposalForms[i].smeRef === this.proposalSections[0].key) {
    //           this.proposalSections[0].form = this.proposalForms[i];
    //           this.form = this.proposalForms[i];
    //         }
    //       }
    //       if (this.loggedUser.role === 'fip') {

    //         for (let i = 0; i < this.proposalRequests.length; i++) {
    //           if (this.proposalRequests[i].formIdentity === this.proposalSections[0].key &&
    //             this.loggedUser.username === this.proposalRequests[i].userRef &&
    //             this.proposalRequests[i].projectRef === this.selectedProjectId
    //           ) {
    //             this.formSubmitData = this.proposalRequests[i].formSubmitData;
    //           }
    //         }
    //       } else {

    //         for (let i = 0; i < this.proposalRequests.length; i++) {
    //           if (this.proposalRequests[i].formIdentity === this.proposalSections[0].key &&
    //             this.selectedProject.userRef === this.proposalRequests[i].userRef &&
    //             this.proposalRequests[i].projectRef === this.selectedProjectId
    //           ) {
    //             this.formSubmitData = this.proposalRequests[i].formSubmitData;
    //           }
    //         }

    //       }
    //     }
    //     console.log("PROPOSALS:---", this.proposalSections);
    //   })
    // );
    // currentProjectReplay.subscribe(data => {
    //   this.selectedProject = data;
    //   console.log("SELECTED PROJECT:---", this.selectedProject)
    // });
  }

  getSelectedValues(item) {
    return item;
  }


  costTabChanged(item) {
    console.log("COST TAB CHANGED:--", item);
    this.show = item.key
  }

  tabChanged($event) {
    this.form = this.groupType.template;
    this.formSubmitData = this.groupType.data;
    // for (let i = 0; i < this.proposalForms.length; i++) {
    //   if (this.proposalForms[i].smeRef === $event.key) {
    //     this.form = this.proposalForms[i];
    //     if (this.loggedUser.role !== 'admin') {
    //       for (let j = 0; j < this.proposalRequests.length; j++) {
    //         if (this.proposalRequests[j].formIdentity === $event.key &&
    //           this.loggedUser.username === this.proposalRequests[j].userRef &&
    //           this.proposalRequests[j].projectRef === this.selectedProjectId
    //         ) {
    //           this.formSubmitData = this.proposalRequests[j].formSubmitData;
    //           break;
    //         }
    //       }
    //     } else {
    //       for (let j = 0; j < this.proposalRequests.length; j++) {
    //         if (this.proposalRequests[j].formIdentity === $event.key &&
    //           this.selectedProject.userRef === this.proposalRequests[j].userRef &&
    //           this.proposalRequests[j].projectRef === this.selectedProjectId
    //         ) {
    //           this.formSubmitData = this.proposalRequests[j].formSubmitData;
    //           break;
    //         }
    //       }
    //     }
    //     break;
    //   }
    // }
    console.log(this.groupType);
  }

  confirmApprasial() {
    const options = {
      title: 'Are you sure?',
      message: 'By clicking yes appraisal request will be generated.',
      cancelText: 'CANCEL',
      confirmText: 'YES',
      confirm: true,
      add: false
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM MODEL", confirmed);
        // this._projectsStore.markPrimaryAppraisal(
        //   confirmed.startDate,
        //   confirmed.endDate,
        //   this.selectedProjectId
        // );
        // setCurrentProject(
        //   this.selectedProject.name,
        //   this.selectedProject.type,
        //   this.selectedProject.status,
        //   this.selectedProject.userRef,
        //   this.selectedProject.key,
        //   'pending',
        //   confirmed.startDate,
        //   confirmed.endDate,
        //   this.selectedProject.extendedAppraisalStatus,
        //   this.selectedProject.extendedAppraisalExpiry,
        // );
      }
    });
  }

  fillApprasial() {
    this._router.navigate(['/fill-primary-appraisal', this.selectedProjectId]);
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  onSubmit($event) {
    this.formSubmitData = $event.data;
    console.log("FORM SUBMIT:---", this.formSubmitData);
    // this._proposalRequestsStore.addProposalRequest(
    //   this.loggedUser.username,
    //   $event.data,
    //   this.groupType,
    //   this.selectedProjectId,
    // );
    // var flag: any = _.find(this.allRequests, { userRef: this.loggedUser.username, formIdentity: this.groupType })
    // if (!flag) {
    //   var values = {
    //     "currentReview": null,
    //     "endDate": null,
    //     "formData": 'values',
    //     "formIdentity": this.form.formIdentity,
    //     "formSubmitData": this.secondForm,
    //     "prevReview": null,
    //     "ratings": 0,
    //     "requestKey": 'qualification',
    //     "sectionKey": this.groupType,
    //     "startDate": null,
    //     "status": 'pending',
    //     "userName": this.loggedUser.username,
    //     "userUpdateFlag": false
    //   }
    //   console.log("T+REQUEST FOR API:---", values);
    //   this._accreditationRequestService.addAccreditationRequest(values).subscribe(
    //     result => {
    //       this.form.exists = true;
    //       console.log("RESULT AFTER ADDING REQUEST:--", result);
    // this.getRequestsFromApi();
    //   },
    //   error => {
    //     console.log("ERROR AFTER ADDING REQUEST:--", error);
    //   }
    // );
  }

  viewPreApprasial() {
    this._router.navigate(['/view-primary-appraisal', this.selectedProjectId]);
  }

}
