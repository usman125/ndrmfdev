import { Injectable } from '@angular/core';
import { Store } from '../store';
import { fipIntimationsState } from './fip-intimations-state';
// import { MAT_DIALOG_DATA } from '@angular/material';

// interface DialogData {
//   comments: string;
//   startDate: string;
//   endDate: string;
// }

@Injectable()
export class fipIntimationsStore extends Store<fipIntimationsState> {
  constructor() {
    super(new fipIntimationsState());
  }

  addIntimations(
    intimations: {
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
      intimations: intimations
    });
  }

  filterIntimations(id){
    this.setState({
      ...this.state,
      intimations: this.state.intimations.map(c => {
        if (c.id !== id){
          return c;
        }
      })
    })
  }

  // newIntimations(
  //   intimations: {
  //     userRef: string,
  //     formIdentity: string,
  //     comments: {
  //       data: string,
  //       date: string,
  //     }[],
  //     endDate: string,
  //     intimation_status: string,
  //   }[]
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     intimations: [
  //       ...this.state.intimations.concat(intimations)
  //     ]
  //   });
  // }

  // filterIntimations(
  //   userRef: string,
  // ): fipIntimationsState {
  //   var result: fipIntimationsState = new fipIntimationsState();
  //   console.log("DUMMY RESULT:--", result);
  //   result.intimations = this.state.intimations.map((c) => {
  //     if (c.userRef === userRef) {
  //       return c;
  //     }
  //     return c;
  //   });
  //   return result;
  // }

  // updateIntimationStatus(
  //   userRef: string,
  //   formIdentity: string,
  // ) {
  //   this.setState({
  //     ...this.state,
  //     intimations: this.state.intimations.map((c) => {
  //       if (c.userRef === userRef && c.formIdentity === formIdentity) {
  //         return { ...c, intimation_status: 'updated', endDate: new Date().toISOString() }
  //       }
  //       return c;
  //     })
  //   })
  // }
}
