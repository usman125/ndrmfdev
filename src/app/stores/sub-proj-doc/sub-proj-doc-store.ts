import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SubProjectDocState } from './sub-proj-doc-state';

@Injectable()
export class SubProjectDocStore extends Store<SubProjectDocState> {
  constructor() {
    super(new SubProjectDocState());
  }
  
  addRequest(
    endDate: string,
    id: string,
    proposalName: string,
    startDate: string,
    status: string,
  ): void {
    this.setState({
      ...this.state,
      requests: [
        ...this.state.requests,
        {
          endDate: endDate,
          id: id,
          proposalName: proposalName,
          startDate: startDate,
          status: status,
        }
      ]
    });
  }

  addAllRequests(requests){
    this.setState({
      ...this.state,
      requests: requests
    })
  }
}
