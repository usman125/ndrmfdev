import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProposalFormsState } from './proposal-forms-state';

@Injectable()
export class ProposalFormsStore extends Store<ProposalFormsState> {
  constructor() {
    super(new ProposalFormsState());
  }

  addProposalForm(
    id: string,
    name: string,
    processOwner: any,
    enabled: boolean
  ): void {
    this.setState({
      ...this.state,
      forms: [
        ...this.state.forms,
        {
          id: id,
          name: name,
          processOwner: processOwner,
          enabled: enabled
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

  updateProcessOwner(id, processOwner) {
    this.setState({
      ...this.state,
      forms: this.state.forms.map(c => {
        if (c.id === id) {
          return {
            ...c,
            processOwner: processOwner
          }
        }
        return c;
      })
    });
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
