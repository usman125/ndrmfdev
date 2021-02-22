import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
// import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
// import { ProposalRequestsStore } from "../../stores/proposal-requests/proposal-requests-store";
import { PrimaryAppraisalFormsStore } from "../../stores/primary-appraisal-forms/primary-appraisal-forms-store";
// import { ProjectsStore } from "../../stores/projects/projects-store";
import { Subscription } from "rxjs";
// import { switchMap } from "rxjs/operators";
// import { setCurrentProject, currentProjectReplay } from "../../stores/projects/project-replay";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmModelService } from "../../services/confirm-model.service";
import { ProjectService } from "../../services/project.service";
import { AuthStore } from "../../stores/auth/auth-store";
import { ExtendedAppraisalSmesStore } from 'src/app/stores/extended-appraisal-smes/extended-appraisal-smes-store';
import { AccreditationCommentsMatrixStore } from 'src/app/stores/accreditation-comments-matrix/accreditation-comments-matrix-store';
// import { AccreditationRequestService } from 'src/app/services/accreditation-request.service';
import * as _ from 'lodash';

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

  sectionStats: any = {};
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
  @Input() accept = '*/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  // @Output() complete = new EventEmitter<string>();

  giaDoc: any = [];
  pc1Files: any = [];


  constructor(
    private _proposalSectionsStore: ProposalSectionsStore,
    // private _proposalFormsStore: ProposalFormsStore,
    // private _proposalRequestsStore: ProposalRequestsStore,
    // private _projectsStore: ProjectsStore,
    private _confirmModelService: ConfirmModelService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _projectService: ProjectService,
    private _authStore: AuthStore,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _extendedAppraisalSmesStore: ExtendedAppraisalSmesStore,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,
    // private _accreditationRequestService: AccreditationRequestService,

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
        this.proposalSections = [];
        for (let i = 0; i < data.sections.length; i++) {
          var key = data.sections[i];
          let result = key.name.match(/Framework/g);
          if (result === null) {
            this.proposalSections.push(key);
          }
        }
        let pendingCount = 0;
        let pendingReviewCount = 0;
        let submitCount = 0;
        var reviewsCount = 0;
        var unassignCount = 0;
        this.assignedProposalSections = [];
        this.unassignedProposalSections = [];
        if (this.proposalSections.length) {
          this.proposalSections.forEach(c => {
            if ((c.data) === null ||
              (c.data !== null && c.reassignmentStatus === 'Pending')
            ) {
              pendingCount = pendingCount + 1;
            }
            if ((c.data !== null && c.reassignmentStatus === null) ||
              (c.data !== null && c.reassignmentStatus === 'Completed')
            ) {
              submitCount = submitCount + 1;
            }
            let result = c.name.toLowerCase().match(/glance/g);
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
              pendingReviewCount = pendingReviewCount + 1;
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
          var pipSection = {
            assigned: null,
            data: null,
            id: 'pip',
            name: 'Project Implementation Plan',
            passingScore: null,
            reassignmentStatus: null,
            review: null,
            reviewCompletedDate: null,
            reviewDeadline: null,
            reviewHistory: null,
            reviewStatus: null,
            sme: null,
            template: this.selectedProject ? this.selectedProject.implementationPlan ? this.selectedProject.implementationPlan : null : null,
            templateType: null,
            totalScore: null,
          }
          this.unassignedProposalSections.push(pipSection);
          this.submitSections = submitCount;
          this.pendingSections = pendingCount;
          let totalSections = this.proposalSections.length;
          this.sectionStats.submitCount = submitCount;
          this.sectionStats.pendingCount = pendingCount;
          this.sectionStats.totalSections = totalSections;
          this.sectionStats.reviewsCount = reviewsCount;
          this.sectionStats.unassignCount = unassignCount;
          this.sectionStats.pendingReviewCount = pendingReviewCount;
          this.groupType = this.proposalSections[0];
          this.tabChanged(this.groupType);
          this.assignSections.patchValue([this.assignedProposalSections[0]], { onlySelf: true });
          if (pendingCount === 0) {
            this.costTabsType = this.costSections[0].name;
            this.costTabChanged('General');
          }
          this.apiLoading = false;
        }
      })
    );
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
        if (this.selectedProject && this.selectedProject.commentsMatrix) {
          this._accreditationCommentsMatrixStore.addCommentsArray(this.selectedProject.commentsMatrix);
        }
        if (this.selectedProject) {
          if (this.selectedProject.gia !== null && this.selectedProject.gia !== undefined) {
            if (this.selectedProject.gia.status !== "Not Initiated") {

              if (this.selectedProject.gia.reviews !== null) {
                var giaReviewsCount = 0;
                var assignedUsers = [];
                for (let i = 0; i < this.selectedProject.gia.reviews.length; i++) {
                  var key = this.selectedProject.gia.reviews[i];
                  if (key.comments !== null) {
                    giaReviewsCount = giaReviewsCount + 1;
                  } else {
                    assignedUsers.push(key.assignee);
                  }
                }
              }
              if (this.sectionStats) {
                this.sectionStats.giaReviewsCount = giaReviewsCount;
                this.sectionStats.giaPendingCount = assignedUsers && assignedUsers.length - giaReviewsCount;
              }
            }
          }

        }
        if (this.selectedProject &&
          this.selectedProject.extendedAppraisal &&
          this.selectedProject.extendedAppraisal !== null) {
          this._extendedAppraisalSmesStore.addAppraisal(this.selectedProject.extendedAppraisal);
        }
        console.log("SELECTED PROJECT IN STORE:--", this.selectedProject, this.sectionStats);
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
              this._primaryAppraisalFormsStore.setExtAppraisalExpiry();
            }
          }
        }
        if (result && result.giaChecklist !== null &&
          result.giaChecklist) {
          if (this.calculateDaysDifference(result.giaChecklist.deadline) < parseInt('0')) {
            this._primaryAppraisalFormsStore.setGiaChecklistExpiry(
              this.calculateDaysDifference(result.giaChecklist.deadline)
            );
          }
        }
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
          this._projectService.getProposalAttachments(this.selectedProjectId).subscribe(
            (result: any) => {
              this._primaryAppraisalFormsStore.addSelectedProjectFiles(result);
              if (this.selectedProject.status === 'Offer Letter') {
                this._projectService.getOfferLetter(this.selectedProjectId).subscribe(
                  (result: any) => {
                    if (result) {
                      if (result.expiryDate) {
                        result.expiryDate = result.expiryDate.split('T')[0];
                        result.offerLetterDays = this.calculateDaysDifference(result.expiryDate);
                        if (result.offerLetterDays < parseInt('0')) {
                          result.status = 'Expired';
                        }
                      }
                      this._primaryAppraisalFormsStore.setOfferLetter(result);
                    }
                  },
                  error => {
                    console.log("RESULT AFTER OFFER LETTER:--", error);
                  }
                );
              }
            },
            error => {
              console.log("FILES FOR THIS PROJECT:--", error);
            }
          );
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
    if (Math.trunc(Difference_In_Days) < 0) {
      return Math.trunc(Difference_In_Days);
    } else {
      return Math.trunc(Difference_In_Days);
    }
  }



  getSelectedValues(item) {
    return item;
  }


  costTabChanged(item) {
    this.show = item.key
  }

  tabChanged($event) {
    this.form = typeof (this.groupType.template) === 'string' ? JSON.parse(this.groupType.template) : this.groupType.template;
    this.form.sme = this.groupType.sme ? this.groupType.sme.name : null;
    this.formSubmitData = this.groupType.data;
  }

  elementClicked(item) {
    if (item.id !== 'pip') {
      this.groupType = item;
      this.tabChanged(item);
      document.querySelector('#myTopElement').scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      document.querySelector('#myTopElement3').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        this._projectService.createPreAppraisalRequest(this.selectedProjectId, confirmed).subscribe(
          result => {
            let days = this.calculateDaysDifference(confirmed.endDate);
            this._primaryAppraisalFormsStore.updatePreAppraisalStatus(confirmed);
            this._primaryAppraisalFormsStore.setPreAppraisalExpiryDays(days);
          },
          error => {
            console.log("ERROR APPRAISAL:---", error);
          }
        );
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
        this._projectService.createExtAppraisalRequest(this.selectedProjectId, confirmed).subscribe(
          (result: any) => {
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
          },
          error => {
            console.log("ERROR APPRAISAL:---", error);
          }
        );
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
    };
    fileUpload.click();
  }

  pc1Upload() {
    const fileUpload = document.getElementById('uploadPC1') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.pc1Files.push({
          data: file, state: 'in',
          inProgress: false, progress: 0, canRetry: false, canCancel: true
        });
      }
    };
    fileUpload.click();
  }

  fillApprasial() {
    this._router.navigate(['/fill-primary-appraisal', this.selectedProjectId]);
  }

  onSubmit($event) {
    this.apiLoading = true;
    this.formSubmitData = $event.data;
    this._projectService.addProjectRequest(
      {
        data: JSON.stringify(this.formSubmitData),
        id: this.groupType.id
      },
      this.selectedProjectId
    ).subscribe(
      result => {
        this._proposalSectionsStore.updateSectionReview(this.formSubmitData, this.groupType.id);
        this.apiLoading = false;
      },
      error => {
        this.apiLoading = false;
        console.log("ERROR ADDING REQUEST:--", error);
      }
    );
  }

  submitRequest() {
    if (this.selectedProject.implementationPlan === null) {
      const options = {
        title: 'Save implementation plan first to submit!',
        message: 'Click OK to exit',
        cancelText: 'CANCEL',
        confirmText: 'OK',
        add: true,
        confirm: false,
        setStatus: false,
      };
      this._confirmModelService.open(options);
    } else {

      this.apiLoading = true;
      this._projectService.updateProjectRequest(
        {
          data: JSON.stringify(this.proposalSections[0].data),
          id: this.proposalSections[0].id
        },
        this.selectedProjectId
      ).subscribe(
        result => {
          this.selectedProject.status = 'Under Review';
          this.apiLoading = false;
        },
        error => {
          this.apiLoading = false;
          console.log("ERROR AFTER UPDATING THE REQUEST:---", error);
        }
      );
    }
  }

  viewPreApprasial() {
    this._router.navigate(['/view-primary-appraisal', this.selectedProjectId]);
  }


  ngOnDestroy(): void {
    this._authStore.setProjectMonths(0);
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
      if (confirmed) {
        for (let i = 0; i < this.proposalSections.length; i++) {
          let key = this.proposalSections[i];
          if (key.reviewStatus === 'Completed' || key.reviewStatus === null) {
            this._projectService.assignProposalSectionTasks(key.id, confirmed).subscribe(
              (result: any) => {
                this._proposalSectionsStore.assignTasksToSmes(key.id);
              },
              error => {
                console.log("ERROR ADDING PROPOSAL TASK:--", error);
              }
            );
          }
        }
      }
    });
  }

  addAssignedSectionReview() {
    if (this.files.length) {
      let stage = null;
      if (this.selectedProject.status === 'Preliminary Appraisal') stage = 'PRELIMINARY_APPRAISAL'
      if (this.selectedProject.status === 'Extended Appraisal') stage = 'EXTENDED_APPRAISAL'
      if (this.selectedProject.status === 'TAC Meeting') stage = 'TAC_MEETING'
      if (this.selectedProject.status === 'RMC Meeting') stage = 'RMC_MEETING'
      if (this.selectedProject.status === 'BOD Meeting') stage = 'BOD_MEETING'
      if (this.selectedProject.status === 'Offer Letter') stage = 'OFFER_LETTER'
      if (this.selectedProject.status === 'GIA') stage = 'GIA'
      if (this.selectedProject.status === 'Checklist to FIP') stage = 'GIA_CHECKLIST'
      const fd = new FormData();
      fd.append(this.param, this.files[0].data);
      this._projectService.uploadFiles(
        this.selectedProjectId,
        stage,
        fd
      ).subscribe(
        (result: any) => {
          this.files = [];
        },
        error => {
          console.log("ERROR AFTER UPLOADING FILE:--", error);
        }
      )
    }
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
    this.sectionComments = null;
  }

  addUnAssignedSectionReview() {
    var sectionIds: any = [];
    if (this.unAssignSections.value) {
      for (let i = 0; i < this.unAssignSections.value.length; i++) {
        let key = this.unAssignSections.value[i];
        if (key.id !== 'pip')
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
      if (this.selectedProject.status === 'GIA') stage = 'GIA'
      if (this.selectedProject.status === 'Checklist to FIP') stage = 'GIA_CHECKLIST'
      if (this.selectedProject.status === 'Draft') stage = 'DRAFT'
      if (this.selectedProject.status === 'Under Review') stage = 'UNDER_REVIEW'
      const fd = new FormData();
      fd.append(this.param, this.files[0].data);
      this._projectService.uploadFiles(
        this.selectedProjectId,
        stage,
        fd
      ).subscribe(
        (result: any) => {
          this.files = [];
          this._projectService.submitProposalGeneralReview(
            this.selectedProjectId,
            object
          ).subscribe(
            (result: any) => {
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
      if (confirmed) {
        this._projectService.markToGm(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.markToGm();
          },
          error => {
            console.log("ERROR FROM MARK TO GM:--", error);
          }
        );
      }
    });

  }

  markExtToGm() {
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
      if (confirmed) {
        this._projectService.markToGm(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.markExtToGm();
          },
          error => {
            console.log("ERROR FROM MARK TO GM:--", error);
          }
        );
      }
    });

  }

  markToCeo() {
    const options = {
      title: 'Mark To CEO!',
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
      if (confirmed) {
        this._projectService.markToCeo(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.markToCeo();
          },
          error => {
            console.log("ERROR FROM MARK TO CEO:--", error);
          }
        );
      }
    });

  }

  markExtToCeo() {
    const options = {
      title: 'Mark To CEO!',
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
      if (confirmed) {
        this._projectService.markToCeo(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.markExtToCeo();
          },
          error => {
            console.log("ERROR FROM MARK TO CEO:--", error);
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
      comments: null,
    };

    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        var body = {
          fipComments: null,
          gmComments: confirmed.comments,
          expiryDate: confirmed.endDate,
          gmStatus: 'Pending',
          fipStatus: null,
          gmResponse: null,
          fipResponse: null,
        }
        const fd = new FormData();
        fd.append(this.param, this.files[0].data);
        this._projectService.uploadFiles(
          this.selectedProjectId,
          'OFFER_LETTER',
          fd
        ).subscribe(
          (result: any) => {
            this._projectService.updateProposalOfferLetterStatus(
              this.selectedProjectId,
              'OFFER_LETTER',
              'PENDING',
              body
            ).subscribe(
              (result: any) => {
                console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", result);
                this.files = [];
              },
              error => {
                console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", error);
              }
            );
            // this.files = [];
          },
          error => {
            console.log("ERROR AFTER OFFER LETTER FILE UPLOAD:--", error);
          }
        );
      }
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
      if (confirmed) {
        this._projectService.appriveGia(this.selectedProjectId, confirmed.endDate.toISOString()).subscribe(
          result => {
            this.uploadTacMoms('GIA', 'yesgia');
            this._primaryAppraisalFormsStore.addGiaCheckList(confirmed.endDate);
          },
          error => {
            console.log("ERROR FROM UPDATINGGIA:--", error);
            if (error.status === 422) {
              const options = {
                title: error.error.message,
                message: 'Click "OK" to exit',
                cancelText: 'CANCEL',
                confirmText: 'OK',
                add: true,
                confirm: false,
                setStatus: false,
                assignToGm: false,
                offerLetter: false,
              };
              this._confirmModelService.open(options);
              this.giaDoc = [];
            }
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
            this._primaryAppraisalFormsStore.extendGiaChecklistTimeline(
              this.calculateDaysDifference(confirmed.endDate)
            );
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
      if (confirmed) {
        this._projectService.approvePreApparisalByGm(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.approvePreApparisalByGm();
          },
          error => {
            console.log("ERROR FROM APPROVE PRE_APPRAISAL:--", error);
          }
        );
      }
    });

  }

  rejectPreApprasial() {
    const options = {
      title: 'Reject Preliminary Appraisal!',
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
      if (confirmed) {
        this._projectService.disapprovePreApparisalByGm(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.disapprovePreApparisalByGm();
          },
          error => {
            console.log("ERROR FROM APPROVE PRE_APPRAISAL:--", error);
          }
        );
      }
    });

  }

  approveExtApprasial() {
    const options = {
      title: 'Approve Extended Appraisal!',
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
      if (confirmed) {
        this._projectService.approveExtApparisalByGm(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.approveExtApparisalByGm();
          },
          error => {
            console.log("ERROR FROM APPROVE EXT_APPRAISAL:--", error);
          }
        );
      }
    });

  }

  rejectExtApprasial() {
    const options = {
      title: 'Reject Extended Appraisal!',
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
      if (confirmed) {
        this._projectService.disapproveExtApparisalByGm(this.selectedProjectId).subscribe(
          result => {
            this._primaryAppraisalFormsStore.disapproveExtApparisalByGm();
          },
          error => {
            console.log("ERROR FROM APPROVE EXT_APPRAISAL:--", error);
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
      if (confirmed) {
        this._projectService.setProjectStage(this.selectedProjectId, confirmed.status).subscribe(
          result => {
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
            options.title = 'Successfull!';
            options.message = 'Project stage has been changed';
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
    if (stage !== 'GIA') {
      const fd = new FormData();
      fd.append(this.param, this.files[0].data);
      this._projectService.uploadFiles(
        this.selectedProjectId,
        stage,
        fd
      ).subscribe(
        (result: any) => {
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
        },
        error => {
          console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
        }
      );
    } else {
      const fd = new FormData();
      fd.append(this.param, this.giaDoc[0].data);
      this._projectService.uploadFiles(
        this.selectedProjectId,
        stage,
        fd
      ).subscribe(
        (result: any) => {
          this.giaDoc = [];
          if (type === 'yesgia') {
            this.updateStageMoms('GIA_CHECKLIST', 'Checklist to FIP');
          }
        },
        error => {
          console.log("ERROR AFTER UPLOADING FINAL GIA:--", error);
        }
      );
    }
  }

  updateStageMoms(stage1, stage2) {
    this._projectService.setProjectStage(this.selectedProjectId, stage1).subscribe(
      result => {
        this._primaryAppraisalFormsStore.setProjectStage(stage2);
      },
      error => {
        console.log("ERROR AFTER UPDATING MOM STAUS:--", error);
      }
    );
  }

  approveOfferLetter() {
    var body = {
      fipComments: this.selectedProject.offerLetter.fip_comments,
      gmComments: this.selectedProject.offerLetter.gm_comments,
      expiryDate: this.selectedProject.offerLetter.expiryDate,
      gmStatus: 'Completed',
      fipStatus: this.selectedProject.offerLetter.fipMarkingStatus,
      gmResponse: 'Approved',
      fipResponse: this.selectedProject.offerLetter.fipResponse,
    }
    this._projectService.updateProposalOfferLetterStatus(
      this.selectedProjectId,
      'OFFER_LETTER',
      'PENDING',
      body
    ).subscribe(
      (result: any) => {
        this._primaryAppraisalFormsStore.setOfferLetter(body);
      },
      error => {
        console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", error);
      }
    );
  }

  disApproveOfferLetter() {
    var body = {
      fipComments: this.selectedProject.offerLetter.fip_comments,
      gmComments: this.selectedProject.offerLetter.gm_comments,
      expiryDate: this.selectedProject.offerLetter.expiryDate,
      gmStatus: 'Completed',
      fipStatus: this.selectedProject.offerLetter.fipMarkingStatus,
      gmResponse: 'Rejected',
      fipResponse: this.selectedProject.offerLetter.fipResponse,
    }
    this._projectService.updateProposalOfferLetterStatus(
      this.selectedProjectId,
      'OFFER_LETTER',
      'PENDING',
      body
    ).subscribe(
      (result: any) => {
        this._primaryAppraisalFormsStore.setOfferLetter(body);
      },
      error => {
        console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", error);
      }
    );

  }

  fipApproveOfferLetter() {
    var body = {
      fipComments: this.selectedProject.offerLetter.fip_comments,
      gmComments: this.selectedProject.offerLetter.gm_comments,
      expiryDate: this.selectedProject.offerLetter.expiryDate,
      gmStatus: this.selectedProject.offerLetter.gmMarkingStatus,
      fipStatus: 'Completed',
      gmResponse: this.selectedProject.offerLetter.gmResponse,
      fipResponse: 'Approved',
    }
    this._projectService.updateProposalOfferLetterStatus(
      this.selectedProjectId,
      'OFFER_LETTER',
      'PENDING',
      body
    ).subscribe(
      (result: any) => {
        this._primaryAppraisalFormsStore.setOfferLetter(body);
      },
      error => {
        console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", error);
      }
    );

  }

  fipDisApproveOfferLetter() {
    var body = {
      fipComments: this.selectedProject.offerLetter.fip_comments,
      gmComments: this.selectedProject.offerLetter.gm_comments,
      expiryDate: this.selectedProject.offerLetter.expiryDate,
      gmStatus: this.selectedProject.offerLetter.gmMarkingStatus,
      fipStatus: 'Completed',
      gmResponse: this.selectedProject.offerLetter.gmResponse,
      fipResponse: 'Rejected',
    }
    this._projectService.updateProposalOfferLetterStatus(
      this.selectedProjectId,
      'OFFER_LETTER',
      'PENDING',
      body
    ).subscribe(
      (result: any) => {
        this._primaryAppraisalFormsStore.setOfferLetter(body);
      },
      error => {
        console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", error);
      }
    );

  }

  markOfferLetterToFip() {
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
      comments: null,
    };

    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        var body = {
          fipComments: confirmed.comments,
          gmComments: this.selectedProject.offerLetter.gm_comments,
          expiryDate: confirmed.endDate,
          gmStatus: this.selectedProject.offerLetter.gmMarkingStatus,
          fipStatus: 'Pending',
          gmResponse: this.selectedProject.offerLetter.gmResponse,
          fipResponse: null,
        }
        this._projectService.updateProposalOfferLetterStatus(
          this.selectedProjectId,
          'OFFER_LETTER',
          'PENDING',
          body
        ).subscribe(
          (result: any) => {
            this._primaryAppraisalFormsStore.setOfferLetter(body);
          },
          error => {
            console.log("RESULT AFTER OFFERLETTER STATUS CHANGE:---", error);
          }
        );
      }
    });



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

  prepareGia() {
    this._router.navigate(['/gia-appraisal', this.selectedProjectId]);
  }

  commenceSubProjectDoc() {
    this._projectService.commenceSubProjectDoc(this.selectedProjectId).subscribe(
      result => {
        console.log("RESULT AFTER COMMENCING:--", result);
      },
      error => {
        console.log("ERROR AFTER COMMENCING:--", error);
      }
    );
  }

  commenceQPR() {
    const options = {
      title: 'QPR commenced success!!',
      message: 'OK to exit',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
    };
    this._projectService.commenceQPR(this.selectedProjectId).subscribe(
      result => {
        this._confirmModelService.open(options);
      },
      error => {
        options.title = error.error.message;
        this._confirmModelService.open(options);
        console.log('QPR COMMENCED SUCCEFFULLY:--', error);
      }
    )
  }

  goToPDRMC(flag) {
    const fd = new FormData();
    fd.append(this.param, this.pc1Files[0].data);
    this._projectService.uploadFiles(
      this.selectedProjectId,
      'UPLOAD_PC1',
      fd
    ).subscribe(
      (result: any) => {
        this.pc1Files = [];
        this.updateStageMoms('UPLOAD_PDRMC', 'Upload PDRMC Mins');
      },
      error => {
        console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
      }
    );
  }

  goToDraft() {
    const fd = new FormData();
    fd.append(this.param, this.pc1Files[0].data);
    this._projectService.uploadFiles(
      this.selectedProjectId,
      'UPLOAD_PDRMC',
      fd
    ).subscribe(
      (result: any) => {
        this.pc1Files = [];
        this.updateStageMoms('DRAFT', 'Draft');
      },
      error => {
        console.log("RESULT UPLOADING PDRMC MINS:--", error);
      }
    );

  }

  fillProposalReports() {
    this._router.navigate(['/fill-proposal-reports', this.selectedProjectId]);
  }

  commenceGrantDisbursment() {
    this._projectService.commenceGrantDisbursment(this.selectedProjectId).subscribe(
      (result: any) => {
        console.log("ERROR COMMENING GD:---", result);
      },
      error => {
        console.log("ERROR COMMENING GD:---", error);
      }
    )
  }

}
