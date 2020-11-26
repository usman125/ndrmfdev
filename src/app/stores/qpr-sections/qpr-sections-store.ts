import { Injectable } from '@angular/core';
import { Store } from '../store';
import { QprSectionsState } from './qpr-sections-state';

@Injectable()
export class QprSectionsStore extends Store<QprSectionsState> {
  constructor() {
    super(new QprSectionsState());
  }

  addAllSections(sections) {
    this.setState({
      ...this.state,
      sections: sections
    })
  }

  updateSectionReview(data, id) {
    this.setState({
      ...this.state,
      sections: this.state.sections.map(c => {
        if (c.id === id) {
          return {
            ...c, 
            data: data,
          }
        }
        return c;
      })
    });
  }

  assignTasksToSmes(sectionId) {
    this.setState({
      ...this.state,
      sections: this.state.sections.map(c => {
        if (c.id === sectionId) {
          return {
            ...c,
            reviewStatus: 'Pending',
            reviewDeadline: new Date(),
          }
        }
        return c;
      })
    })
  }

  submitProposalReview(sectionId, review) {
    this.setState({
      ...this.state,
      sections: this.state.sections.map(c => {
        if (c.id === sectionId) {
          return {
            ...c,
            review: review,
            reviewStatus: 'Completed',
            reviewCompletedDate: new Date().toISOString()
          }
        }
        return c;
      })
    })
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