import { Subject, ReplaySubject } from "rxjs";

interface CurrentIntimationState {
  endDate: string,
  formIdentity: string,
  comments: {
    data: string, date: string
  }[]
}

const routeEnd = new Subject<CurrentIntimationState>();
export const shareStoreReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => shareStoreReplay.next(val));

export const setCommentValue = (
  endDate: string,
  formIdentity: string,
  comments: { data: string, date: string }[],
) => {
  routeEnd.next({ endDate, formIdentity, comments: comments });
}