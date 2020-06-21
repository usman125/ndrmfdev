import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SubProjectDocSectionsState } from './sub-proj-doc-sections-state';

@Injectable()
export class SubProjectDocSectionsStore extends Store<SubProjectDocSectionsState> {
  constructor() {
    super(new SubProjectDocSectionsState());
  }

  addRequest(
    id: any,
    templateType: any,
    template: any,
    data: any,
    sme: any,
    assigned: any,
    status: any,
    comments: any,
    reviewStatus: any,
    reviewCompletedOn: any,
  ): void {
    this.setState({
      ...this.state,
      sections: [
        ...this.state.sections,
        {
          id: id,
          templateType: templateType,
          template: template,
          data: data,
          sme: sme,
          assigned: assigned,
          status: status,
          comments: comments,
          reviewStatus: reviewStatus,
          reviewCompletedOn: reviewCompletedOn,
        }
      ]
    });
  }

  addAllRequests(sections) {
    this.setState({
      ...this.state,
      sections: sections
    })
  }

  addSectionData(section, data) {
    this.setState({
      ...this.state,
      sections: this.state.sections.map((c) => {
        if (c.id === section.id) {
          return {
            ...c,
            data: data,
            status: 'Completed',
          }
        }
        return c;
      })
    });
  }

  addSectionReview(section) {
    this.setState({
      ...this.state,
      sections: this.state.sections.map((c) => {
        if (c.id === section.id) {
          return {
            ...c,
            reviewStatus: 'Pending Review',
          }
        }
        return c;
      })
    });
  }
}
