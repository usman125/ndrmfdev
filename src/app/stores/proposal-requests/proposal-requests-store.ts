import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProposalRequests } from './proposal-requests-state';

@Injectable()
export class ProposalRequestsStore extends Store<ProposalRequests> {
  constructor() {
    super(new ProposalRequests());
  }

  addProposalRequest(
    userRef: string,
    formSubmitData: any,
    formIdentity: string,
    projectRef: string,
    ): void {
      this.setState({
        ...this.state,
        proposals: [
          ...this.state.proposals,
          {
            userRef: userRef,
            formSubmitData: formSubmitData,
            status: 'pending',
            formIdentity: formIdentity,
            startDate: null,
            endDate: null,
            previousReview: null,
            currentReview: null,
            requestKey: 'proposal-form',
            userUpdateFlag: false,
            projectRef: projectRef,
        }
      ]
    });
  }


  // updateSectionFormgenerated(
  //   key: string,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     sections: this.state.sections.map((c) => {
  //       if (c.key === key) {
  //         return {
  //           ...c,
  //           formGenerated: true
  //         }
  //       }
  //       return c;
  //     })
  //   });
  // }

  // updateSectionUserRef(
  //   key: string,
  //   userRef: string,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     sections: this.state.sections.map((c) => {
  //       if (c.key === key) {
  //         return {
  //           ...c,
  //           userRef: userRef
  //         }
  //       }
  //       return c;
  //     })
  //   });
  // }



}