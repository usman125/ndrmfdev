import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { currentUserReplay, setCurrentUser } from "../../stores/users/user-replay";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [UserService]
})
export class EditUserComponent implements OnInit {

  selectedUserId: any = null;
  selectedUser: any = null;

  editUserForm: FormGroup;

  allUserTypes: any = [];
  allRoles: any = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
  ) {
    this._buildEditUserForm();
  }


  private _buildEditUserForm() {
    this.editUserForm = this._formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null],
      department: [null],
      role: [null, Validators.required],
      org: [null, Validators.required],
      active: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getRolesAndOrgs();
    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedUserId = params.get("username");
      // const project = this._projectsStore.getProject(this.selectedProjectId);
      // this.selectedProject = this._projectsStore.getProject(this.selectedProjectId);
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
    });
    currentUserReplay.subscribe((data) => {
      this.selectedUser = data;
      console.log("USER IN EDIT USER:---", this.selectedUser);
      this.editUserForm.patchValue({
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        department: this.selectedUser.department,
        role: this.selectedUser.roles,
        org: this.selectedUser.org,
        active: this.selectedUser.firstName,
      }, { onlySelf: true })
    });
  }

  getRolesAndOrgs() {
    this._userService.getAllUserOrgs().subscribe(
      result => {
        console.log("ALL ORGS:--", result);
        this.allUserTypes = result;
        for (let i = 0; i < this.allUserTypes.length; i++) {
          if (this.allUserTypes[i].id === this.selectedUser.org[0].id) {
            this.allRoles = this.allUserTypes[i].roles;
            break;
          }
        }
      },
      error => {
        console.log("ERROR FROM ALL ORGS:--", error);
      }
    );
  }

  roleChanged($event) {
    console.log("ROLE CHANGED:--", $event, this.editUserForm.value);
  }


  orgChanged($event) {
    console.log("ORG CHANGED:---", $event);
    this.editUserForm.patchValue({ 'role': null }, { onlySelf: true });
    this.allRoles = $event.value.roles;
  }

  departmentChanged($event) {
    console.log("DEPARTMENT CHANGED:--", $event);
  }

  goBack() {
    this._router.navigate(['users']);
  }

}
