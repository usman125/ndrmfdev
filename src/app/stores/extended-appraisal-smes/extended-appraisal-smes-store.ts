import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ExtendedAppraisalSmesState } from './extended-appraisal-smes-state';

@Injectable()
export class ExtendedAppraisalSmesStore extends Store<ExtendedAppraisalSmesState> {
  constructor() {
    super(new ExtendedAppraisalSmesState());
  }

  addAppraisal(appraisal) {
    this.setState({
      ...this.state,
      extendedAppraisal: appraisal
    })
  }

  updateSectionData(id, data) {
    this.setState({
      ...this.state,
      extendedAppraisal: {
        ...this.state.extendedAppraisal,
        sections: this.state.extendedAppraisal.sections.map(c => {
          if (c.id === id) {
            return {
              ...c,
              data: data,
              status: 'Completed',
            }
          }
          return c;
        })
      }
    })
  }

  updateSectionStatus(id) {
    this.setState({
      ...this.state,
      extendedAppraisal: {
        ...this.state.extendedAppraisal,
        sections: this.state.extendedAppraisal.sections.map(c => {
          if (c.id === id) {
            return {
              ...c,
              status: 'Pending',
            }
          }
          return c;
        })
      }
    })
  }

  extendedAppraisalDecisionByDm() {
    this.setState({
      ...this.state,
      extendedAppraisal: {
        ...this.state.extendedAppraisal,
        decisionByDm: 'Approved',
      }
    })
  }

  // addSection(
  //   name: string,
  //   key: string,
  //   userRef: string,
  //   formGenerated: boolean,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     sections: [
  //       ...this.state.sections,
  //       {
  //         name: name,
  //         key: key,
  //         userRef: userRef,
  //         formGenerated: formGenerated,
  //       }
  //     ]
  //   });
  // }

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