// import { Subject, ReplaySubject } from "rxjs";

// interface AccreditationRequestReplayState {
//   id: any,
//   assignee: any,
//   forUser: any,
//   assigned: any,
//   pending: any,
//   status: any,
//   data: any,
// }

// const routeEnd = new Subject<AccreditationRequestReplayState>();
// export const AccreditationRequestReplay = new ReplaySubject();
// routeEnd.pipe().subscribe(val => AccreditationRequestReplay.next(val));

// export const setAccreditationRequestReplay = (
//   id: any,
//   assignee: any,
//   forUser: any,
//   assigned: any,
//   pending: any,
//   status: any,
//   data: any,
// ) => {
//   routeEnd.next({
//     id: id,
//     assignee: assignee,
//     forUser: forUser,
//     assigned: assigned,
//     pending: pending,
//     status: status,
//     data: data,
//   });
// }

import { Injectable } from '@angular/core';
import { Store } from '../store';
import { AccreditationRequestReplayState } from './AccreditationRequestReplayState';
import * as _ from "lodash";

@Injectable()
export class AccreditationRequestReplayStore extends Store<AccreditationRequestReplayState> {
  constructor() {
    super(new AccreditationRequestReplayState());
  }

  addRequests(request) {
    this.setState({
      ...this.state,
      data: request
    })
  }

  saveQualificationPrefrences(isJv, jvUser) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        isJv: isJv,
        jvUser: jvUser
      }
    })
  }

  changePendingStatus(data) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        data: data,
      }
    })
  }
}
