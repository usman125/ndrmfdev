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
  checkedThemeName: 'material-base-theme',
  apiCall: false,
  authToken: null,
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
  } = AUTH;
}
