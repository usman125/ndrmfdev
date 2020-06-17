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

  changeProjectStatus(staus) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        status: status
      }
    })
  }

  updatePreAppraisalStatus(data) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          status: 'Pending',
          endDate: data.endDate,
          startDate: data.startDate,
        },
        status: 'Preliminary Appraisal'
      }
    })
  }

  updateExtAppraisalStatus(data) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          status: 'Pending',
          endDate: data.endDate,
          startDate: data.startDate,
          sections: data.sections,
          assigned: data.assigned,
          assignee: data.assignee,
          comments: data.comments,
          completedDate: data.completedDate,
          id: data.id,
        },
        status: 'Extended Appraisal',

      }
    })
  }

  markToGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        status: 'Marked to GM',
      }
    })
  }

  approvePreApparisalByGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        status: 'Preliminary Appraisal',
      }
    })
  }

  setProjectStage(stage) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        status: stage,
      }
    })
  }


  setPreAppraisalExpiry() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          status: 'Expired',
          // endDate: data.endDate,
          // startDate: data.startDate,
        }
      }
    })
  }

  setPreAppraisalExpiryDays(days) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          expiryDays: days
          // endDate: data.endDate,
          // startDate: data.startDate,
        }
      }
    })
  }

  setExtAppraisalExpiry() {
    console.log("CALLED:--")
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          status: 'Expired',
          // endDate: data.endDate,
          // startDate: data.startDate,
        }
      }
    })
  }

  setExtAppraisalExpiryDays(days) {
    console.log("CALLED:--")
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          expiryDays: days
          // endDate: data.endDate,
          // startDate: data.startDate,
        }
      }
    })
  }

  updateGiaReview(section, comments) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        gia: {
          ...this.state.selectedProject.gia,
          reviews: this.state.selectedProject.gia.reviews.map((c) => {
            if (c.id === section.id) {
              return {
                ...c,
                comments: comments
              }
            }
            return c;
          })
        }
      }
    })
  }

  submitGiaCheckList(data) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        giaChecklist: {
          ...this.state.selectedProject.giaChecklist,
          data: data
        }
      }
    })
  }

  addGiaCheckList(deadline) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        giaChecklist: {
          ...this.state.selectedProject.giaChecklist,
          data: null,
          deadline: deadline
        }
      }
    })
  }

  addSelectedProject(selectedProject) {
    this.setState({
      ...this.state,
      selectedProject: selectedProject
    })
  }
}
