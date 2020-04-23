import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  AfterViewInit,
  AfterViewChecked,
  AfterContentChecked
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthStore } from "../../stores/auth/auth-store";
import { UsersStore } from "../../stores/users/users-store";
import { SmeStore } from "../../stores/sme/sme-store";
import { DepartmentsStore } from "../../stores/departments/departments-store";
import { currentUserReplay, setCurrentUser } from "../../stores/users/user-replay";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { SmeService } from "../../services/sme.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [UserService, SmeService]
})
export class AddUserComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentChecked {

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
  selectedSme: any = null;
  flag: boolean = false;
  allUserRoles: any = []
  allUserTypes: any = []

  singleRole: any = '';
  singleActive: any = false;


  constructor(
    private _formBuilder: FormBuilder,
    private _smeStore: SmeStore,
    private _departmentsStore: DepartmentsStore,
    private _authStore: AuthStore,
    private _usersStore: UsersStore,
    private _userService: UserService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _smeService: SmeService,
  ) {


  }

  getRolesAndTypes() {
    this._userService.getAllUserRoles().subscribe(
      result => {
        console.log("ALL ROLES:--", result);
        this.allUserRoles = result['roles'];
      },
      error => {
        console.log("ERROR FROM ALL ROLES:--", error);
      }
    );
    this._userService.getAllUserTypes().subscribe(
      result => {
        console.log("ALL TYPES:--", result);
        this.allUserTypes = result['typeNames'];
      },
      error => {
        console.log("ERROR FROM ALL TYPES:--", error);
      }
    );
    this.getAllSmes();
  }

  getAllSmes(){
    this._smeService.getAllSmes().subscribe(
      result => {
        console.log("ALL SMES FROM APi:--", result);
        let smesArray = [];
        if (result['sectionInfos']) {
          result['sectionInfos'].forEach(element => {
            var object = {
              name: element.sectionName,
              userRef: element.userName,
              formGenerated: element.formGenerated,
              key: element.sectionKey,
              formIdentity: element.formIdentity,
            }
            if (object.formIdentity === 'qualification' && !object.userRef) smesArray.push(object);
          });
          this._smeStore.addAllSmes(smesArray);
        }
      },
      error => {
        console.log("ERROR FROM ALL SMES:--", error);
      }
    );
  }

  ngAfterViewChecked() {
    // this._changeDetectorRef.detectChanges();
  }

  ngAfterViewInit() {

    currentUserReplay.subscribe((data) => {
      this.selectedUser = data;
      if (this.selectedUser.email) {
        this.flag = true;
        // this._changeDetectorRef.detectChanges();
        if (this.selectedUser.role === 'sme') {
          this.addUserForm.patchValue({
            name: this.selectedUser.name,
            email: this.selectedUser.email,
            smeRef: this.selectedUser.smeRef,
            department: 'none',
            role: 'ndrmf',
            type: 'sme',
            username: this.selectedUser.username,
            password: this.selectedUser.password,
            active: this.selectedUser.active,
          }, { onlySelf: true })
          for (let i = 0; i < this.allSmes.length; i++) {
            if (this.allSmes[i].userRef === this.selectedUser.username) {
              this.addUserForm.patchValue({ 'smeRef': this.allSmes[i].key })
              break;
            }
          }
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
            active: this.selectedUser.active,
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
            active: this.selectedUser.active,
          }, { onlySelf: true })
        } else if (this.selectedUser.role === 'fip') {
          this.addUserForm.patchValue({
            name: this.selectedUser.name,
            email: this.selectedUser.email,
            smeRef: 'none',
            department: 'none',
            role: this.selectedUser.role,
            type: 'roleFip',
            active: this.selectedUser.active,
            username: this.selectedUser.username,
            password: this.selectedUser.password,
          }, { onlySelf: true })
        }
      }
    });
  }

  ngAfterContentChecked() {
    // this._changeDetectorRef.detectChanges();
  }

  private _buildAddUserForm() {
    this.addUserForm = this._formBuilder.group({
      name: [null],
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null],
      department: [null],
      role: [null, Validators.required],
      type: [null],
      smeRef: [null],
      active: [false],
    });
  }

  getChecked(type) {
    if (this.addUserForm.controls['role'].value === type) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Users');
    });

    this._buildAddUserForm();
    this.getRolesAndTypes();
    this.Subscription.add(
      this._smeStore.state$.subscribe((data) => {
        this.allSmes = data.smes;
        console.log("ALL SMES:--", this.allSmes);
      })
    );
    this.Subscription.add(
      this._departmentsStore.state$.subscribe((data) => {
        this.allDepartments = data.departments;
        console.log("ALL DEPARTMENTS:--", this.allDepartments);
      })
    );

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
    for (let i = 0; i < this.allSmes.length; i++) {
      if (this.allSmes[i].key === $event) {
        this.selectedSme = this.allSmes[i];
        console.log("SME CHANGED:--", $event, this.allSmes[i]);
      }
    }
  }

  departmentChanged($event) {
    console.log("DEPARTMENT CHANGED:--", $event);
  }

  addUser(values) {
    if (!this.flag) {
      console.log("ADD NEW USER:--", values, this.flag);
      //   this._usersStore.addUser(
      //     values.name,
      //     values.role,
      //     values.department,
      //     values.smeRef,
      //     values.email,
      //     values.username,
      //     values.password,
      //     values.active,
      //     false,
      //     false,
      //   );
      //   this.addUserForm.reset();
    } else {
      console.log("EDIT THIS USER:--", values, this.flag);
      if (this.selectedUser.active === false && values.active) {
        this.setActiveStatus();
      } else if (this.selectedUser.active && values.active === false) {
        this.unSetActiveStatus();
      }
      if (values.role === 'ndrmf' && values.type === 'sme') {
        this._userService.addRole(this.selectedUser.username, values.type).subscribe(
          result => {
            if (this.selectedSme) {
              console.log("RESULT AFTER ADDING ROLE:--", result, this.selectedSme);
              this._smeService.updateSme(
                this.selectedSme.name,
                this.selectedSme.key,
                this.selectedUser.username,
                this.selectedSme.formGenerated,
                this.selectedSme.formIdentity
              ).subscribe(
                result => {
                  console.log("RESULT AFTER UPDATING SME:--", result);
                  this.getAllSmes();
                },
                error => {
                  console.log("ERROR AFTER UPDATING SME:--", error);
                }
              );
            }
          },
          error => {
            console.log("ERROR AFTER ADDING ROLE:--", error);
          }
        );
      }
      //   this._usersStore.editUser(
      //     this.selectedUser.email,
      //     values.name,
      //     values.email,
      //     values.role,
      //     values.smeRef,
      //     values.department,
      //     values.username,
      //     values.password,
      //   );
      //   if (values.smeRef === "none" && this.selectedUser.role === 'sme') {
      //     this._smeStore.dropUserRef(this.selectedUser.smeRef);
      //   }
      //   setCurrentUser(
      //     values.name,
      //     values.email,
      //     values.role,
      //     values.smeRef,
      //     values.department,
      //     values.username,
      //     values.password,
      //     this.selectedUser.active,
      //     this.selectedUser.eligibileFlag,
      //     this.selectedUser.qualificationFlag,
      //   );

    }
    // if (values.smeRef != "none") {
    //   this._smeStore.updateUserRef(values.smeRef, values.email);
    // }
    // console.log("THIS SMES;--", this.allSmes);
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  setActiveStatus() {
    this._userService.updateActiveStatus(this.selectedUser.username).subscribe(
      result => {
        console.log("RESULT FROM ACTIVATING USER:--", result);
      },
      error => {
        console.log("ERROR FROM ACTIVATING USER:--", error);
      }
    );
  }

  unSetActiveStatus() {
    this._userService.unSetActiveStatus(this.selectedUser.username).subscribe(
      result => {
        console.log("RESULT FROM DE-ACTIVATING USER:--", result);
      },
      error => {
        console.log("ERROR FROM DE-ACTIVATING USER:--", error);
      }
    );
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
    this.addUserForm.reset();
    this.flag = false;
    this._router.navigate(['/users']);
  }



}
