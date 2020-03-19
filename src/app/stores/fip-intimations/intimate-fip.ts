// RxJS v6+
// import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';
import { SectionSelector } from "../../models/section-selector";

const routeEnd = new Subject<SectionSelector>();
export const shareWithReplay = new ReplaySubject();
routeEnd.pipe().subscribe(val => shareWithReplay.next(val));

export const setValue = (
  startDate: string,
  endDate: string,
  sections: { name: string, key: string }[],
) => {
  routeEnd.next({ startDate, endDate, sections: sections });
}

// import { Injectable } from '@angular/core';
// import { ReplayStore } from '../ReplayStores';
// @Injectable()
// export class SectionsSelector  extends ReplayStore<Selector>{

//   public _state$ = new Subject<Selector>();
//   public state$ = new ReplaySubject<Selector>();
//   public data: Selector;

//   constructor() {
//     super(new Selector())
//   }

//   setState(nextState: Selector) {
//     this._state$.next(nextState);
//   }

//   getValue(): Selector {
//     this._state$.subscribe(c => {
//       this.data = c;
//     })
//     return this.data;
//   }

// }
// simulate url change with subject

// const lastUrl = routeEnd.pipe(
//   pluck('url'),
//   // pluck('data')
// ).subscribe(val => shareWithReplay.next(val));


