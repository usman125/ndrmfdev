import { Injectable } from '@angular/core';
import { Store } from '../store';
import { ProjectsState } from './projects-state';

@Injectable()
export class ProjectsStore extends Store<ProjectsState> {
  constructor() {
    super(new ProjectsState());
  }

  addProject(
    id: string,
    initiatorFullName: string,
    name: string,
    status: string,
    submittedAt: string,
    thematicAreaName: string,
    newEntry: boolean,
  ): void {
    this.setState({
      ...this.state,
      projects: [
        {
          "id": id,
          "initiatorFullName": initiatorFullName,
          "name": name,
          "status": status,
          "submittedAt": submittedAt,
          "thematicAreaName": thematicAreaName,
          "newEntry": newEntry,
        },
        ...this.state.projects,
      ]
    });
  }

  addAllProjects(projects) {
    this.setState({
      ...this.state,
      projects: projects
    })
  }

  // markPrimaryAppraisal(
  //   startDate,
  //   endDate,
  //   projectId,
  // ) {
  //   this.setState({
  //     ...this.state,
  //     projects: this.state.projects.map((c) => {
  //       if (c.key === projectId) {
  //         return {
  //           ...c,
  //           primaryAppraisalStatus: 'pending',
  //           primaryAppraisalStartDate: startDate,
  //           primaryAppraisalEndDate: endDate,
  //         }
  //       }
  //       return c;
  //     })
  //   })
  // }

  // completeAppraisalTask(projectId) {
  //   this.setState({
  //     ...this.state,
  //     projects: this.state.projects.map((c) => {
  //       if (c.key === projectId) {
  //         return {
  //           ...c,
  //           primaryAppraisalStatus: 'submitted',
  //           primaryAppraisalEndDate: new Date().toISOString(),
  //         }
  //       }
  //       return c;
  //     })
  //   });
  // }


  getProject(projectId) {
    let project = null;
    this.state.projects.forEach(c => {
      if (c.id === projectId) {
        project = c;
      }
    });
    return project;
  }
}
