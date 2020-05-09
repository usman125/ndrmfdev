import { Injectable } from '@angular/core';
import { Store } from '../store';
import { PendingSignupsState } from './pending-signups-state';

@Injectable()
export class PendingSignupsStore extends Store<PendingSignupsState> {
  constructor() {
    super(new PendingSignupsState());
  }


  addAllRequests(requests){
    this.setState({
      ...this.state,
      requests: requests
    })
  }


  approveRequest(id){
    this.setState({
      ...this.state,
      requests: this.state.requests.map((c) => {
        if (c.id === id){
          return {
            ...c, 
            pending: false,
          }
        }
        return c;
      })
    })
  }
}
