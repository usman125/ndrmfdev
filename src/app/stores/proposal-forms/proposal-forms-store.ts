import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProposalFormsState } from './proposal-forms-state';

@Injectable()
export class ProposalFormsStore extends Store<ProposalFormsState> {
  constructor() {
    super(new ProposalFormsState());
  }

  addProposalForm(
    name: string,
    smeRef: string,
    components: {}[],
    type: string,
    page: string,
    numPages: string,
  ): void {
    this.setState({
      ...this.state,
      forms: [
        ...this.state.forms,
        {
          name: name,
          smeRef: smeRef,
          components: components,
          type: type,
          page: page,
          numPages: numPages,
        }
      ]
    });
  }

  setAllForms(
    forms
  ) {
    this.setState({
      ...this.state,
      forms: forms
    })
  }

  // updateSme(
  //   name: string,
  //   key: string,
  //   userRef: string,
  //   formGenerated: boolean,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     smes: this.state.smes.map((c) => {
  //       if (c.key === key) {
  //         return {
  //           ...c,
  //           name: name,
  //           key: key,
  //           userRef: userRef,
  //           formGenerated: formGenerated
  //         }
  //       }
  //       return c;
  //     })
  //   });
  // }


  // updateUserRef(
  //   key: string,
  //   userRef: string
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     smes: [
  //       ...this.state.smes.map((c) => {
  //         if (c.key === key) {
  //           return { ...c, userRef: userRef }
  //         }
  //         return c;
  //       })
  //     ]
  //   });
  // }

  // dropUserRef(
  //   key: string,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     smes: [
  //       ...this.state.smes.map((c) => {
  //         if (c.key === key) {
  //           return { ...c, userRef: null }
  //         }
  //         return c;
  //       })
  //     ]
  //   });
  // }

  // updateFormGenrated(
  //   key: string,
  // ): void {
  //   this.setState({
  //     ...this.state,
  //     smes: [
  //       ...this.state.smes.map((c) => {
  //         if (c.key === key) {
  //           return { ...c, formGenerated: true }
  //         }
  //         return c;
  //       })
  //     ]
  //   });
  // }


}
