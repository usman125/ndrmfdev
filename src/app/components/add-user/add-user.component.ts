import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthStore } from "../../stores/auth/auth-store";
import { DepartmentsStore } from "../../stores/departments/departments-store";
import { currentUserReplay, setCurrentUser } from "../../stores/users/user-replay";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { UsersStore } from "../../stores/users/users-store";
import { SettingsService } from 'src/app/services/settings.service';
import { DesignationsStore } from 'src/app/stores/designations/designations-store';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService]
})
export class AddUserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  allDepartments: any = [];
  allDesignations: any = [];
  Subscription: Subscription = new Subscription();
  allRoles: any = []
  allUserTypes: any = []


  constructor(
    private _formBuilder: FormBuilder,
    private _departmentsStore: DepartmentsStore,
    private _designationsStore: DesignationsStore,
    private _authStore: AuthStore,
    private _userService: UserService,
    private _settingsService: SettingsService,
    private _router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Users');
    });

    this._buildAddUserForm();
    this.getRolesAndOrgs();
    this.getAllDepartments();
    this.getAllDesignations();

    this.Subscription.add(
      this._departmentsStore.state$.subscribe((data) => {
        this.allDepartments = data.departments;
        console.log("ALL DEPARTMENTS:--", this.allDepartments);
      })
    );
    this.Subscription.add(
      this._designationsStore.state$.subscribe((data) => {
        this.allDesignations = data.designations;
        console.log("ALL DESIGNATIONS:--", this.allDesignations);
      })
    );
  }

  private _buildAddUserForm() {
    this.addUserForm = this._formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null, Validators.required],
      department: [null],
      designation: [null],
      role: [null, Validators.required],
      org: [null, Validators.required],
      active: [true],
    });
  }


  getRolesAndOrgs() {
    this._userService.getAllUserOrgs().subscribe(
      result => {
        console.log("ALL ORGS:--", result);
        this.allUserTypes = result;
      },
      error => {
        console.log("ERROR FROM ALL ORGS:--", error);
      }
    );
  }

  getAllDepartments() {
    // this.apiLoading = true;
    this._settingsService.getAllDepartments().subscribe(
      (result: any) => {
        console.log("RESULT FROM DEPARTMENTS:--", result);
        this._departmentsStore.addAllDepartments(result);
        // this.apiLoading = false;
      },
      error => {
        // this.apiLoading = false;
        console.log("ERROR FROM DEPARTMENTS:--", error);
      }
    );
  }

  getAllDesignations() {
    // this.apiLoading = true;
    this._settingsService.getAllDesignations().subscribe(
      (result: any) => {
        console.log("RESULT FROM DEESIGNATIONS:--", result);
        this._designationsStore.addAllDesignations(result);
        // this.apiLoading = false;
      },
      error => {
        // this.apiLoading = false;
        console.log("ERROR FROM DEESIGNATIONS:--", error);
      }
    );
  }


  roleChanged($event) {
    console.log("ROLE CHANGED:--", $event, this.addUserForm.value);
  }


  orgChanged($event) {
    console.log("ORG CHANGED:---", $event);
    this.addUserForm.patchValue({ 'role': null }, { onlySelf: true });
    this.allRoles = $event.value.roles;
  }

  departmentChanged($event) {
    console.log("DEPARTMENT CHANGED:--", $event);
  }

  addUser(values) {
    let array = [];
    array.push(values.role);
    console.log("ADD NEW USER:--", values);
    this._userService.addUser(values).subscribe(
      result => {
        console.log("RESULT AFTER ADDING USER:---", result);
        // this._usersStore.addUser(
        //   values.firstName,
        //   values.lastName,
        //   values.email,
        //   values.username,
        //   values.password,
        //   values.role.name,
        //   values.smeRef,
        //   values.department,
        //   values.active,
        //   false,
        //   false,
        //   array,
        //   values.org.id,
        // );
        this.addUserForm.reset();
      },
      error => {
        console.log("ERROR AFTER ADDING USER:---", error);
      }
    );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  goBack() {
    setCurrentUser(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      false,
      false,
      false,
      null,
      null,
      null,
      false,
    );
    this.addUserForm.reset();
    this._router.navigate(['/users']);
  }



}
