import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SingleAccreditationRequestState } from './single-accreditation-requests-state';

@Injectable()
export class SingleAccreditationRequestStore extends Store<SingleAccreditationRequestState> {
  constructor() {
    super(new SingleAccreditationRequestState());
  }

  addRequest(
    id: string,
    name: string,
    totalScore: number,
    passingScore: number,
    templateType: string,
    template: any,
    data: any,
    sme: any,
    assigned: boolean,
  ): void {
    this.setState({
      ...this.state,
      requests: [
        ...this.state.requests,
        {
          id: id,
          name: name,
          totalScore: totalScore,
          passingScore: passingScore,
          templateType: templateType,
          template: template,
          data: data,
          sme: sme,
          assigned: assigned,
        }
      ]
    });
  }

  addAllRequest(
    requests: {
      id: string,
      name: string,
      totalScore: number,
      passingScore: number,
      templateType: string,
      template: any,
      data: any,
      sme: any,
      assigned: boolean,
    }[]
  ): void {
    this.setState({
      ...this.state,
      requests: requests
    });
  }

  // setTaskReview(
  //   formIdentity: string,
  //   startDate: string,
  //   endDate: string
  // ): void {
  //   console.log("SINGLE TASK UPDATE CALLED:--");
  //   this.setState({
  //     ...this.state,
  //     requests: this.state.requests.map((c) => {
  //       if (c.formIdentity === formIdentity) {
  //         return {
  //           ...c,
  //           startDate: startDate,
  //           endDate: endDate,
  //           currentReview: 'in_review',
  //         }
  //       }
  //       return c;
  //     })
  //   });
  // }

  // setAllTaskReview(
  //   startDate: string,
  //   endDate: string
  // ): void {
  //   console.log("ALL TASK UPDATE CALLED:--");
  //   this.setState({
  //     ...this.state,
  //     requests: this.state.requests.map((c) => {
  //       if (c.currentReview !== 'in_review') {
  //         return {
  //           ...c,
  //           startDate: startDate,
  //           endDate: endDate,
  //           currentReview: 'in_review',
  //         }
  //       }
  //       return c;
  //     })
  //   });
  // }

  // updateSingleReviewStatus(
  //   userRef: string,
  //   formIdentity: string,
  //   data: any,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     requests: this.state.requests.map((c) => {
  //       if (c.userRef === userRef && c.formIdentity === formIdentity) {
  //         return {
  //           ...c,
  //           currentReview: "reviewed",
  //           review: data,
  //           // review: {...this.state.requests['review'], data},
  //         };
  //       }
  //       return c;
  //     })
  //   })
  // }

  resetData(): void {
    this.setState({
      ...this.state,
      requests: []
    })
  }

}
