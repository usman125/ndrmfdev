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
          subStatus: null,
          isMarkedTo: null,
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
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          isMarkedTo: 'Marked to GM',
          subStatus: 'Pending'
        }
      }
    })
  }

  markExtToGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          isMarkedTo: 'Marked to GM',
          subStatus: 'Pending'
        }
      }
    })
  }

  markToCeo() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          isMarkedTo: 'Marked to CEO',
          subStatus: 'Pending'
        }
      }
    })
  }

  markExtToCeo() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          isMarkedTo: 'Marked to CEO',
          subStatus: 'Pending'
        }
      }
    })
  }

  approvePreApparisalByGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          subStatus: 'Approved'
        }
      }
    })
  }

  disapprovePreApparisalByGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        preAppraisal: {
          ...this.state.selectedProject.preAppraisal,
          subStatus: 'Rejected'
        }
      }
    })
  }

  goToPDRMC() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        status: 'Upload PDRMC',
      }
    });
  }

  approveExtApparisalByGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          subStatus: 'Approved'
        }
      }
    })
  }

  disapproveExtApparisalByGm() {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        extendedAppraisal: {
          ...this.state.selectedProject.extendedAppraisal,
          subStatus: 'Rejected'
        }
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

  submitGia(data) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        gia: {
          ...this.state.selectedProject.gia,
          subStatus: null,
          status: 'Pending',
          data: data,
        }
      }
    });
  }

  addGiaReviewers(reviews) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        gia: {
          ...this.state.selectedProject.gia,
          reviews: reviews,
          subStatus: 'Pending Reviews',
        }
      }
    });
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

  addSelectedProjectFiles(files) {
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        files: files
      }
    })
  }

  addPipToProject(allCosts, clubs) {
    let object = {
      costs: allCosts,
      clubs: clubs
    }
    this.setState({
      ...this.state,
      selectedProject: {
        ...this.state.selectedProject,
        implementationPlan: object
      }
    });

  }
}
