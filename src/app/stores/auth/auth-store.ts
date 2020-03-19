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
        loggedUser: status,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        sideNavMode: this.state.auth.sideNavMode,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        checked: this.state.auth.checked,
        checkedThemeName: this.state.auth.checkedThemeName,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        opened: this.state.auth.opened,
      }

    });
    console.log("login Called");
  }
  
  setEligibleFlag(eligibaleFlag: boolean): void {
    console.log("login Called");
    this.setState({
      ...this.state,
      auth: {
        applyMobileClasses: this.state.auth.applyMobileClasses,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        sideNavMode: this.state.auth.sideNavMode,
        eligibaleFlag: eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        checked: this.state.auth.checked,
        checkedThemeName: this.state.auth.checkedThemeName,
        opened: this.state.auth.opened,
      }
    });
  }
  
  setQualificationFlag(qualifiationFlag: boolean): void {
    this.setState({
      ...this.state,
      auth: {
        applyMobileClasses: this.state.auth.applyMobileClasses,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        sideNavMode: this.state.auth.sideNavMode,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: qualifiationFlag,
        checked: this.state.auth.checked,
        checkedThemeName: this.state.auth.checkedThemeName,
        opened: this.state.auth.opened,
      }
    });
  }
  
  setRouteName(name: string): void {
    console.log("login Called");
    this.setState({
      ...this.state,
      auth: {
        loggedUser: this.state.auth.loggedUser,
        userRole: this.state.auth.userRole,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        routeName: name,
        sideNavMode: this.state.auth.sideNavMode,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        checked: this.state.auth.checked,
        checkedThemeName: this.state.auth.checkedThemeName,
        opened: this.state.auth.opened,
      }
    });
  }
  
  setThemeName(name: string): void {
    this.setState({
      ...this.state,
      auth: {
        loggedUser: this.state.auth.loggedUser,
        userRole: this.state.auth.userRole,
        routeName: name,
        sideNavMode: this.state.auth.sideNavMode,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        checked: this.state.auth.checked,
        opened: this.state.auth.opened,
        checkedThemeName: name,
      }
    });
  }
  
  setUserRole(name: string): void {
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        loggedUser: this.state.auth.loggedUser,
        userRole: name,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        checked: this.state.auth.checked,
        routeName: this.state.auth.routeName,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        checkedThemeName: this.state.auth.checkedThemeName,
        sideNavMode: this.state.auth.sideNavMode
      }
    });
  }
  
  toogleSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        checked: this.state.auth.checked,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        userRole: this.state.auth.userRole,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        sideNavMode: !this.state.auth.sideNavMode,
        checkedThemeName: this.state.auth.checkedThemeName,
      }
    })
  }
  
  openSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        checked: this.state.auth.checked,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        sideNavMode: true,
        checkedThemeName: this.state.auth.checkedThemeName,
      }
    })
  }
  
  closeSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        checked: this.state.auth.checked,
        loggedUser: this.state.auth.loggedUser,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        sideNavMode: false,
        checkedThemeName: this.state.auth.checkedThemeName,
      }
    })
  }
  
  openSiteLayoutSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        opened: true,
        checked: this.state.auth.checked,
        loggedUser: this.state.auth.loggedUser,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        sideNavMode: this.state.auth.sideNavMode,
        checkedThemeName: this.state.auth.checkedThemeName,
      }
    })
  }
  
  closeSiteLayoutSideNav = () => {
    this.setState({
      ...this.state,
      auth: {
        opened: false,
        checked: this.state.auth.checked,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        userRole: this.state.auth.userRole,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        sideNavMode: this.state.auth.sideNavMode,
        checkedThemeName: this.state.auth.checkedThemeName,
      }
    })
  }
  
  toggleTheme() {
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        checked: !this.state.auth.checked,
        applyMobileClasses: this.state.auth.applyMobileClasses,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        userRole: this.state.auth.userRole,
        checkedThemeName: this.state.auth.checkedThemeName,
        sideNavMode: this.state.auth.sideNavMode,
      }
    })
  }
  
  addMobileClass(){
    
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        checked: this.state.auth.checked,
        applyMobileClasses: true,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        userRole: this.state.auth.userRole,
        checkedThemeName: this.state.auth.checkedThemeName,
        sideNavMode: this.state.auth.sideNavMode,
      }
    })
  }
  removeMobileClass(){
    
    this.setState({
      ...this.state,
      auth: {
        opened: this.state.auth.opened,
        checked: this.state.auth.checked,
        applyMobileClasses: false,
        loggedUser: this.state.auth.loggedUser,
        routeName: this.state.auth.routeName,
        eligibaleFlag: this.state.auth.eligibaleFlag,
        qualifiationFlag: this.state.auth.qualifiationFlag,
        userRole: this.state.auth.userRole,
        checkedThemeName: this.state.auth.checkedThemeName,
        sideNavMode: this.state.auth.sideNavMode,
      }
    })
  }

}
