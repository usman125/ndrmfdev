import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SubProjectDocSectionsState } from './sub-proj-doc-sections-state';

@Injectable()
export class SubProjectDocSectionsStore extends Store<SubProjectDocSectionsState> {
  constructor() {
    super(new SubProjectDocSectionsState());
  }

  addRequest(
    status: string,
    sections: any,
    dmpamTasks: any,
  ): void {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        sections: sections,
        status: status,
        dmpamTasks: dmpamTasks,
      }
    });
  }

  addAllRequests(sections) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        sections: sections
      }
    })
  }

  addSectionData(section, data) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        sections: this.state.request.sections.map((c) => {
          if (c.id === section.id) {
            return {
              ...c,
              data: data,
              status: 'Completed',
              reassignmentStatus: c.reassignmentStatus !== null ? 'Completed' : null,
            }
          }
          return c;
        })
      }
    });
  }

  addSectionReview(section) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        sections: this.state.request.sections.map((c) => {
          if (c.id === section.id) {
            return {
              ...c,
              reviewStatus: 'Pending',
            }
          }
          return c;
        })
      }
    });
  }

  changeSectionReviewStatus(sectionId, status) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        sections: this.state.request.sections.map((c) => {
          if (c.id === sectionId) {
            return {
              ...c,
              reviewStatus: status,
            }
          }
          return c;
        })
      }
    });
  }

  assignUsersForReviewsByDmpam(body, storeArray) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        dmpamTasks: this.state.request.dmpamTasks.map((c) => {
          if (c.id === body) {
            if (c.tasks) {
              return {
                ...c,
                tasks: [...c.tasks, ...storeArray]
              }
            } else {
              return {
                ...c,
                tasks: storeArray
              }
            }
          }
          return c;
        })
      }
    })
  }

  changeSubProjectDocDmPamTaskStatus(id, status) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        dmpamTasks: this.state.request.dmpamTasks.map((c) => {
          if (c.id === id) {
            return {
              ...c,
              status: status
            }
          }
          return c;
        })
      }
    })
  }

  changeSubProjectDocStatus(status) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        status: status
      }
    })
  }

  submitUserReview(dmpamTaskId, taskId) {
    this.setState({
      ...this.state,
      request: {
        ...this.state.request,
        dmpamTasks: this.state.request.dmpamTasks.map((c) => {
          if (c.id === dmpamTaskId) {
            return {
              ...c,
              tasks: c.tasks.map((d) => {
                if (d.id === taskId) {
                  return {
                    ...d,
                    status: 'Completed'
                  }
                }
                return d;
              })
            }
          }
          return c;
        })
      }
    })
  }
}
