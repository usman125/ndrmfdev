import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { currentUserReplay, setCurrentUser } from "../../stores/users/user-replay";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { ConfirmModelService } from 'src/app/services/confirm-model.service';
import { AuthStore } from 'src/app/stores/auth/auth-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [ConfirmModelService]
})
export class EditUserComponent implements OnInit {

  selectedUserId: any = null;
  apiLoading: any = null;
  selectedUser: any = null;

  editUserForm: FormGroup;

  allUserTypes: any = [];
  allRoles: any = [];

  Subscription: Subscription = new Subscription();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _authStore: AuthStore,
    private _confirmModelService: ConfirmModelService,
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
      active: [null],
    });
  }

  ngOnInit(): void {
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.apiLoading = data.auth.apiCall;
      })
    );

    this._activatedRoute.paramMap.subscribe(params => {
      this.selectedUserId = params.get("userId");
      this._userService.getUserById(this.selectedUserId).subscribe(
        (result: any) => {
          console.log("RESULT FROM USER INFO:---", result);
          var object = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            username: result.username,
            password: result.password || null,
            role: result.roles ?
              result.roles[0] ?
                result.roles[0].name.toLowerCase() : 'FIP'.toLowerCase()
              : null,
            smeRef: null,
            department: result.departmentId || null,
            active: result.enabled,
            eligibileFlag: false,
            qualificationFlag: false,
            roles: result.roles,
            orgId: result.orgId,
            orgName: result.orgName,
            org: [{ 'id': result.orgId, 'name': result.orgName }],
            sap: result.sap,
          }
          setCurrentUser(
            object.id,
            object.firstName,
            object.lastName,
            object.email,
            object.role,
            object.smeRef,
            object.department,
            object.username,
            object.password,
            object.active,
            object.eligibileFlag,
            object.qualificationFlag,
            object.roles,
            object.orgId,
            object.orgName,
            object.sap
          );
          this.getRolesAndOrgs();
        },
        error => {
          console.log("RESULT FROM USER INFO:---", error)
        }
      );
    });
    currentUserReplay.subscribe((data) => {
      this.selectedUser = data;
      console.log("USER IN EDIT USER:---", this.selectedUser);
      // if (this.selectedUser.role !== 'fip'){

      this.editUserForm.patchValue({
        firstName: this.selectedUser.firstName,
        lastName: this.selectedUser.lastName,
        email: this.selectedUser.email,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        department: this.selectedUser.department,
        role: this.selectedUser.roles,
        org: this.selectedUser.org,
        active: this.selectedUser.active,
      }, { onlySelf: true })
      // }
      // if (th)
      if (this.selectedUser.role === 'fip' && this.selectedUser.sap === true) {
        this.editUserForm.controls['firstName'].disable({ onlySelf: true });
        this.editUserForm.controls['lastName'].disable({ onlySelf: true });
        this.editUserForm.controls['email'].disable({ onlySelf: true });
        this.editUserForm.controls['username'].disable({ onlySelf: true });
      } else {
        this.editUserForm.controls['firstName'].disable({ onlySelf: true });
        this.editUserForm.controls['lastName'].disable({ onlySelf: true });
        this.editUserForm.controls['email'].disable({ onlySelf: true });
        this.editUserForm.controls['username'].disable({ onlySelf: true });
        this.editUserForm.controls['password'].disable({ onlySelf: true });
        this.editUserForm.controls['role'].clearValidators();
        this.editUserForm.controls['role'].disable({ onlySelf: true });
        this.editUserForm.controls['org'].clearValidators();
        this.editUserForm.controls['org'].disable({ onlySelf: true });
      }
    });
  }

  getRolesAndOrgs() {
    this._authStore.setLoading();
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
        this._authStore.removeLoading();
      },
      error => {
        this._authStore.removeLoading();
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

  editUser(values) {
    // this._userService.sub 
    // values.orgId = values.org[0].id;
    // values.roleId = values.role[0].id;
    if (this.selectedUser.role === 'fip') {
      values.firstName = this.selectedUser.firstName;
      values.lastName = this.selectedUser.lastName;
      values.email = this.selectedUser.email;
      values.username = this.selectedUser.username;
      // values.password = this.editUserForm.password;
      // values.password = this.selectedUser;
    }
    const options = {
      title: 'Success!',
      message: 'Information updated .',
      cancelText: 'CANCEL',
      confirmText: 'OK',
      add: true,
      confirm: false,
    };
    this._authStore.setLoading();
    // console.log("EDIT USER VALUES:---", values);
    this._userService.editUser(values, this.selectedUser.id).subscribe(
      (result: any) => {
        this._authStore.removeLoading();
        options.message = result.message;
        this._confirmModelService.open(options);
        console.log("RESULT AFTER UPDATING USER:---", result);
      },
      error => {
        this._authStore.removeLoading();
        options.message = error.error.message;
        options.title = 'Error';
        this._confirmModelService.open(options);
        console.log("RESULT AFTER UPDATING USER:---", error);
      }
    );
  }

}
