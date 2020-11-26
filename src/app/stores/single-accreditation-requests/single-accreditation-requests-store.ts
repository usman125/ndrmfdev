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
    review: any,
    reviewStatus: any,
    reviewHistory: any,
    reassignmentStatus: any,
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
          review: review,
          reviewStatus: reviewStatus,
          reviewHistory: reviewHistory,
          reassignmentStatus: reassignmentStatus,
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
      review: any,
      reviewStatus: any,
      reviewHistory: any,
      reassignmentStatus: any,
    }[]
  ): void {
    this.setState({
      ...this.state,
      requests: requests
    });
  }

  setTaskReview(
    reviewStatus: string,
    sectionId: string,
  ): void {
    console.log("SINGLE TASK UPDATE CALLED:--");
    this.setState({
      ...this.state,
      requests: this.state.requests.map((c) => {
        if (c.id === sectionId) {
          return {
            ...c,
            reviewStatus: reviewStatus,
          }
        }
        return c;
      })
    });
  }

  updateReassignFipSection(sectionIds) {
    this.setState({
      ...this.state,
      requests: this.state.requests.map(c => {
        // sectionIds.forEach(d => {
        //   if (d === c.id) {
        //     console.log("***STIRE ENTRY MATCHED:---", c);
        //   }
        // });
        for (let i=0; i< sectionIds.length; i++){
          if (sectionIds[i] === c.id){
            c.reassignmentStatus = 'Pending';
            break;
          }
        }
        return c;
      })
    })
  }

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

  addSectionReview(sectionId, review) {
    this.setState({
      ...this.state,
      requests: this.state.requests.map(c => {
        if (c.id === sectionId) {
          return {
            ...c,
            review: review
          }
        }
        return c;
      })
    });
  }
}
