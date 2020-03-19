import { Injectable } from '@angular/core';
import { Store } from '../store';
import { AccreditationReviewState } from './accreditation-reviews-state';

@Injectable()
export class AccreditationReviewStore extends Store<AccreditationReviewState> {
  constructor() {
    super(new AccreditationReviewState());
  }

  addReview(
    data: {
      title: string,
      value: string,
      submitValue: string,
      key: string,
      rating: number,
      status: string,
    }[],
    rating: number,
    status: string,
    userRef: string,
    formIdentity: string,
    generalComments: string,
  ): void {
    this.setState({
      ...this.state,
      reviews: [
        ...this.state.reviews,
        {
          data: data,
          rating: rating,
          userRef: userRef,
          status: status,
          formIdentity: formIdentity,
          generalComments: generalComments,
        }
      ]
    });
  }

  udpateReview(
    data: {
      title: string,
      value: string,
      submitValue: string,
      key: string,
      rating: number,
      status: string,
    }[],
    rating: number,
    status: string,
    userRef: string,
    formIdentity: string,
    generalComments: string,
  ): void {
    this.setState({
      ...this.state,
      reviews: this.state.reviews.map((c) => {
        if (c.userRef === userRef && c.formIdentity === formIdentity) {
          return {
            ...c,
            data: data,
            rating: rating,
            status: status,
            generalComments: generalComments,
          }
        }
        return c;
      })
    });
  }

  // addAllRequest(
  //   requests: {
  //     name: string,
  //     userRef: string,
  //     submitData: any,
  //     form: any,
  //     status: string,
  //     formIdentity: string,
  //     startDate: string,
  //     endDate: string,
  //     previousReview: string,
  //     currentReview: string,
  //   }[]
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     requests: requests
  //   });
  // }

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

}
