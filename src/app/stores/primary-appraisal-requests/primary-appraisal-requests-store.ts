import { Injectable } from '@angular/core';
import { Store } from '../store';
import { PrimaryAppraisalRequestsState } from './primary-appraisal-requests-state';

@Injectable()
export class PrimaryAppraisalRequestsStore extends Store<PrimaryAppraisalRequestsState> {
  constructor() {
    super(new PrimaryAppraisalRequestsState());
  }

  addRequest(
    projectRef: string,
    viewerRef: string,
    submitData: any,
    formIdentity: string,
    smeRef: string,
    status: string,
  ): void {
    this.setState({
      ...this.state,
      requests: [
        ...this.state.requests,
        {
          projectRef: projectRef,
          viewerRef: viewerRef,
          submitData: submitData,
          formIdentity: formIdentity,
          smeRef: smeRef,
          status: status,
        }
      ]
    });
  }

  addAllRequests(requests) {
    this.setState({
      ...this.state,
      requests: requests
    })
  }

  getRequest(projectId) {
    let request = null;
    this.state.requests.forEach((c) => {
      if (c.projectRef === projectId) {
        request = c;
      }
    });
    return request;
  }


  submitAppraisalRequest(projectId) {
    this.setState({
      ...this.state,
      requests: this.state.requests.map((c) => {
        if (c.projectRef === projectId) {
          return {
            ...c,
            status: 'done',
          }
        }
        return c;
      })
    });
  }
}
