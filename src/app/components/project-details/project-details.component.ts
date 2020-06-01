import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { ProposalRequestsStore } from "../../stores/proposal-requests/proposal-requests-store";
import { PrimaryAppraisalFormsStore } from "../../stores/primary-appraisal-forms/primary-appraisal-forms-store";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { setCurrentProject, currentProjectReplay } from "../../stores/projects/project-replay";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { ProjectService } from "../../services/project.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { ExtendedAppraisalSmesStore } from 'src/app/stores/extended-appraisal-smes/extended-appraisal-smes-store';
import { AccreditationCommentsMatrixStore } from 'src/app/stores/accreditation-comments-matrix/accreditation-comments-matrix-store';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  providers: [ConfirmModelService],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  assignSections = new FormControl();
  unAssignSections = new FormControl();
  sectionComments: any = null;
  sectionUnassignComments: any = null;


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
  selectedProjectInfo: any = null;
  selectedProjectId: any = null;
  sub: any = null;
  costSections = [
    {
      name: "Project Implementation Plan",
      key: 'pip'
    },
  ]

  @Output() show: any = null;
  @Output() proMonths: any = null;
  @Input() showFillApprasialBtn: boolean = true;
  @Input() viewType: string = 'user';
  // @Output() viewType2: string = 'view';
  @Output() preAppViewType: string = null;

  apiLoading: boolean = false;
  submitSections: any = 0;
  pendingSections: any = 0;

  pendingAppraisalDays: any = null;

  sectionStats: any = null;
  assignedProposalSections: any = [];
  unassignedProposalSections: any = [];


  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    private _proposalFormsStore: ProposalFormsStore,
    private _proposalRequestsStore: ProposalRequestsStore,
    private _projectsStore: ProjectsStore,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _authStore: AuthStore,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,

  ) {

  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.apiLoading = true;
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      this.getProjectDetails();
    });
    this.Subscription.add(
      this._proposalSectionsStore.state$.subscribe(data => {
        this.apiLoading = true;
        this.proposalSections = data.sections;
        console.log("PROPOSAL SECTION FROM STORE:---", this.proposalSections);
        let pendingCount = 0;
        let submitCount = 0;
        var reviewsCount = 0;
        var unassignCount = 0;
        this.assignedProposalSections = [];
        this.unassignedProposalSections = [];
        if (this.proposalSections.length) {
          this.proposalSections.forEach(c => {
            if (c.data === null ||
              c.data !== null && c.reassignmentStatus === 'Pending'
            ) {
              pendingCount = pendingCount + 1;
            }
            if (c.data !== null && c.reassignmentStatus === null ||
              c.data !== null && c.reassignmentStatus === 'Complete'
            ) {
              submitCount = submitCount + 1;
            }
            let result = c.name.match(/glance/g);
            if (result !== null) {
              if (c.data) {
                this.selectedProjectInfo = c.data;
                this._authStore.setProjectMonths(c.data.duration);
              }
            }
            if (c.assigned === false) {
              this.unassignedProposalSections.push(c);
            } else if (c.assigned === true) {
              this.assignedProposalSections.push(c);
            }
            if (c.reviewStatus === 'Pending') {
              pendingCount = pendingCount + 1;
            }
            if (c.review !== null) {
              reviewsCount = reviewsCount + 1;
            }
            if ((c.review === null && c.reviewStatus === null) ||
              (c.review !== null && c.reviewStatus === null) ||
              (c.review !== null && c.reviewStatus === 'Completed')
            ) {
              unassignCount = unassignCount + 1;
            }
          });
          this.submitSections = submitCount;
          this.pendingSections = pendingCount;
          let totalSections = pendingCount + unassignCount;
          this.sectionStats = {
            submitCount,
            pendingCount,
            totalSections,
            reviewsCount,
            unassignCount,
          }
          console.log("PENDING?SUBMITTED:--", pendingCount, submitCount, this.selectedProjectInfo, this.proMonths);
          this.groupType = this.proposalSections[0];
          this.tabChanged(this.groupType);
          // this.assignSections = this.proposalSections[0];
          this.assignSections.patchValue([this.assignedProposalSections[0]], { onlySelf: true });
          this.apiLoading = false;
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
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
        if (this.selectedProject && this.selectedProject.commentsMatrix) {
          this._accreditationCommentsMatrixStore.addCommentsArray(this.selectedProject.commentsMatrix);
        }
        if (this.selectedProject && this.selectedProject.preAppraisal) {
          var date1 = new Date();
          var date2 = new Date(this.selectedProject.preAppraisal.endDate);
          // To calculate the time difference of two dates 
          var Difference_In_Time = date2.getTime() - date1.getTime();
          // To calculate the no. of days between two dates 
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          this.pendingAppraisalDays = Math.trunc(Difference_In_Days);
          console.log("TIME DIFFERENCE:", Difference_In_Days, Math.trunc(Difference_In_Days));
        }
        if (this.selectedProject &&
          this.selectedProject.extendedAppraisal &&
          this.selectedProject.extendedAppraisal !== null) {
          this._extendedAppraisalSmesStore.addAppraisal(this.selectedProject.extendedAppraisal);
        }
      })
    );
  }

  getProjectDetails() {
    this.apiLoading = true;
    this._projectService.getSingleProject(this.selectedProjectId).subscribe(
      (result: any) => {
        // this.selectedProject = result;
        // this.selectedProject.id = this.selectedProjectId;
        result.id = this.selectedProjectId;
        this._primaryAppraisalFormsStore.addSelectedProject(result);
        console.log("PROJECT DETAILS FROM DATABASE:--", this.selectedProject);
        let proposalSections = result.sections.map(c => {
          return {
            ...c,
            data: c.data ? JSON.parse(c.data) : null,
            template: c.template ? JSON.parse(c.template) : null,
            projectStatus: this.selectedProject.status,
          }
        })
        if (this.selectedProject !== null) {
          this._proposalSectionsStore.addAllSections(proposalSections);
        } else {
          this.apiLoading = false;
        }
      },
      error => {
        console.log("ERROR DETAILS FROM DATABASE:--", error);
      },
    );
  }

  getSelectedValues(item) {
    return item;
  }


  costTabChanged(item) {
    this.show = item.key
    console.log("COST TAB CHANGED:--", item, this.proMonths);
  }

  tabChanged($event) {
    this.form = this.groupType.template;
    this.form.sme = this.groupType.sme.name;
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
        this._projectService.createPreAppraisalRequest(this.selectedProjectId, confirmed).subscribe(
          result => {
            console.log("ADDED APPRAISAL:---", result);
            // if (this.selectedProject)
            if (this.selectedProject.preAppraisal === null) {
              this.selectedProject.status = "Preliminary Appraisal";
            } else {
              this.selectedProject.preAppraisal.status = 'Pending';
            }
          },
          error => {
            console.log("ERROR APPRAISAL:---", error);
          }
        );
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

  prepareExtAppraisal() {
    const options = {
      title: 'Are you sure?',
      message: 'By clicking yes extended appraisal will be generated.',
      cancelText: 'CANCEL',
      confirmText: 'YES',
      confirm: true,
      add: false
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM EXT-APPRAISAL MODEL", confirmed);
        this._projectService.createExtAppraisalRequest(this.selectedProjectId, confirmed).subscribe(
          result => {
            this.selectedProject.status = "Extended Appraisal";
            if (this.selectedProject.extendedAppraisal) this.selectedProject.extendedAppraisal.status = "Pending";
            console.log("ADDED APPRAISAL:---", result, this.selectedProject);
            // if (this.selectedProject.preAppraisal.data === null) {
            // } else {
            //   this.selectedProject.preAppraisal.status = 'Pending';
            // }
          },
          error => {
            console.log("ERROR APPRAISAL:---", error);
          }
        );
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

  onSubmit($event) {
    this.apiLoading = true;
    this.formSubmitData = $event.data;
    console.log("FORM SUBMIT:---", this.formSubmitData, this.selectedProject);
    this._projectService.addProjectRequest(
      {
        data: JSON.stringify(this.formSubmitData),
        id: this.groupType.id
      },
      this.selectedProjectId
    ).subscribe(
      result => {
        console.log("RESULT ADDING REQUEST:--", result);
        this._proposalSectionsStore.updateSectionReview(this.formSubmitData, this.groupType.id);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR ADDING REQUEST:--", error);
      }
    );
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

  submitRequest() {
    this.apiLoading = true;
    this._projectService.updateProjectRequest(
      {
        data: JSON.stringify(this.proposalSections[0].data),
        id: this.proposalSections[0].id
      },
      this.selectedProjectId
    ).subscribe(
      result => {
        console.log("RESULT AFTER UPDATING THE REQUEST:---", result);
        this.selectedProject.status = 'Under Review';
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR AFTER UPDATING THE REQUEST:---", error);
      }
    )
  }

  viewPreApprasial() {
    this._router.navigate(['/view-primary-appraisal', this.selectedProjectId]);
  }


  ngOnDestroy(): void {
    this._proposalSectionsStore.addAllSections([]);
    this.Subscription.unsubscribe();
  }

  viewExtAppraisal() {
    this._router.navigate(['/add-extended-appraisal-form', this.selectedProjectId])
  }

  assginProposalSections() {
    const options = {
      title: 'Assign Proposal Sections to SMEs!',
      message: 'Click OK to assign tasks',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
      setStatus: false,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("CONFIRMED FROM MODEL", confirmed);
      for (let i = 0; i < this.proposalSections.length; i++) {
        let key = this.proposalSections[i];
        if (key.reviewStatus === 'Completed' || key.reviewStatus === null) {
          this._projectService.assignProposalSectionTasks(key.id, confirmed).subscribe(
            (result: any) => {
              console.log("RESULT ADDING PROPOSAL TASK:--", result);
              this._proposalSectionsStore.assignTasksToSmes(key.id);
            },
            error => {
              console.log("ERROR ADDING PROPOSAL TASK:--", error);
            }
          );
        }
      }
      // if (confirmed) {
      //   this.apiLoading = true;
      //   this._accreditationRequestService.updateAccreditationRequest(this.selectedRequest.id, confirmed.status).subscribe(
      //     result => {
      //       this.apiLoading = false;
      //       console.log("RESULT AFTER UPDATING STATUS:---", result);
      //     },
      //     error => {
      //       this.apiLoading = false;
      //       console.log("ERROR AFTER UPDATING STATUS:---", error);
      //     }
      //   );
      // }
    });
  }

  addAssignedSectionReview() {
    console.log("ADDING REVIEW:--", this.assignSections.value, this.sectionComments);
    for (let i = 0; i < this.assignSections.value.length; i++) {
      let key = this.assignSections.value[i];
      if (key.reviewStatus === 'Pending' || key.reviewStatus === null) {
        this._projectService.submitProposalSectionReview(
          key.id,
          {
            comments: this.sectionComments,
            status: 'Completed'
          }
        ).subscribe(
          result => {
            console.log("RESULT AFTER PROPOSAL REVIEW:--", result);
            this._proposalSectionsStore.submitProposalReview(
              key.id,
              {
                comments: this.sectionComments,
                controlWiseComments: null,
                createdDate: new Date(),
                rating: null,
                status: null,
              }
            );
          },
          error => {
            console.log("ERROR AFTER PROPOSAL REVIEW:--", error);
          },
        );
      }
    }
  }

  addUnAssignedSectionReview() {
    console.log("ADDING REVIEW:--", this.unAssignSections.value, this.sectionUnassignComments);
    var sectionIds: any = [];
    for (let i = 0; i < this.unAssignSections.value.length; i++) {
      let key = this.unAssignSections.value[i];
      sectionIds.push(key.id)
    }
    var object = {
      comments: this.sectionUnassignComments,
      sectionIds: sectionIds.length ? sectionIds : null
    }
    this._projectService.submitProposalGeneralReview(
      this.selectedProjectId,
      object
    ).subscribe(
      result => {
        console.log("RESULT AFTER PROPOSAL GENERAL REVIEW:--", result);
      },
      error => {
        console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
      },
    );
  }


  assignSectionsSelectStore($event) {
    console.log("SELECT STORS:--", $event);
  }

  unassignSectionsSelectStore($event) {
    console.log("SELECT STORS:--", $event);
  }

  sectionCommentsChanged($event) {
    console.log("SECTIONS COMMENTS:--", $event.target.value);
  }

  viewCommentsMatrix() {
    this._router.navigate(['extended-appraisal-smes', this.selectedProjectId]);
  }

}
