import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthStore } from "../../stores/auth/auth-store";
import { UsersStore } from "../../stores/users/users-store";
import { SmeStore } from "../../stores/sme/sme-store";
import { DepartmentsStore } from "../../stores/departments/departments-store";
import { currentUserReplay, setCurrentUser } from "../../stores/users/user-replay";
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
    { name: 'Fip', key: 'roleFip' },
    { name: 'Other', key: 'other' },
  ]

  selectedUser: any = null;
  flag: boolean = false;






  constructor(
    private _formBuilder: FormBuilder,
    private _smeStore: SmeStore,
    private _departmentsStore: DepartmentsStore,
    private _authStore: AuthStore,
    private _usersStore: UsersStore,
    private _router: Router,
  ) {
    this._buildAddUserForm();
    this.Subscription.add(
      this._smeStore.state$.subscribe((data) => {
        this.allSmes = data.smes;
        console.log("ALL SMES:--", this.allSmes);
        this._departmentsStore.state$.subscribe((data) => {
          this.allDepartments = data.departments;
          console.log("ALL DEPARTMENTS:--", this.allDepartments);
          currentUserReplay.subscribe((data) => {
            this.selectedUser = data;
            if (this.selectedUser.name) {
              console.log("SELECTED USER:--", data);
              this.flag = true;
            }
          }).unsubscribe();
        });
      })
    );
  }

  private _buildAddUserForm() {
    this.addUserForm = this._formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null],
      password: [null],
      department: [null, Validators.required],
      role: [null, Validators.required],
      type: [null, Validators.required],
      smeRef: [null, Validators.required],
      active: [true],
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Users');
    });
    if (this.flag) {
      if (this.selectedUser.role === 'sme') {
        this.addUserForm.patchValue({
          name: this.selectedUser.name,
          email: this.selectedUser.email,
          smeRef: this.selectedUser.smeRef,
          department: 'none',
          role: this.selectedUser.role,
          type: 'roleSme',
          username: this.selectedUser.username,
          password: this.selectedUser.password,
        }, { onlySelf: true })
      } else if (this.selectedUser.role === 'ndrmf') {
        this.addUserForm.patchValue({
          name: this.selectedUser.name,
          email: this.selectedUser.email,
          smeRef: 'none',
          department: this.selectedUser.department,
          role: this.selectedUser.role,
          type: 'roleDept',
          username: this.selectedUser.username,
          password: this.selectedUser.password,
        }, { onlySelf: true })
      } else if (this.selectedUser.role === 'other') {
        this.addUserForm.patchValue({
          name: this.selectedUser.name,
          email: this.selectedUser.email,
          smeRef: 'none',
          department: 'none',
          role: this.selectedUser.role,
          type: 'other',
          username: this.selectedUser.username,
          password: this.selectedUser.password,
        }, { onlySelf: true })
      } else if (this.selectedUser.role === 'fip') {
        this.addUserForm.patchValue({
          name: this.selectedUser.name,
          email: this.selectedUser.email,
          smeRef: 'none',
          department: 'none',
          role: this.selectedUser.role,
          type: 'roleFip',
          username: this.selectedUser.username,
          password: this.selectedUser.password,
        }, { onlySelf: true })
      }
    }
  }

  roleChanged($event) {
    console.log("ROLE CHANGED:--", $event, this.addUserForm.value);
    if ($event === 'roleSme') {
      this.addUserForm.patchValue({ 'department': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'smeRef': null }, { onlySelf: true });
      this.addUserForm.patchValue({ 'role': 'sme' }, { onlySelf: true });
    }
    if ($event === 'roleDept') {
      this.addUserForm.patchValue({ 'smeRef': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'department': null }, { onlySelf: true });
      this.addUserForm.patchValue({ 'role': 'ndrmf' }, { onlySelf: true });
    }
    if ($event === 'other') {
      this.addUserForm.patchValue({ 'smeRef': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'department': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'role': 'other' }, { onlySelf: true });
    }
    if ($event === 'roleFip') {
      this.addUserForm.patchValue({ 'smeRef': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'department': 'none' }, { onlySelf: true });
      this.addUserForm.patchValue({ 'role': 'fip' }, { onlySelf: true });
    }
  }

  smeChanged($event) {
    console.log("SME CHANGED:--", $event);
  }

  departmentChanged($event) {
    console.log("DEPARTMENT CHANGED:--", $event);
  }

  addUser(values) {
    console.log("VALUES TO ADD USER:--", values, this.flag);
    if (!this.flag) {
      this._usersStore.addUser(
        values.name,
        values.role,
        values.department,
        values.smeRef,
        values.email,
        values.username,
        values.password,
        values.active,
        false,
        false,
      );
      this.addUserForm.reset();
    } else {
      this._usersStore.editUser(
        this.selectedUser.email,
        values.name,
        values.email,
        values.role,
        values.smeRef,
        values.department,
        values.username,
        values.password,
      );
      if (values.smeRef === "none" && this.selectedUser.role === 'sme') {
        this._smeStore.dropUserRef(this.selectedUser.smeRef);
      }
      setCurrentUser(
        values.name,
        values.email,
        values.role,
        values.smeRef,
        values.department,
        values.username,
        values.password,
        this.selectedUser.active,
        this.selectedUser.eligibileFlag,
        this.selectedUser.qualificationFlag,
      );
    }
    if (values.smeRef != "none") {
      this._smeStore.updateUserRef(values.smeRef, values.email);
    }
    // console.log("THIS SMES;--", this.allSmes);
  }

  ngOnDestroy() {
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
      false,
      false,
      false,
    );
    this._router.navigate(['/users']);
  }



}
