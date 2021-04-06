import { Injectable } from '@angular/core';
import { Store } from '../store';
import { AccreditationRequestState } from './accreditation-requests-state';
import * as _ from "lodash";

@Injectable()
export class AccreditationRequestStore extends Store<AccreditationRequestState> {
  constructor() {
    super(new AccreditationRequestState());
  }

  addAllRequests(requests) {
    this.setState({
      ...this.state,
      requests: requests
    })
  }

  changePendingStatus(status, id, data) {
    this.setState({
      ...this.state,
      requests: this.state.requests.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            pending: status,
            data: data
          }
        }
        return c;
      })
    })
  }

  saveJvPreferences(requestId, isJv, jvUser) {
    this.setState({
      ...this.state,
      requests: this.state.requests.map((c) => {
        if (c.id === requestId) {
          return {
            ...c,
            jvUser: jvUser,
            isJv: isJv
          }
        }
        return c;
      })
    })
  }
}
