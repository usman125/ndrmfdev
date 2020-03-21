import { Subject, ReplaySubject } from "rxjs";

interface CurrentUserState {
  name: string,
  email: string,
  role: string,
  smeRef: string,
  department: string,
  username: string,
  password: string,
  active: boolean,
  eligibileFlag: boolean,
  qualificationFlag: boolean,
}

const routeEnd = new Subject<CurrentUserState>();
export const currentUserReplay = new ReplaySubject(1);
routeEnd.pipe().subscribe(val => currentUserReplay.next(val));

export const setCurrentUser = (
  name: string,
  email: string,
  role: string,
  smeRef: string,
  department: string,
  username: string,
  password: string,
  active: boolean,
  eligibileFlag: boolean,
  qualificationFlag: boolean,
) => {
  routeEnd.next({
    name: name,
    email: email,
    role: role,
    smeRef: smeRef,
    department: department,
    username: username,
    password: password,
    active: active,
    eligibileFlag: eligibileFlag,
    qualificationFlag: qualificationFlag,
  });
}