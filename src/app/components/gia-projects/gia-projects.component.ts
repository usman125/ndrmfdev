import { Component, OnInit, OnDestroy, Output, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
// import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
// import { ProjectsStore } from "../../stores/projects/projects-store";
// import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { FormControl } from "@angular/forms";
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectService } from 'src/app/services/project.service';
// import { UsersStore } from 'src/app/stores/users/users-store';
import { UserService } from 'src/app/services/user.service';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-gia-projects',
  templateUrl: './gia-projects.component.html',
  styleUrls: ['./gia-projects.component.css'],
  providers: [ConfirmModelService]
})
export class GiaProjectsComponent implements OnInit, OnDestroy {

  @Output() show: any = 'pip';
  @Output() proMonths: any = null;

  public Subscription: Subscription = new Subscription();

  allProposalSections: any = [];
  allProposalForms: any = [];
  allUsers: any = [];
  selectedProjectId: any = null;
  selectedProjectInfo: any = null;
  sectionStats: any = null;
  selectedProject: any = null;
  content: any = null;
  generalRemarks: any = null;
  assignedSection: any = null;
  loggedUser: any = null;

  sections = new FormControl();
  reviewUsers = new FormControl();

  apiLoading: boolean = false;

  appraisalDoc: any = [];
  reviewersArray: any = [];


  @Input() viewType: string = 'add-gia';

  constructor(
    private _userService: UserService,
    private _location: Location,
    private _projectService: ProjectService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _activatedRoute: ActivatedRoute,
    private _authStore: AuthStore,
    private _router: Router,
    private _confirmModelService: ConfirmModelService,
  ) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      console.log("SELCTED PROJECT ID IN GIA IS:--", this.selectedProjectId);
    });
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.apiLoading = true;
        this.selectedProject = data.selectedProject;
        if (this.selectedProject) {
          if (this.selectedProject.gia.data !== null) {
            if (typeof (this.selectedProject.gia.data) === 'string') {
              this.appraisalDoc = JSON.parse(this.selectedProject.gia.data);
            } else {
              this.appraisalDoc = this.selectedProject.gia.data;
            }
          }
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
            template: this.selectedProject.implementationPlan,
            templateType: null,
            totalScore: null,
          }
          this.selectedProject.sections.push(pipSection);
          var reviewsCount = 0;
          var assignedUsers = [];
          if (this.selectedProject.gia.reviews !== null) {
            for (let i = 0; i < this.selectedProject.gia.reviews.length; i++) {
              var key = this.selectedProject.gia.reviews[i];
              if (key.comments !== null) {
                reviewsCount = reviewsCount + 1;
              } else {
                assignedUsers.push(key.assignee);
              }
              if (key.assigned === true) {
                this.assignedSection = key;
              }
            }
          }
          this.reviewUsers.patchValue(assignedUsers, { onlySelf: true });
          this.sectionStats = {
            reviewsCount,
            pendingCount: assignedUsers.length - reviewsCount
          }
          this.selectedProject.sections.forEach(c => {
            let result = c.name.match(/glance/g);
            let result1 = c.name.match(/Beneficiaries/g);
            if (result !== null) {
              if (c.data) {
                this.selectedProjectInfo = typeof (c.data) === 'string' ? JSON.parse(c.data) : c.data;
                this._authStore.setProjectMonths(c.data.duration);
              }
            }
            if (this.selectedProjectInfo) {
              if (result1 !== null) {
                if (c.data) {
                  this.selectedProjectInfo.pb = typeof (c.data) === 'string' ? JSON.parse(c.data) : c.data;
                }
              }
            }
          });
          this.apiLoading = false;
        }
        console.log("REVIEW COUNT + ASSIGNED:--\n", reviewsCount,
          "\n", assignedUsers,
          "\n", this.selectedProject,
          "\n", this.selectedProjectInfo);
      })
    );
    this.getAllUsers();
    this.getProjectDetails();
  }

  getProjectDetails() {
    this.apiLoading = true;
    this._projectService.getSingleProject(this.selectedProjectId).subscribe(
      (result: any) => {
        this._primaryAppraisalFormsStore.addSelectedProject(result);
        // console.log("PROJECT DETAILS FROM DATABASE:--", this.selectedProject);
        this.apiLoading = false;
      },
      error => {
        console.log("ERROR DETAILS FROM DATABASE:--", error);
      },
    );
  }

  smeChanged($event) {
    console.log("SME CHNAGED:--", $event);
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
        console.log("USERS FOR DROP DOWN:---", this.allUsers);
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FROM ALL USERS:--", error);
      }
    );
  }

  addSection() {
    var object = {
      content: this.content,
      forms: [],
      pip: false
    }
    if (this.sections.value) {
      for (let i = 0; i < this.sections.value.length; i++) {
        if (this.sections.value[i].id === 'pip') {

        } else {
          if (typeof (this.sections.value[i].template) === 'string') {
            this.sections.value[i].template = JSON.parse(this.sections.value[i].template);
          } else {
            this.sections.value[i].template = this.sections.value[i].template;
          }
          if (typeof (this.sections.value[i].data) === 'string') {
            this.sections.value[i].data = JSON.parse(this.sections.value[i].data);
          } else {
            this.sections.value[i].data = this.sections.value[i].data;
          }
        }
      }
      object.forms = this.sections.value;
    }
    this.appraisalDoc.push(object);
    console.log("APPRESIAL DOC:--", this.appraisalDoc);
    this.content = null;
    this.sections.reset();
  }

  submitGia() {
    const options = {
      title: 'Successfull!',
      message: 'GIA saved',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };

    let reviewersArray = [];
    let storeArray = [];
    if (this.reviewUsers.value) {
      for (let i = 0; i < this.reviewUsers.value.length; i++) {
        var object = {
          id: null,
          assignee: this.reviewUsers.value[i],
          comments: null,
          assigned: false
        }
        storeArray.push(object);
        reviewersArray.push(this.reviewUsers.value[i].id)
      }
    }
    this.reviewersArray = reviewersArray;
    console.log("REVIEW ARRAY:--", reviewersArray);

    this._projectService.submitGia(
      this.selectedProjectId,
      {
        data: JSON.stringify(this.appraisalDoc),
        reviewers: this.reviewersArray
      }
    ).subscribe(
      (result: any) => {
        console.log("RESULT AFTER SUBMIT GIA:---", result);
        this._primaryAppraisalFormsStore.submitGia(this.appraisalDoc);
        if (reviewersArray.length) {
          this.reviewUsers.patchValue(reviewersArray, { onlySelf: true });
          this._primaryAppraisalFormsStore.addGiaReviewers(storeArray);
        }
        this._confirmModelService.open(options);
      },
      error => {
        console.log("RESULT AFTER SUBMIT GIA:---", error);
      }
    );
  }

  addUsersForReview() {
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
        let reviewersArray = [];
        let storeArray = [];
        if (this.reviewUsers.value) {
          for (let i = 0; i < this.reviewUsers.value.length; i++) {
            var object = {
              id: null,
              assignee: this.reviewUsers.value[i],
              comments: null,
              assigned: false
            }
            storeArray.push(object);
            reviewersArray.push(this.reviewUsers.value[i].id)
          }
        }
        this.reviewersArray = reviewersArray;
        console.log("REVIEW ARRAY:--", reviewersArray);
        this._projectService.submitGia(
          this.selectedProjectId,
          {
            data: JSON.stringify(this.appraisalDoc),
            reviewers: this.reviewersArray
          }
        ).subscribe(
          (result: any) => {
            console.log("RESULT AFTER SUBMIT GIA:---", result);
            options.title = 'Users Assigned Successfully!'
            options.message = 'click OK to close!'
            this._confirmModelService.open(options);
            // this._primaryAppraisalFormsStore.submitGia(this.appraisalDoc);
          },
          error => {
            console.log("RESULT AFTER SUBMIT GIA:---", error);
          }
        );
        console.log("CONFIRMED FROM ASSIGN REVIEWS MODEL", confirmed);
      }
    });
  }

  markGiaToGm() {
    const options = {
      title: 'Mark GIA to GM!',
      message: 'Select a due date and click "OK"',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: false,
      confirm: true,
    };

    this._confirmModelService.open(options);

    this._confirmModelService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        console.log("CONFIRMED FROM MARK GIA MODEL", confirmed);
      }
    });
  }

  removeEntry(i) {
    this.appraisalDoc.splice(i, 1);
  }

  addReview($event) {
    console.log("CHANGE CALYED:--", $event);
    this.generalRemarks = $event;
  }

  submitGiaReviews() {
    this._projectService.submitGiaReview(
      this.selectedProjectId,
      {
        comments: this.generalRemarks
      }
    ).subscribe(
      result => {
        console.log("RESULT AFTER ADDING REVIEW:--", result);
        this._primaryAppraisalFormsStore.updateGiaReview(this.assignedSection, this.generalRemarks);
        this.generalRemarks = null;
      },
      error => {
        console.log("ERROR AFTER ADDING REVIEW:--", error);
      }
    )
  }


  compareSmeObjects(o1: any, o2: any): boolean {
    // console.log("COMPARE SME:--", o1, o2)
    if (o2) {
      return o1.name === o2.name && o1.id === o2.id;
    }
    return false;
  }


  viewGiaCommentsMatrix() {
    this._router.navigate(['/gia-comments-matrix', this.selectedProjectId]);
  }

  ngOnDestroy() {
    this._authStore.setProjectMonths(0);
    this.Subscription.unsubscribe();
  }

  goBack() {
    this._location.back();
  }

}
