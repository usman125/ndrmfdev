import { Subject, ReplaySubject } from "rxjs";

interface AccreditationRequestReplayState {
  id: any,
  assignee: any,
  forUser: any,
  assigned: any
}

const routeEnd = new Subject<AccreditationRequestReplayState>();
export const AccreditationRequestReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => AccreditationRequestReplay.next(val));

export const setAccreditationRequestReplay = (
  id: any,
  assignee: any,
  forUser: any,
  assigned: any,
) => {
  routeEnd.next({
    id: id,
    assignee: assignee,
    forUser: forUser,
    assigned: assigned,
  });
}