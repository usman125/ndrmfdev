import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProposalSectionsState } from './proposal-sections-state';

@Injectable()
export class ProposalSectionsStore extends Store<ProposalSectionsState> {
  constructor() {
    super(new ProposalSectionsState());
  }

  addSection(
    name: string,
    key: string,
    userRef: string,
    formGenerated: boolean,
  ): void {
    this.setState({
      ...this.state,
      sections: [
        ...this.state.sections,
        {
          name: name,
          key: key,
          userRef: userRef,
          formGenerated: formGenerated,
        }
      ]
    });
  }

  updateSectionFormgenerated(
    key: string,
  ): void {
    this.setState({
      ...this.state,
      sections: this.state.sections.map((c) => {
        if (c.key === key) {
          return {
            ...c,
            formGenerated: true
          }
        }
        return c;
      })
    });
  }

  updateSectionUserRef(
    key: string,
    userRef: string,
  ): void {
    this.setState({
      ...this.state,
      sections: this.state.sections.map((c) => {
        if (c.key === key) {
          return {
            ...c,
            userRef: userRef
          }
        }
        return c;
      })
    });
  }



}