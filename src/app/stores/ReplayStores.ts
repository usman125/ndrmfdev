import { Subject, ReplaySubject } from 'rxjs';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
// import { SelectionInterface }

export class ReplayStore<T> {

  _state$ = new Subject<T>();
  state$: ReplaySubject<T>;

  protected constructor(initialState) {
    this._state$ = initialState;
    this.state$ = new ReplaySubject();
    this.state$.pipe().subscribe(val => this.state$.next(val));
  }


  get state (): Subject<T> {
    return this.state$;
  }

  setState(nextState: T){
    this._state$.next(nextState);
  } 

}