import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../stores/auth/auth-store';
import { UsersStore } from '../../stores/users/users-store';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import * as _ from 'lodash';
import { LoginService } from "../../services/login.service";
import { UserService } from "../../services/user.service";
import { SmeService } from "../../services/sme.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, SmeService]
})

export class LoginComponent implements OnInit, OnDestroy {

  public loggedUser: any = null;
  public allUsers: any = [];
  public allSections: any = [];
  public loginForm: FormGroup;
  public Subscription: Subscription = new Subscription();

  themeName: any = null;
  errorMsg: any = null;
  loading: boolean;

  constructor(
    private _authStore: AuthStore,
    private _usersStore: UsersStore,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _smeService: SmeService,
    private _loginService: LoginService,
  ) {
    this._buildLoginForm();

    this._userService.getAllUsers().subscribe(
      result => {
        this._authStore.removeLoading();
        console.log(result);
        let usersArray = [];
        if (result['userInfoList']) {
          for (let i = 0; i < result['userInfoList'].length; i++) {
            var object = {
              name: result['userInfoList'][i].firstName,
              email: result['userInfoList'][i].email,
              role: result['userInfoList'][i].typeName,
              smeRef: result['userInfoList'][i].roleName,
              department: null,
              username: result['userInfoList'][i].username,
              password: null,
              active: result['userInfoList'][i].active,
              eligibileFlag: result['userInfoList'][i].eligible,
              qualificationFlag: result['userInfoList'][i].qualified,
              roleNames: result['userInfoList'][i].roleNames,
              groupNames: result['userInfoList'][i].groupNames,
            }
            if (result['userInfoList'][i].typeName === 'ndrmf') {
              if (result['userInfoList'][i].roleNames.length) {
                object.role = result['userInfoList'][i].roleNames[0];
              }
            }
            if (result['userInfoList'][i].typeName === 'fip') {
              if (result['userInfoList'][i].roleNames.length) {
                object.role = result['userInfoList'][i].roleNames[0];
              }
            }
            if (object.role === 'sme') {
              this._smeService.getAllSmes().subscribe(
                result => {
                  console.log("ALL SMES FROM APi:--", result);
                  if (result['sectionInfos']) {
                    this.allSections = result['sectionInfos']
                    result['sectionInfos'].forEach(element => {
                      console.log(element.userName)
                      if (element.userName === object.username) object.smeRef = element.sectionKey || null;
                    });
                  }
                },
                error => { }
              )
            }
            usersArray.push(object);
          }
          this._usersStore.setAllUsers(usersArray);
        }
        this.Subscription.add(
          this._usersStore.state$.subscribe(data => {
            this.allUsers = data.users;
            console.log(this.allUsers)
          })
        );
      },
      error => {
        this._authStore.removeLoading();
        console.log("ERROR FROM ALL USERS:--", error);
      }
    );
  }

  _buildLoginForm() {
    this.loginForm = this._formBuilder.group({
      'username': [''],
      'password': [''],
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this._authStore.setRouteName('Login');
    });
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.themeName = data.auth.checkedThemeName;
        this.loading = data.auth.apiCall;
      })
    )

    if (this.loggedUser) {
      if (this.loggedUser.role === 'admin') {
        this._router.navigate(['surveys']);
      }
      if (this.loggedUser.role === 'fip') {
        this._router.navigate(['fip-home']);
      }
      if (this.loggedUser.role === 'sme') {
        this._router.navigate(['accreditation-requests']);
      }
    }
  }

  setLoggedUser(values) {
    // var dummyuser = _.find(this.allUsers, { 'username': values.username, 'password': values.password });
    this.errorMsg = null;
    this._authStore.setLoading();
    this._loginService.loginUser(values).subscribe(
      result => {
        console.log("RESULT AFTER CALIING LOGIN API:---", result);
        this._authStore.removeLoading();
        var user = {
          username: result['userInfo']['username'],
          email: result['userInfo']['email'],
          role: result['userInfo']['typeName'],
          eligibileFlag: result['userInfo']['eligible'],
          qualificationFlag: result['userInfo']['qualified'],
          roleNames: result['userInfo']['roleNames'],
          groupNames: result['userInfo']['groupNames'],
          typeName: result['userInfo']['typeName'],
          smeRef: null,
        }
        if (user.role === 'ndrmf' || user.role === 'fip') {
          if (result['userInfo']['roleNames'].length) {
            user.role = result['userInfo']['roleNames'][0];
          }
        }


        if (user.role === 'sme') {
          this.allSections.forEach(element => {
            if (element.userName === user.username) user.smeRef = element.sectionKey;
          });
        }

        this._authStore.setLoginState(true);
        this._authStore.setUserRole(user.role);
        this._authStore.setEligibleFlag(user.eligibileFlag);
        this._authStore.setQualificationFlag(user.qualificationFlag);
        this._authStore.setThemeName(this.themeName);
        this._authStore.openSideNav();
        var newUser = JSON.stringify(user).slice();
        console.log(newUser);
        localStorage.setItem('user', newUser);
        if (user.role === 'admin') {
          console.log("Login CAlled:--", user);
          this._router.navigate(['users']);
          // window.location.href = '/surveys';
        } else if (user.role === 'fip') {
          this._router.navigate(['fip-home']);
        } else if (user.role === 'sme') {
          this._router.navigate(['accreditation-requests']);
        }
      }, error => {
        // this.errorMsg = error.error.responseDesc;
        console.log("ERROR:--", error);
        this._authStore.removeLoading();
      }
    );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
