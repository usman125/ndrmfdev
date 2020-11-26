import { Subject, ReplaySubject } from "rxjs";

interface CurrentProjectState {
  name: string,
  type: string,
  status: string,
  userRef: string,
  key: string,
  primaryAppraisalStatus: string,
  primaryAppraisalStartDate: string,
  primaryAppraisalEndDate: string,
  extendedAppraisalStatus: string,
  extendedAppraisalExpiry: string,
}

const routeEnd = new Subject<CurrentProjectState>();
export const currentProjectReplay = new ReplaySubject(1);
routeEnd.pipe().subscribe(val => currentProjectReplay.next(val));

export const setCurrentProject = (
  name: string,
  type: string,
  status: string,
  userRef: string,
  key: string,
  primaryAppraisalStatus: string,
  primaryAppraisalStartDate: string,
  primaryAppraisalEndDate: string,
  extendedAppraisalStatus: string,
  extendedAppraisalExpiry: string,
) => {
  routeEnd.next({
    name: name,
    type: type,
    status: status,
    userRef: userRef,
    key: key,
    primaryAppraisalStatus: primaryAppraisalStatus,
    primaryAppraisalStartDate: primaryAppraisalStartDate,
    primaryAppraisalEndDate: primaryAppraisalEndDate,
    extendedAppraisalStatus: extendedAppraisalStatus,
    extendedAppraisalExpiry: extendedAppraisalExpiry,
  });
}