import { Injectable } from '@angular/core';
import { Store } from '../store';
import { QprToDonorRequestState } from './qpr-to-donor-request-state';

@Injectable()
export class QprToDonorRequestStore extends Store<QprToDonorRequestState> {
  constructor() {
    super(new QprToDonorRequestState());
  }


  addRequest(request) {
    this.setState({
      ...this.state,
      request: request
    })
  }

  updateSectionReview(data, id) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        sections: this.state.request.sections.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              data: data,
              reassignmentStatus: 'Completed'
            }
          }
          return c;
        })
      }
    })
  }
}
