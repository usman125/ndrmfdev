import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProposalSectionsState } from './proposal-sections-state';

@Injectable()
export class ProposalSectionsStore extends Store<ProposalSectionsState> {
  constructor() {
    super(new ProposalSectionsState());
  }

  addSection(
    id: string,
    name: string,
    totalScore: number,
    passingScore: number,
    templateType: string,
    template: any,
    data: any,
    sme: any,
    assigned: boolean,
    reviewHistory: any,
    review: any,
    reviewStatus: string,
    reassignmentStatus: string,
    projectStatus: string,
    reviewDeadline: any,
    reviewCompletedDate: any,
  ): void {
    this.setState({
      ...this.state,
      sections: [
        ...this.state.sections,
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
          reviewHistory: reviewHistory,
          review: review,
          reviewStatus: reviewStatus,
          reassignmentStatus: reassignmentStatus,
          projectStatus: projectStatus,
          reviewDeadline: reviewDeadline,
          reviewCompletedDate: reviewCompletedDate,
        }
      ]
    });
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