const AUTH = {
  loggedUser: false,
  routeName: null,
  sideNavMode: true,
  opened: true,
  userRole: '',
  eligibaleFlag: false,
  qualifiationFlag: false,
  checked: false,
  applyMobileClasses: false,
  checkedThemeName: 'material-base-theme',
  apiCall: false,
}

export class AuthState {
  auth: {
    loggedUser: boolean,
    routeName: string,
    sideNavMode: boolean,
    opened: boolean,
    userRole: string,
    eligibaleFlag: boolean,
    qualifiationFlag: boolean,
    checked: boolean,
    applyMobileClasses: boolean,
    checkedThemeName: string,
    apiCall: boolean,
  } = AUTH;
}
