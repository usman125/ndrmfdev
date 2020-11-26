import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ExtendedAppraisalFormsState } from './extended-appraisal-forms-state';

@Injectable()
export class ExtendedAppraisalFormsStore extends Store<ExtendedAppraisalFormsState> {
  constructor() {
    super(new ExtendedAppraisalFormsState());
  }

  addPrimaryAppraisal(
    name: string,
    display: string,
    smeRef: string,
    formIdentity: string,
    page: number,
    numPages: number,
    components: any
  ): void {
    this.setState({
      ...this.state,
      extendedAppraisalForms: [
        ...this.state.extendedAppraisalForms,
        {
          name: name,
          display: display,
          smeRef: smeRef,
          formIdentity: formIdentity,
          page: page,
          numPages: numPages,
          components: components
        }
      ]
    });
  }

  addAllPrimaryAppraisals(extendedAppraisalForms) {
    this.setState({
      ...this.state,
      extendedAppraisalForms: extendedAppraisalForms
    })
  }
}
