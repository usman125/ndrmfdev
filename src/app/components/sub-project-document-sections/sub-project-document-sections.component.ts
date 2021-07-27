import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubProjectDocSectionsStore } from 'src/app/stores/sub-proj-doc-sections/sub-proj-doc-sections-store';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AccreditationCommentsMatrixStore } from 'src/app/stores/accreditation-comments-matrix/accreditation-comments-matrix-store';

@Component({
  selector: 'app-sub-project-document-sections',
  templateUrl: './sub-project-document-sections.component.html',
  styleUrls: ['./sub-project-document-sections.component.css'],
  providers: [ConfirmModelService]
})
export class SubProjectDocumentSectionsComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  loggedUser: any = null;
  selectedRequestId: any = null;

  allSections: any = [];
  sectionComments: any = null;
  sectionStats: any = null;
  selectedSection: any = null;

  assignedSections: any = [];
  assignedReviewsSections: any = [];

  pendingReviewsSections: any = [];
  completedReviewsSections: any = [];

  unAssignedSections: any = [];

  dataSource: any = [];
  allDms: any = [];

  apiLoading: boolean = false;
  commentsFlag: boolean = false;
  @Input() viewType: any = null;

  filterType: any = null;

  dmUser: any = null;
  selectedRequest: any = null;

  unAssignSections = new FormControl();
  reviewUsers = new FormControl();
  filterQuery: any = null;
  allUsers: any = null;
  reviewersArray: any = null;

  assignedDmTask: any = null;
  assignedReviewTask: any = null;

  changeStatusLoader: boolean = false;

  constructor(
    private _subProjectDocSectionsStore: SubProjectDocSectionsStore,
    private _projectService: ProjectService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _confirmModelService: ConfirmModelService,
    private _accreditationCommentsMatrixStore: AccreditationCommentsMatrixStore,
    private _cdr: ChangeDetectorRef,
  ) {
    this.reviewUsers.setValidators([Validators.required]);
  }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedRequestId = params.get("requestId");
    });
    this.Subscription.add(
      this._subProjectDocSectionsStore.state$.subscribe(data => {
        this.apiLoading = false;
        if (data.request !== null) {
          this.selectedRequest = data.request;
          this.allSections = [];
          this.assignedSections = [];
          this.unAssignedSections = [];
          this.assignedReviewsSections = [];
          this.pendingReviewsSections = [];
          this.completedReviewsSections = [];
          var pendingCount = 0;
          var reviewsCount = 0;
          this.allSections = data.request.sections.map((c) => {
            c.template = typeof (c.template) === 'string' ? JSON.parse(c.template) : c.template;
            c.data = typeof (c.data) === 'string' ? JSON.parse(c.data) : c.data;
            if (c.assigned) {
              this.assignedSections.push(c);
              if (c.reviewStatus === 'Pending') {
                this.assignedReviewsSections.push(c);
              }
            } else {
              this.unAssignedSections.push(c);
            }
            if (c.reviewStatus === 'Pending') {
              this.pendingReviewsSections.push(c);
              pendingCount = pendingCount + 1;
            }
            if (c.reviewStatus === null) {
              this.pendingReviewsSections.push(c);
            }
            if (c.reviewStatus === 'Review Completed') {
              this.completedReviewsSections.push(c);
              reviewsCount = reviewsCount + 1;
            }
            this.sectionStats = {
              pendingCount,
              reviewsCount
            }
            return {
              ...c,
            }
          });
          if (this.filterType === null) {
            this.dataSource = this.allSections;
          }
          if (this.filterType === 'pending') {
            this.dataSource = this.pendingReviewsSections;
          }
          if (this.filterType === 'completed') {
            this.dataSource = this.completedReviewsSections;
          }
          if (this.filterType === 'reset') {
            this.dataSource = this.allSections;
          }

          this.allSections.sort((a, b) => (a.quarter > b.quarter) ? 1 : ((b.quarter > a.quarter) ? -1 : 0));

          this.apiLoading = false;
          console.log("\nALL SECTIONS:--\n", this.allSections,
            '\nASSIGNED SECTIONS:--\n', this.assignedSections,
            '\nASSIGNED REVIEWS SECTIONS:--\n', this.assignedReviewsSections,
            '\nUN-ASSIGNED SECTIONS:--\n', this.unAssignedSections,
            '\nPENDING REVIEWS SECTIONS:--\n', this.pendingReviewsSections,
            '\nCOMPLETED REVIEWS SECTIONS:--\n', this.completedReviewsSections,
            '\nSELECTED REQUEST IS:--\n', this.selectedRequest,
          );
          if (data.request.dmpamTasks) {
            data.request.dmpamTasks.forEach(element => {
              if (element.assignee.id === this.loggedUser.id) {
                this.assignedDmTask = element;
                if (element.status === 'Approved')
                  this.reviewUsers.disable({ onlySelf: true });
                else
                  this.reviewUsers.enable({ onlySelf: true });
              }
              if (element.tasks) {
                element.tasks.forEach(ele => {
                  if (ele.assignee.id === this.loggedUser.id) {
                    this.assignedReviewTask = ele;
                  }
                });
              }
            });
          }
        }
      })
    );
    if (this.loggedUser.role === 'process owner') {
      this.getDmPams();
    }
    this.getAllUsers();
  }

  getDmPams() {
    this._userService.getDmPams().subscribe(
      (result: any) => {
        this.allDms = result;
        console.log("ALL DM PAMS:--", this.allDms);
      },
      (error: any) => {
        console.log("ALL DM PAMS:--", error);
      }
    )
  }

  addSectionReviews() {
    var object = {
      comments: JSON.stringify(this.sectionComments)
    }
    // console.log("REVIEW TO ADD FOR SECTION:--", object, this.selectedSection);
    this._projectService.submitSubProjectDocReview(this.selectedSection, object).subscribe(
      result => {
        // console.log("RESULT ADDING REVIEW:--", result);
        this._subProjectDocSectionsStore.changeSectionReviewStatus(this.selectedSection, 'Review Completed');
        this.sectionComments = null;
        this._cdr.detectChanges();
      },
      error => {
        console.log("RESULT ADDING REVIEW:--", error);
      }
    )
  }

  filterSections(filter) {
    this.filterType = filter;
    if (filter === 'pending') {
      this.dataSource = this.pendingReviewsSections;
    }
    if (filter === 'completed') {
      this.dataSource = this.completedReviewsSections;
    }
    if (filter === 'reset') {
      this.dataSource = this.allSections;
      this.filterType = null;
    }
  }


  onSubmit($event, section) {
    var object = {
      data: JSON.stringify($event.data),
      id: section.id
    }
    console.log(object, section, this.selectedRequestId);
    this._projectService.submitSubProjectDocSection(
      this.selectedRequestId,
      object
    ).subscribe(
      result => {
        console.log("RESULT ADDING SECTION DATA:--", result);
        this._subProjectDocSectionsStore.addSectionData(section, $event.data);
      },
      error => {
        console.log("RESULT ADDING SECTION DATA:--", error);
      }
    );
  }

  assignForReview(section) {
    const options = {
      title: 'Select Start Date & End Date for the task!',
      message: 'Click "OK" to Exit!',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        // console.log("CONFIRMED FROM MARK GIA MODEL", confirmed, section);
        this._projectService.requestSubProjectDocReview(section.id).subscribe(
          (result: any) => {
            console.log("REUSLT REVIEW ADDED:--", result);
            const options = {
              title: result.message,
              message: 'OK to Exit!',
              cancelText: 'CANCEL',
              confirmText: 'OK',
              add: true,
              confirm: false,
            };
            this._subProjectDocSectionsStore.addSectionReview(section);
            this._confirmModelService.open(options);
          },
          (error: any) => {
            console.log("REUSLT REVIEW ADDED:--", error);
          },
        )
      }
    });
  }

  assignDmUsersForReviews() {
    // console.log("ASSIGN USERS FOR REVIEWS:---", this.reviewUsers.value);
    const options = {
      title: 'Assign Users For Reviews!',
      message: 'Select a due date and click "OK"',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };
    this._confirmModelService.open(options);
    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        let body = {
          usersId: [this.dmUser.id],
          startDate: confirmed.startDate,
          endDate: confirmed.endDate,
          comments: confirmed.comments,
        }
        console.log("REVIEW ARRAY:--", confirmed, body);
        this._projectService.addSubProjectDmPamTasks(this.selectedRequestId, body).subscribe(
          (result: any) => {
            const options = {
              title: 'Tasks added successfully!',
              message: '',
              cancelText: 'CANCEL',
              confirmText: 'OK',
              add: true,
              confirm: false,
            };
            // this._qprSingleRequestStore.addExistedTasksForQpr(newArray, existedArray);
            // this._qprSingleRequestStore.addNewTasksForQpr(newArray, existedArray);
            this._confirmModelService.open(options);
            // this.reviewUsers.reset();
            // this.aurLoader = false;
            console.log("RESULT ADDING TASKS:--", result);
          },
          (error: any) => {
            const options = {
              title: 'Tasks added successfully!',
              message: '',
              cancelText: 'CANCEL',
              confirmText: 'OK',
              add: true,
              confirm: false,
            };
            options.title = error.error.message;
            this._confirmModelService.open(options);
            // this.aurLoader = false;
            console.log("RESULT ADDING TASKS:--", error);
          }
        );
      }
    });
  }

  assignUsersForReviews(type, id) {
    // console.log("ASSIGN USERS FOR REVIEWS:---", this.reviewUsers.value);
    const options = {
      title: 'Assign Users For Reviews!',
      message: 'Select a due date and click "OK"',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };


    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        // console.log("CONFIRMED FROM ASSIGN REVIEWS MODEL", confirmed);
        let reviewersArray = [];
        let storeArray = [];
        if (this.reviewUsers.value) {
          for (let i = 0; i < this.reviewUsers.value.length; i++) {
            var object = {
              id: null,
              assignee: this.reviewUsers.value[i],
              comments: null,
              assigned: false,
              status: 'Pending',
              subStatus: null,
            }
            storeArray.push(object);
            reviewersArray.push(this.reviewUsers.value[i].id)
          }
        }
        this.reviewersArray = reviewersArray;
        let body = {
          usersId: this.reviewersArray,
          initialAdvanceId: id,
          comments: confirmed.comments,
        }
        this.assignUsersForReviewsByDmpam(body, storeArray);
        console.log("REVIEW ARRAY:--", reviewersArray, body);
      }
    });
  }

  assignUsersForReviewsByDmpam(body, storeArray) {
    this._projectService.assignUsersForReviewsByDmpam(
      body.initialAdvanceId,
      body
    ).subscribe(
      (result: any) => {
        // console.log("RESULT ASSIGNING REVIEWS:---", result);
        this._subProjectDocSectionsStore.assignUsersForReviewsByDmpam(body.initialAdvanceId, storeArray);
        const options = {
          title: result.message,
          message: 'Press OK or esc to canel!',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        this.reviewUsers.reset();
      }, error => {
        const options = {
          title: error.error.message,
          message: 'Press OK or esc to canel!',
          cancelText: 'CANCEL',
          confirmText: 'OK',
          add: true,
          confirm: false,
        };
        this._confirmModelService.open(options);
        console.log("RESULT ASSIGNING REVIEWS:---", error);
      }
    );

  }

  toggleComments(task) {
    this.commentsFlag = !this.commentsFlag;
    console.log("TOGGLE COMMENTS:---", task);
    this._accreditationCommentsMatrixStore.addCommentsArray(task.commentsMatrix);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  compareSmeObjects(o1: any, o2: any): boolean {
    // console.log("COMPARE SME:--", o1, o2)
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }

  checkQuarterUserDisabled(item) {
    if (this.assignedDmTask) {
      if (this.assignedDmTask !== null && this.assignedDmTask.tasks) {

        // console.log("CHECK DISABLED CALLED:--", this.selectedRequest.quarterAdvanceList[this.step]);
        for (let i = 0; i < this.assignedDmTask.tasks.length; i++) {
          let key = this.assignedDmTask.tasks[i];
          // if (key) {
          if (key.assignee.id === item.id && key.status === 'Pending') {
            return true;
          }
          // }
        }
        return false;
      }
    }
  }

  getAllUsers() {
    this._userService.getAllDepartmentUsers().subscribe(
      (result: any) => {
        console.log("RESULT DEPARTMENT USERS:--", result);
        this.allUsers = [];
        for (var key of Object.keys(result)) {
          let object = {
            name: null,
            users: []
          }
          console.log(key + " -> " + result[key])
          object.name = key;
          for (let i = 0; i < result[key].length; i++) {
            object.users.push(result[key][i]);
          }
          this.allUsers.push(object);
        }
        // console.log("USERS FOR DROP DOWN:---", this.allUsers);
      },
      error => {
        // this._authStore.removeLoading();
        console.log("ERROR FROM ALL USERS:--", error);
      }
    );
  }

  disableDmPamOption(object) {
    if (this.selectedRequest !== null && this.selectedRequest.dmpamTasks) {
      for (let i = 0; i < this.selectedRequest.dmpamTasks.length; i++) {
        let x = this.selectedRequest.dmpamTasks[i];
        if (x.assignee.id === object.id)
          return true;
      }
    }
  }

  addUnAssignedSectionReview(id, taskId) {
    var sectionIds: any = [];
    if (this.unAssignSections.value) {
      for (let i = 0; i < this.unAssignSections.value.length; i++) {
        let key = this.unAssignSections.value[i];
        if (key.id !== 'pip')
          sectionIds.push(key.id)
      }
    }
    var object = {
      comment: this.sectionComments,
      sectionIds: sectionIds.length ? sectionIds : null
    }

    this._projectService.submitSubProjectDocumentGeneralReview(
      id,
      taskId,
      object
    ).subscribe(
      result => {
        this.sectionComments = null;
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
        this._subProjectDocSectionsStore.submitUserReview(id, taskId);
      },
      error => {
        console.log("ERROR AFTER PROPOSAL GENERAL REVIEW:--", error);
      },
    );
  }

  dmpamTasksCount() {

  }

  checkDisabled(obj) {
    if (obj.status === 'Completed')
      return true;

    return false;
  }

  changeSubProjectDocDmPamTaskStatus(id, status) {
    const options = {
      title: 'Are You Sure?',
      message: 'This will change the status of the assigned task!',
      cancelText: 'NO',
      confirmText: 'YES',
      confirmAction: true,
    };
    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.changeStatusLoader = true;
        console.log("CHANGE SPD DM PAM TASK STATUS:--", confirmed);
        let newStatus = status === 'APPROVED' ? 'Approved' : 'Rejected';
        this._projectService.changeSubProjectDocDmPamTaskStatus(id, status).subscribe(
          (result: any) => {
            this._subProjectDocSectionsStore.changeSubProjectDocDmPamTaskStatus(id, newStatus);
            this.changeStatusLoader = false;
            console.log("RESULT CHANGING STATUS:--", result);
          },
          error => {
            console.log("RESULT CHANGING STATUS:--", error);
          }
        );
      }
    })
  }

  changeSubProjectDocStatus() {
    const options = {
      title: 'Please select a status?',
      message: 'This will change the status of current sub process scheme document!',
      cancelText: 'NO',
      confirmText: 'YES',
      changeSpdStatus: true,
    };
    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        this.changeStatusLoader = true;
        let newStatus = null;
        if (confirmed.status === 'Approved')
          newStatus = 'APPROVED'
        else if (confirmed.status === 'Conditional Approved')
          newStatus = 'CONDITIONAL_APPROVED'
        else if (confirmed.status === 'Rejected')
          newStatus = 'REJECTED'
        console.log("CHANGE SPD STATUS:--", confirmed, newStatus);
        // this._subProjectDocSectionsStore.changeSubProjectDocStatus(confirmed.status);
        this._projectService.changeSubProjectDocStatus(this.selectedRequestId, newStatus).subscribe(
          (result: any) => {
            this._subProjectDocSectionsStore.changeSubProjectDocStatus(confirmed.status);
            this.changeStatusLoader = false;
            console.log("RESULT CHANGING STATUS:--", result);
          },
          error => {
            console.log("RESULT CHANGING STATUS:--", error);
          }
        );
      }
    })
  }

  closeCommentsMatrix() {
    // console.log("CLOSE COMMENTS MATRIX FORM:---");
    this.commentsFlag = !this.commentsFlag;
  }

  // toggleComments(){

  // }

}
