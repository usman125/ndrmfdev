import { Subject, ReplaySubject } from "rxjs";

interface CurrentProjectState {
  name: string,
  type: string,
  status: string,
}

const routeEnd = new Subject<CurrentProjectState>();
export const currentProjectReplay = new ReplaySubject(1);
routeEnd.pipe().subscribe(val => currentProjectReplay.next(val));

export const setCurrentProject = (
  name: string,
  type: string,
  status: string,
) => {
  routeEnd.next({
    name: name,
    type: type,
    status: status,
  });
}