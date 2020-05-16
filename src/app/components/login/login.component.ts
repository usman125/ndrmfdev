import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../stores/auth/auth-store';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import * as _ from 'lodash';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})

export class LoginComponent implements OnInit, OnDestroy {

  public loggedUser: any = null;
  public allUsers: any = [];
  public allSections: any = [];
  public loginForm: FormGroup;
  public Subscription: Subscription = new Subscription();

  themeName: any = null;
  errorMsg: any = null;
  user: any = null;
  loading: boolean;

  constructor(
    private _authStore: AuthStore,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
  ) {
    this._buildLoginForm();

    // this._userService.getAllUsers().subscribe(
    //   result => {
    //     this._authStore.removeLoading();
    //     console.log(result);
    //     let usersArray = [];
    //     if (result['userInfoList']) {
    //       for (let i = 0; i < result['userInfoList'].length; i++) {
    //         var object = {
    //           name: result['userInfoList'][i].firstName,
    //           email: result['userInfoList'][i].email,
    //           role: result['userInfoList'][i].typeName,
    //           smeRef: result['userInfoList'][i].roleName,
    //           department: null,
    //           username: result['userInfoList'][i].username,
    //           password: null,
    //           active: result['userInfoList'][i].active,
    //           eligibileFlag: result['userInfoList'][i].eligible,
    //           qualificationFlag: result['userInfoList'][i].qualified,
    //           roleNames: result['userInfoList'][i].roleNames,
    //           groupNames: result['userInfoList'][i].groupNames,
    //         }
    //         if (result['userInfoList'][i].typeName === 'ndrmf') {
    //           if (result['userInfoList'][i].roleNames.length) {
    //             object.role = result['userInfoList'][i].roleNames[0];
    //           }
    //         }
    //         if (result['userInfoList'][i].typeName === 'fip') {
    //           if (result['userInfoList'][i].roleNames.length) {
    //             object.role = result['userInfoList'][i].roleNames[0];
    //           }
    //         }
    //         if (object.role === 'sme') {
    //           this._smeService.getAllSmes().subscribe(
    //             result => {
    //               console.log("ALL SMES FROM APi:--", result);
    //               if (result['sectionInfos']) {
    //                 this.allSections = result['sectionInfos']
    //                 result['sectionInfos'].forEach(element => {
    //                   console.log(element.userName)
    //                   if (element.userName === object.username) object.smeRef = element.sectionKey || null;
    //                 });
    //               }
    //             },
    //             error => { }
    //           )
    //         }
    //         usersArray.push(object);
    //       }
    //       this._usersStore.setAllUsers(usersArray);
    //     }
    //     this.Subscription.add(
    //       this._usersStore.state$.subscribe(data => {
    //         this.allUsers = data.users;
    //         console.log(this.allUsers)
    //       })
    //     );
    //   },
    //   error => {
    //     this._authStore.removeLoading();
    //     console.log("ERROR FROM ALL USERS:--", error);
    //   }
    // );
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
      if (this.loggedUser.role === 'signatory') {
        this._router.navigate(['fip-home']);
      }
      if (this.loggedUser.role === 'sme') {
        this._router.navigate(['accreditation-requests']);
      }
    }
  }

  setLoggedUser(values) {
    this.errorMsg = null;
    this._authStore.setLoading();
    this._loginService.loginUser(values).subscribe(
      (result: any) => {
        console.log("RESULT AFTER CALIING LOGIN API:---", result);
        this.user = {
          firstName: result['user']['firstName'],
          lastName: result['user']['lastName'],
          email: result['user']['email'],
          username: result['user']['username'],
          password: result['user']['password'] || null,
          role: result['user']['roles'] ?
            result['user']['roles'][0] ?
              result['user']['roles'][0].toLowerCase() : 'FIP'.toLowerCase()
            : null,
          smeRef: null,
          department: result['user']['departmentId'] || null,
          active: result['user']['enabled'],
          eligibileFlag: '',
          qualificationFlag: '',
          roles: result['user']['roles'].length ?
            result['user']['roles'] :
            [{ id: result['user']['orgId'], name: result['user']['orgName'] }],
          orgId: result['user']['orgId'],
          orgName: result['user']['orgName'],
          org: [{ 'id': result['user']['orgId'], 'name': result['user']['orgName'] }],
          authToken: result['accessToken'],

        }
        console.log("USER:---", this.user);
        this._authStore.setAuthToken(this.user.authToken);
        this._authStore.setUserRole(this.user.role);
        this._authStore.setThemeName(this.themeName);

        this._authStore.setEligibleFlag(this.user.eligibileFlag);
        this._authStore.setQualificationFlag(this.user.qualificationFlag);
        if (this.user.role !== 'fip') {
          this._authStore.setLoginState(true);
          this._authStore.openSideNav();
          var newUser = JSON.stringify(this.user);
          console.log(newUser);
          localStorage.setItem('user', newUser);
          this._authStore.removeLoading();
          if (this.user.role === 'admin') {
            // console.log("Login CAlled:--", this.user);
            this._router.navigate(['adminhome']);
          } else if (this.user.role === 'process owner') {
            this._router.navigate(['pohome']);
          } else if (this.user.role === 'sme') {
            this._router.navigate(['smehome']);
          }
        } else {
          var newUser = JSON.stringify(this.user);
          console.log(newUser);
          localStorage.setItem('user', newUser);
          this.checkAccrediatedStatus();
        }
      }, error => {
        console.log("ERROR:--", error);
        this._authStore.removeLoading();
      }
    );
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

  checkAccrediatedStatus() {
    console.log(this.user);
    this._loginService.checkAccreditationStatus().subscribe(
      (result: any) => {
        console.log("RESULT FROM ACCREDIATED SATUS:--", result);
        this.user.eligibileFlag = result.eligibilityStatus;
        this.user.qualificationFlag = result.qualificationStatus;
        this._authStore.setEligibleFlag(this.user.eligibileFlag);
        this._authStore.setQualificationFlag(this.user.qualificationFlag);
        this._authStore.setLoginState(true);
        this._authStore.openSideNav();
        var newUser = JSON.stringify(this.user);
        console.log(newUser);
        localStorage.setItem('user', newUser);
        this._authStore.removeLoading();
        this._router.navigate(['fip-home']);
      },
      error => {
        this._authStore.removeLoading();
        console.log("RESULT FROM ACCREDIATED SATUS:--", error);
      }
    );
  }

  registerUser(){
    this._router.navigate(['/register']);
  }

}
