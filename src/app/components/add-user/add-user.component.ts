import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthStore } from "../../stores/auth/auth-store";
import { UsersStore } from "../../stores/users/users-store";
import { SmeStore } from "../../stores/sme/sme-store";
import { DepartmentsStore } from "../../stores/departments/departments-store";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  allSmes: any = [];
  allDepartments: any = [];
  Subscription: Subscription = new Subscription();
  allRoles: any = [
    { name: 'SME', key: 'roleSme' },
    { name: 'Department', key: 'roleDept' },
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private _smeStore: SmeStore,
    private _departmentsStore: DepartmentsStore,
    private _authStore: AuthStore,
    private _usersStore: UsersStore,
    private _router: Router,
  ) {
    this._buildAddUserForm();
  }

  private _buildAddUserForm() {
    this.addUserForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: [''],
      password: [''],
      department: ['', Validators.required],
      role: ['', Validators.required],
      type: ['', Validators.required],
      smeRef: ['', Validators.required],
      active: [true],
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Users');
    });
    this.Subscription.add(
      this._smeStore.state$.subscribe((data) => {
        this.allSmes = data.smes;
      })
    )
    this.Subscription.add(
      this._departmentsStore.state$.subscribe((data) => {
        this.allDepartments = data.departments;
      })
    )
  }

  roleChanged($event) {
    // console.log("ROLE CHANGED:--", $event);
    if ($event === 'roleSme') {
      this.addUserForm.patchValue({ 'department': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'smeRef': '' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'role': 'sme' }, { onlySelf: true });
    }
    if ($event === 'roleDept') {
      this.addUserForm.patchValue({ 'smeRef': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'department': '' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'role': 'ndrmf' }, { onlySelf: true });
    }
  }

  smeChanged($event) {
    console.log("SME CHANGED:--", $event);
  }

  departmentChanged($event) {
    console.log("DEPARTMENT CHANGED:--", $event);
  }

  addUser(values) {
    console.log("VALUES TO ADD USER:--", values);
    this._usersStore.addUser(
      values.name,
      values.role,
      values.department,
      values.smeRef,
      values.email,
      values.username,
      values.password,
      values.status,
      false,
      false,
    )
    if (values.smeRef != "none"){
      this._smeStore.updateUserRef(values.smeRef, values.email);
    }
    this.addUserForm.reset();
    // this.addUserForm.setAsyncValidators();
    console.log("THIS SMES;--", this.allSmes);
  }

  ngOnDestroy() {
  }

  goBack() {
    this._router.navigate(['/users']);
  }

}
