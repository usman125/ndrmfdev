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

  changePendingStatus(status, id) {
    this.setState({
      ...this.state,
      requests: this.state.requests.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            pending: status
          }
        }
        return c;
      })
    })
  }
}
