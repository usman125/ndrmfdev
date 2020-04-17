import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../stores/auth/auth-store';
import { UsersStore } from '../../stores/users/users-store';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import * as _ from 'lodash';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit, OnDestroy {

  public loggedUser: any = null;
  public allUsers: any = [];
  public loginForm: FormGroup;
  public Subscription: Subscription = new Subscription();

  themeName: any = null;
  loading: boolean;

  constructor(
    private _authStore: AuthStore,
    private _usersStore: UsersStore,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
  ) {
    this._buildLoginForm();
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
    })
    this.Subscription.add(
      this._usersStore.state$.subscribe(data => {
        this.allUsers = data.users;
        console.log(this.allUsers)
      })
    )
    this.Subscription.add(
      this._authStore.state$.subscribe(data => {
        this.themeName = data.auth.checkedThemeName;
        this.loading = data.auth.apiCall;
      })
    )
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    if (this.loggedUser){
      if (this.loggedUser.role === 'admin'){
        this._router.navigate(['surveys']);
      }
      if (this.loggedUser.role === 'fip'){
        this._router.navigate(['fip-home']);
      }
      if (this.loggedUser.role === 'sme'){
        this._router.navigate(['accreditation-requests']);
      }
    }
  }

  setLoggedUser(values) {
    var dummyuser = _.find(this.allUsers, { 'username': values.username, 'password': values.password });
    this._authStore.setLoading();
    this._loginService.loginUser(values).subscribe(result => {
      console.log("RESULT AFTER CALIING LOGIN API:---", result);
      this._authStore.removeLoading();
      var user = {
        username: result['userInfo']['username'],
        email: result['userInfo']['email'],
        role: result['userInfo']['typeName'],
        eligibileFlag: result['userInfo']['eligible'],
        qualificationFlag: result['userInfo']['qualified'],
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
      console.log("ERROR:--", error);
      this._authStore.removeLoading();
      if (dummyuser) {
        this._authStore.setLoginState(true);
        this._authStore.setUserRole(dummyuser.role);
        this._authStore.setEligibleFlag(dummyuser.eligibileFlag);
        this._authStore.setQualificationFlag(dummyuser.qualificationFlag);
        this._authStore.openSideNav();
        var newUser = JSON.stringify(dummyuser).slice();
        localStorage.setItem('user', newUser);
        if (JSON.parse(newUser).role === 'admin') {
          console.log("Login CAlled:--", dummyuser);
          this._router.navigate(['users']);
          // window.location.href = '/surveys';
        } else if (JSON.parse(newUser).role === 'fip') {
          this._router.navigate(['fip-home']);
        } else if (JSON.parse(newUser).role === 'sme') {
          this._router.navigate(['accreditation-requests']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe();
  }

}
