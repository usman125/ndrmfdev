import { Injectable } from '@angular/core';
import { Store } from '../store';
import { PrimaryAppraisalFormsState } from './primary-appraisal-forms-state';

@Injectable()
export class PrimaryAppraisalFormsStore extends Store<PrimaryAppraisalFormsState> {
  constructor() {
    super(new PrimaryAppraisalFormsState());
  }

  addPrimaryAppraisal(
    name: string,
    display: string,
    formIdentity: string,
    page: number,
    numPages: number,
    components: any
  ): void {
    this.setState({
      ...this.state,
      primaryAppraisals: [
        ...this.state.primaryAppraisals,
        {
          name: name,
          display: display,
          formIdentity: formIdentity,
          page: page,
          numPages: numPages,
          components: components
        }
      ]
    });
  }

  addAllPrimaryAppraisals(primaryAppraisals) {
    this.setState({
      ...this.state,
      primaryAppraisals: primaryAppraisals
    })
  }
}
