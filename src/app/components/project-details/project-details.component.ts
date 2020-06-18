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
  files: any = [];
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


  /** Link text */
  @Input() text = 'Upload';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. */
  // @Input() target = 'https://file.io';
  /** File extension that accepted, same as 'accept' of <input type="file" />. 
      By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  // @Output() complete = new EventEmitter<string>();

  giaDoc: any = [];


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
            let result1 = c.name.match(/Beneficiaries/g);
            if (result !== null) {
              if (c.data) {
                this.selectedProjectInfo = c.data;
                this._authStore.setProjectMonths(c.data.duration);
              }
            }
            if (this.selectedProjectInfo) {

              if (result1 !== null) {
                if (c.data) {
                  this.selectedProjectInfo.pb = c.data;
                }
              }
            }
            if (c.assigned === false) {
              this.unassignedProposalSections.push(c);
            } else if (c.assigned === true && c.reviewStatus !== null) {
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
          this.assignSections.patchValue([this.assignedProposalSections[0]], { onlySelf: true });
          this.costTabsType = this.costSections[0].name;
          this.costTabChanged(this.costSections[0]);
          this.apiLoading = false;
        }
      })
    );
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
        console.log("SELECTED PROJECT IN STORE:--", this.selectedProject);
        if (this.selectedProject && this.selectedProject.commentsMatrix) {
          this._accreditationCommentsMatrixStore.addCommentsArray(this.selectedProject.commentsMatrix);
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
        this.pendingAppraisalDays = 0;
        result.id = this.selectedProjectId;
        this._primaryAppraisalFormsStore.addSelectedProject(result);
        if (result && result.preAppraisal) {
          if (result.preAppraisal.status === 'Pending') {
            this.pendingAppraisalDays = this.calculateDaysDifference(result.preAppraisal.endDate);
            this._primaryAppraisalFormsStore.setPreAppraisalExpiryDays(this.pendingAppraisalDays);
            if (this.pendingAppraisalDays < parseInt('0')) {
              console.log("TIME DIFFERENCE:", this.pendingAppraisalDays, this.pendingAppraisalDays < parseInt('0'));
              this._primaryAppraisalFormsStore.setPreAppraisalExpiry();
            }
          }
        }
        if (result &&
          result.extendedAppraisal &&
          result.extendedAppraisal !== null) {
          if (result.extendedAppraisal.status === 'Pending') {
            this.pendingAppraisalDays = this.calculateDaysDifference(result.extendedAppraisal.endDate);
            this._primaryAppraisalFormsStore.setExtAppraisalExpiryDays(this.pendingAppraisalDays);
            if (this.pendingAppraisalDays < parseInt('0')) {
              console.log("TIME DIFFERENCE:", this.pendingAppraisalDays, this.pendingAppraisalDays < parseInt('0'));
              this._primaryAppraisalFormsStore.setExtAppraisalExpiry();
            }
          }
          // this._extendedAppraisalSmesStore.addAppraisal(this.selectedProject.extendedAppraisal);
        }
        // console.log("PROJECT DETAILS FROM DATABASE:--", this.selectedProject);
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

  calculateDaysDifference(date) {
    var date1 = new Date();
    var date2 = new Date(date);

    // To calculate the time difference of two dates 
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    console.log("TIME DIFFERENCE:", Difference_In_Time, Math.trunc(Difference_In_Days), Math.floor(Difference_In_Days));
    if (Math.trunc(Difference_In_Days) < 0) {
      return -1 * Math.trunc(Difference_In_Days);
    } else {
      return Math.trunc(Difference_In_Days);

    }
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
    // this.form.status = this.groupType.status;
    // this.form.endDate = this.groupType.endDate;
    // this.form.completeDate = this.groupType.completeDate;
    // this.form.sme = this.groupType.sme.name;s
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

  elementClicked(item) {
    console.log("ELEMENT CLICKED:--", item);
    this.groupType = item;
    this.tabChanged(item);
    document.querySelector('#myTopElement').scrollIntoView({ behavior: 'smooth', block: 'center' });
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
            let days = this.calculateDaysDifference(confirmed.endDate);
            this._primaryAppraisalFormsStore.updatePreAppraisalStatus(confirmed);
            this._primaryAppraisalFormsStore.setPreAppraisalExpiryDays(days);
            // if (this.selectedProject)
            // if (this.selectedProject.preAppraisal === null) {
            //   this.selectedProject.status = "Preliminary Appraisal";
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
          (result: any) => {
            // this.selectedProject.status = "Extended Appraisal";
            // if (this.selectedProject.extendedAppraisal) this.selectedProject.extendedAppraisal.status = "Pending";
            let days = this.calculateDaysDifference(confirmed.endDate);
            confirmed.sections = result.sections;
            confirmed.assigned = result.assigned;
            confirmed.assignee = result.assignee;
            confirmed.comments = result.comments;
            confirmed.endDate = result.endDate;
            confirmed.id = result.id;
            confirmed.startDate = result.startDate;
            this._primaryAppraisalFormsStore.updateExtAppraisalStatus(confirmed);
            this._primaryAppraisalFormsStore.setExtAppraisalExpiryDays(days);
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

  uploadFile() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
      // this.uploadFiles();
      console.log("Uploaded Files:---", this.files);
    };
    fileUpload.click();
  }

  uploadGiaDoc() {
    const fileUpload = document.getElementById('giaDocUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.giaDoc.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
      // this.uploadFiles();
      console.log("Uploaded Files:---", this.giaDoc);
    };
    fileUpload.click();
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
    if (this.unAssignSections.value) {
      for (let i = 0; i < this.unAssignSections.value.length; i++) {
        let key = this.unAssignSections.value[i];
        sectionIds.push(key.id)
      }
    }
    var object = {
      comment: this.sectionUnassignComments,
      sectionIds: sectionIds.length ? sectionIds : null
    }
    if (this.files.length) {
      let stage = null;
      if (this.selectedProject.status === 'Preliminary Appraisal') stage = 'PRELIMINARY_APPRAISAL'
      if (this.selectedProject.status === 'Extended Appraisal') stage = 'EXTENDED_APPRAISAL'
      if (this.selectedProject.status === 'TAC Meeting') stage = 'TAC_MEETING'
      if (this.selectedProject.status === 'RMC Meeting') stage = 'RMC_MEETING'
      if (this.selectedProject.status === 'BOD Meeting') stage = 'BOD_MEETING'
      if (this.selectedProject.status === 'Offer Letter') stage = 'OFFER_LETTER'
      const fd = new FormData();
      fd.append(this.param, this.files[0].data);
      this._projectService.uploadFiles(
        this.selectedProjectId,
        stage,
        fd
      ).subscribe(
        (result: any) => {
          console.log("RESULT AFTER UPLOADING FILE:--", result);
          const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
          fileUpload.value = '';
          this.files = [];
          this._projectService.submitProposalGeneralReview(
            this.selectedProjectId,
            object
          ).subscribe(
            (result: any) => {
              this.sectionUnassignComments = null;
              console.log("RESULT AFTER PROPOSAL GENERAL REVIEW:--", result);
              const options = {
                title: 'Successfully Added!',
                message: 'Click OK to exit',
                cancelText: 'CANCEL',
                confirmText: 'OK',
                add: true,
                confirm: false,
                setStatus: false,
              };
              this._confirmModelService.open(options);
            },
            error => {
              console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
            }
          );
        },
        error => {
          console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
        }
      );
    } else {
      this._projectService.submitProposalGeneralReview(
        this.selectedProjectId,
        object
      ).subscribe(
        result => {
          console.log("RESULT AFTER PROPOSAL GENERAL REVIEW:--", result);
          this.sectionUnassignComments = null;
          const options = {
            title: 'Successfully Added!',
            message: 'Click OK to exit',
            cancelText: 'CANCEL',
            confirmText: 'OK',
            add: true,
            confirm: false,
            setStatus: false,
          };
          this._confirmModelService.open(options);
        },
        error => {
          console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
        },
      );
    }
  }


  markToGm() {
    const options = {
      title: 'Mark To GM!',
      message: 'By Clicking "Yes" project status will be changed',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("MARK TO GM STATUS", confirmed);
      if (confirmed) {
        this._projectService.markToGm(this.selectedProjectId).subscribe(
          result => {
            console.log("RESULT FROM MARK TO GM:--", result);
            this._primaryAppraisalFormsStore.markToGm();
          },
          error => {
            console.log("ERROR FROM MARK TO GM:--", error);
          }
        );
      }
    });

  }

  uploadOfferLetter() {
    const options = {
      title: 'Select a due date for the Signing!',
      message: 'By Clicking "OK" offer letter will be generated',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: false,
      offerLetter: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("MARK TO GM STATUS", confirmed);
      // if (confirmed) {
      //   this._projectService.markToGm(this.selectedProjectId).subscribe(
      //     result => {
      //       console.log("RESULT FROM MARK TO GM:--", result);
      //       this._primaryAppraisalFormsStore.markToGm();
      //     },
      //     error => {
      //       console.log("ERROR FROM MARK TO GM:--", error);
      //     }
      //   );
      // }
    });

  }

  uploadGIA() {
    const options = {
      title: 'Select a due date for the Signing!',
      message: 'By Clicking "OK" GIA will be generated',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: false,
      offerLetter: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("UPLOAD GIA DOCUMENT", confirmed);
      if (confirmed) {
        this._projectService.appriveGia(this.selectedProjectId, confirmed.endDate.toISOString()).subscribe(
          result => {
            console.log("RESULT UPDATINGGIA:--", result);
            this.uploadTacMoms('GIA', 'yesgia');
            this._primaryAppraisalFormsStore.addGiaCheckList(confirmed.endDate);
          },
          error => {
            console.log("ERROR FROM UPDATINGGIA:--", error);
          }
        );
      } else {
        this.files = [];
      }
    });

  }

  extendGIATimeline() {
    const options = {
      title: 'Select a due date for the Signing!',
      message: 'By Clicking "OK" signing timeline will be extended.',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: false,
      offerLetter: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("UPLOAD GIA DOCUMENT", confirmed);
      if (confirmed) {
        this._projectService.appriveGia(this.selectedProjectId, confirmed.endDate.toISOString()).subscribe(
          result => {
            console.log("TIME LINE EXTENDED:--", result);
          },
          error => {
            console.log("ERROR TIME LINE EXTENSION:--", error);
          }
        );
      }
    });

  }

  approvePreApprasial() {
    const options = {
      title: 'Approve Preliminary Appraisal!',
      message: 'By Clicking "Yes" project status will be changed',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("MARK TO GM STATUS", confirmed);
      if (confirmed) {
        this._projectService.approvePreApparisalByGm(this.selectedProjectId).subscribe(
          result => {
            console.log("RESULT FROM MARK TO GM:--", result);
            this._primaryAppraisalFormsStore.approvePreApparisalByGm();
          },
          error => {
            console.log("ERROR FROM MARK TO GM:--", error);
          }
        );
      }
    });

  }

  setProjectStages() {
    const options = {
      title: 'Set one of the following state!',
      message: 'Select any of the following',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: false,
      setStatus: false,
      assignToGm: false,
      setStages: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      console.log("MARK TO GM STATUS", confirmed);
      if (confirmed) {
        this._projectService.setProjectStage(this.selectedProjectId, confirmed.status).subscribe(
          result => {
            console.log("RESULT FROM MARK TO GM:--", result);
            let stage = null;
            if (confirmed.status === 'PRELIMINARY_APPRAISAL') stage = 'Preliminary Appraisal'
            if (confirmed.status === 'EXTENDED_APPRAISAL') stage = 'Extended Appraisal'
            if (confirmed.status === 'TAC_MEETING') stage = 'TAC Meeting'
            if (confirmed.status === 'RMC_MEETING') stage = 'RMC Meeting'
            if (confirmed.status === 'BOD_MEETING') stage = 'BOD Meeting'
            if (confirmed.status === 'OFFER_LETTER') stage = 'Offer Letter'
            if (confirmed.status === 'GIA') stage = 'GIA'
            this._primaryAppraisalFormsStore.setProjectStage(stage);
            options.setStages = false;
            options.add = true;
            options.title = 'Successfull!',
              options.message = 'Project stage has been changed',
              this._confirmModelService.open(options);
          },
          error => {
            console.log("ERROR FROM MARK TO GM:--", error);
          }
        );
      }
    });

  }

  uploadTacMoms(stage, type) {
    const fd = new FormData();
    fd.append(this.param, this.files[0].data);
    this._projectService.uploadFiles(
      this.selectedProjectId,
      stage,
      fd
    ).subscribe(
      (result: any) => {
        console.log("RESULT AFTER UPLOADING FILE MOMS TAC MEETING:--", result);
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.value = '';
        this.files = [];
        if (type === 'yestac') {
          this.updateStageMoms('RMC_MEETING', 'RMC Meeting');
        }
        if (type === 'yesrmc') {
          this.updateStageMoms('BOD_MEETING', 'BOD Meeting');
        }
        if (type === 'yesbod') {
          this.updateStageMoms('OFFER_LETTER', 'Offer Letter');
        }
        if (type === 'yesgia') {
          this.updateStageMoms('GIA_CHECKLIST', 'Checklist to FIP');

        }
      },
      error => {
        console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
      }
    );
  }

  updateStageMoms(stage1, stage2) {
    this._projectService.setProjectStage(this.selectedProjectId, stage1).subscribe(
      result => {
        console.log("RESULT AFTER UPDATING MOM STAUS:--", result);
        this._primaryAppraisalFormsStore.setProjectStage(stage2);
      },
      error => {
        console.log("ERROR AFTER UPDATING MOM STAUS:--", error);
      }
    );
  }

  viewGia() {
    this._router.navigate(['/gia-appraisal', this.selectedProjectId]);
  }

  goToGiaChecklist() {
    this._router.navigate(['view-gia-checklist', this.selectedProjectId]);
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
