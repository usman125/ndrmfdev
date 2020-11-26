import { Subject, ReplaySubject } from "rxjs";

interface CurrentSmeState {
  name: string,
  key: string,
  userRef: string,
  formGenerated: boolean,
  formIdentity: string,
}

const routeEnd = new Subject<CurrentSmeState>();
export const currentSmeReplay = new ReplaySubject(1);
routeEnd.pipe().subscribe(val => currentSmeReplay.next(val));

export const setCurrentSme = (
  name: string,
  key: string,
  userRef: string,
  formGenerated: boolean,
  formIdentity: string,
) => {
  routeEnd.next({
    name: name,
    key: key,
    userRef: userRef,
    formGenerated: formGenerated,
    formIdentity: formIdentity,
  });
}