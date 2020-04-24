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
}
