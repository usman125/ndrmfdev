import { Subject, ReplaySubject } from "rxjs";

interface CurrentUserState {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  smeRef: string,
  department: string,
  username: string,
  password: string,
  active: boolean,
  eligibileFlag: boolean,
  qualificationFlag: boolean,
  roles: any,
  orgId: any,
  orgName: string,
  org: any,
}

const routeEnd = new Subject<CurrentUserState>();
export const currentUserReplay = new ReplaySubject(1);
routeEnd.pipe().subscribe(val => currentUserReplay.next(val));

export const setCurrentUser = (
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  smeRef: string,
  department: string,
  username: string,
  password: string,
  active: boolean,
  eligibileFlag: boolean,
  qualificationFlag: boolean,
  roles: any,
  orgId: any,
  orgName: string,
) => {
  routeEnd.next({
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
    smeRef: smeRef,
    department: department,
    username: username,
    password: password,
    active: active,
    eligibileFlag: eligibileFlag,
    qualificationFlag: qualificationFlag,
    roles: roles,
    orgId: orgId,
    orgName: orgName,
    org: [{
      'id': orgId,
      'name': orgName
    }]
  });
}