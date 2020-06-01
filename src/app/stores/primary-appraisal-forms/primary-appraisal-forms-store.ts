import { Injectable } from '@angular/core';
import { Store } from '../store';
import { PrimaryAppraisalFormsState } from './primary-appraisal-forms-state';

@Injectable()
export class PrimaryAppraisalFormsStore extends Store<PrimaryAppraisalFormsState> {
  constructor() {
    super(new PrimaryAppraisalFormsState());
  }

  addPrimaryAppraisal(
    preAppraisal: any,
  ): void {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: preAppraisal,
      }
    });
  }

  addSelectedProject(selectedProject) {
    this.setState({
      ...this.state,
      selectedProject: selectedProject
    })
  }
}
