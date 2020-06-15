import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import { ProposalSectionsStore } from "../../stores/proposal-sections/proposal-sections-store";
import { ProjectsStore } from "../../stores/projects/projects-store";
import { ProposalFormsStore } from "../../stores/proposal-forms/proposal-forms-store";
import { FormControl } from "@angular/forms";
import { PrimaryAppraisalFormsStore } from 'src/app/stores/primary-appraisal-forms/primary-appraisal-forms-store';
import { ProjectService } from 'src/app/services/project.service';
import { UsersStore } from 'src/app/stores/users/users-store';
import { UserService } from 'src/app/services/user.service';
import { AuthStore } from 'src/app/stores/auth/auth-store';

@Component({
  selector: 'app-gia-projects',
  templateUrl: './gia-projects.component.html',
  styleUrls: ['./gia-projects.component.css']
})
export class GiaProjectsComponent implements OnInit, OnDestroy {

  public Subscription: Subscription = new Subscription();

  allProposalSections: any = [];
  allProposalForms: any = [];
  allUsers: any = [];
  selectedProjectId: any = null;
  selectedProject: any = null;
  content: any = null;
  sections = new FormControl();

  apiLoading: boolean = false;

  appraisalDoc: any = [];


  @Output() viewType: string = 'extapp';

  constructor(
    private _userService: UserService,
    private _usersStore: UsersStore,
    private _projectService: ProjectService,
    private _primaryAppraisalFormsStore: PrimaryAppraisalFormsStore,
    private _activatedRoute: ActivatedRoute,
    private _authStore: AuthStore,
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedProjectId = params.get("projectId");
      console.log("SELCTED PROJECT ID IN GIA IS:--", this.selectedProjectId);
    });
    this.Subscription.add(
      this._primaryAppraisalFormsStore.state$.subscribe(data => {
        this.selectedProject = data.selectedProject;
        console.log("SELECTED PROJECT IN STORE:--", this.selectedProject);
        if (this.selectedProject) {
          if (this.selectedProject.gia.data !== null) {
            if (typeof (this.selectedProject.gia.data) === 'string') {
              this.appraisalDoc = JSON.parse(this.selectedProject.gia.data);
            } else {
              this.appraisalDoc = this.selectedProject.gia.data;
            }
          }
        }
      })
    );
    this.getAllUsers();
  }

  smeChanged($event) {
    console.log("SME CHNAGED:--", $event);
  }

  getAllUsers(){
    this._userService.getAllUsers().subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        let mainArray = [];
        mainArray.push(result);
        let usersArray = [];
        for (let i = 0; i < result.length; i++) {
          var object = {
            firstName: result[i].firstName,
            lastName: result[i].lastName,
            email: result[i].email,
            username: result[i].username,
            password: result[i].password || null,
            role: result[i].roles ?
              result[i].roles[0] ?
                result[i].roles[0].name.toLowerCase() : 'FIP'.toLowerCase()
              : null,
            smeRef: null,
            department: result[i].departmentId || null,
            active: result[i].enabled,
            eligibileFlag: false,
            qualificationFlag: false,
            roles: result[i].roles,
            orgId: result[i].orgId,
            orgName: result[i].orgName,
            org: [{ 'id': result[i].orgId, 'name': result[i].orgName }]
          }
          usersArray.push(object);
        }
        this._usersStore.setAllUsers(usersArray);

        this.Subscription.add(
          this._usersStore.state$.subscribe(data => {
            this.allUsers = data.users;
            console.log("ALL USERS ARE:--", this.allUsers);
          })
        );
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
      forms: null
    }
    for (let i = 0; i < this.sections.value.length; i++) {
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
    object.forms = this.sections.value;
    this.appraisalDoc.push(object);
    console.log("APPRESIAL DOC:--", this.appraisalDoc);
    this.content = null;
    this.sections.reset();
  }

  submitGia() {
    this._projectService.submitGia(this.selectedProjectId, { data: JSON.stringify(this.appraisalDoc) }).subscribe(
      (result: any) => {
        console.log("RESULT AFTER SUBMIT GIA:---", result);
      },
      error => {
        console.log("RESULT AFTER SUBMIT GIA:---", error);
      }
    );
  }

  removeEntry(i) {
    this.appraisalDoc.splice(i, 1);
  }


  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
