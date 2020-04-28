import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProjectsState } from './projects-state';

@Injectable()
export class ProjectsStore extends Store<ProjectsState> {
  constructor() {
    super(new ProjectsState());
  }

  addProject(
    name: string,
    type: string,
    status: string,
    userRef: string,
    key: string,
    primaryAppraisalStatus: string,
    primaryAppraisalStartDate: string,
    primaryAppraisalEndDate: string,
    extendedAppraisalStatus: string,
    extendedAppraisalExpiry: string,
    smeReview: string,
  ): void {
    this.setState({
      ...this.state,
      projects: [
        ...this.state.projects,
        {
          name: name,
          type: type,
          status: status,
          userRef: userRef,
          key: key,
          primaryAppraisalStatus: primaryAppraisalStatus,
          primaryAppraisalStartDate: primaryAppraisalStartDate,
          primaryAppraisalEndDate: primaryAppraisalEndDate,
          extendedAppraisalStatus: extendedAppraisalStatus,
          extendedAppraisalExpiry: extendedAppraisalExpiry,
          smeReview: smeReview,
        }
      ]
    });
  }

  addAllProjects(projects) {
    this.setState({
      ...this.state,
      projects: projects
    })
  }

  markPrimaryAppraisal(
    startDate,
    endDate,
    projectId,
  ) {
    this.setState({
      ...this.state,
      projects: this.state.projects.map((c) => {
        if (c.key === projectId) {
          return {
            ...c,
            primaryAppraisalStatus: 'pending',
            primaryAppraisalStartDate: startDate,
            primaryAppraisalEndDate: endDate,
          }
        }
        return c;
      })
    })
  }

  completeAppraisalTask(projectId) {
    this.setState({
      ...this.state,
      projects: this.state.projects.map((c) => {
        if (c.key === projectId) {
          return {
            ...c,
            primaryAppraisalStatus: 'submitted',
            primaryAppraisalEndDate: new Date().toISOString(),
          }
        }
        return c;
      })
    });
  }


  getProject(projectId) {
    let project = null;
    this.state.projects.forEach(c => {
      if (c.key === projectId) {
        project = c;
      }
    });
    return project;
  }
}
