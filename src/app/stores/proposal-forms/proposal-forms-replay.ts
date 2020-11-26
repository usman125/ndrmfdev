import { Subject, ReplaySubject } from "rxjs";

interface ThematicAreaState {
  id: string,
  name: string,
  processOwner: any,
  enabled: boolean
}

const routeEnd = new Subject<ThematicAreaState>();
export const thematicAreaReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => thematicAreaReplay.next(val));

export const setThematicAreaValue = (
  id: string,
  name: string,
  processOwner: any,
  enabled: boolean,
) => {
  routeEnd.next({ id, name, processOwner, enabled });
}