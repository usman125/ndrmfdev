import { Injectable } from '@angular/core';
import { Store } from '../store';
import { AuthState } from './auth-state';

@Injectable()
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(new AuthState());
  }

  setLoginState(status: boolean): void {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        loggedUser: status,
      }
    });
  }

  setEligibleFlag(eligibaleFlag: boolean): void {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        eligibaleFlag: eligibaleFlag,
      }
    });
  }

  setQualificationFlag(qualifiationFlag: boolean): void {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        qualifiationFlag: qualifiationFlag,
      }
    });
  }

  setRouteName(name: string): void {
    // console.log("login Called");
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        routeName: name,
      }
    });
  }

  setThemeName(name: string): void {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        checkedThemeName: name,
      }
    });
  }

  setUserRole(name: string): void {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        userRole: name,
      }
    });
  }

  toogleSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        sideNavMode: !this.state.auth.sideNavMode,
      }
    })
  }

  openSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        sideNavMode: true,
      }
    })
  }

  closeSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        sideNavMode: false,
      }
    })
  }

  openSiteLayoutSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        opened: true,
      }
    })
  }

  closeSiteLayoutSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        opened: false,
      }
    })
  }

  toggleTheme() {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        checked: !this.state.auth.checked,
      }
    })
  }

  addMobileClass() {

    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        applyMobileClasses: true,
      }
    })
  }
  removeMobileClass() {

    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        applyMobileClasses: false,
      }
    })
  }

  setLoading() {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        apiCall: true
      }
    })
  }

  removeLoading() {
    this.setState({
      ...this.state,
      auth: {
        ...this.state.auth,
        apiCall: false
      }
    })
  }

}
