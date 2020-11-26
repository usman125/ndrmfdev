import { Subject, ReplaySubject } from "rxjs";

interface CurrentIntimationState {
  endDate: string,
  formIdentity: string,
  comments: string[]
}

const routeEnd = new Subject<CurrentIntimationState>();
export const shareStoreReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => shareStoreReplay.next(val));

export const setCommentValue = (
  endDate: string,
  formIdentity: string,
  comments: string[],
) => {
  routeEnd.next({ endDate, formIdentity, comments: comments });
}