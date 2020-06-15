const AUTH = {
  loggedUser: false,
  routeName: null,
  sideNavMode: true,
  opened: true,
  userRole: '',
  eligibaleFlag: '',
  qualifiationFlag: '',
  checked: false,
  applyMobileClasses: false,
  checkedThemeName: 'unicorn-light-theme',
  apiCall: false,
  authToken: null,
  proMonths: null,
  canInitiate: null,
  accredited: null,
  orgName: null,
}

export class AuthState {
  auth: {
    loggedUser: boolean,
    routeName: string,
    sideNavMode: boolean,
    opened: boolean,
    userRole: string,
    eligibaleFlag: string,
    qualifiationFlag: string,
    checked: boolean,
    applyMobileClasses: boolean,
    checkedThemeName: string,
    apiCall: boolean,
    authToken: string,
    proMonths: any,
    canInitiate: any,
    accredited: any,
    orgName: any,
  } = AUTH;
}
