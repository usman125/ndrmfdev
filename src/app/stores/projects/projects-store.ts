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
  ): void {
    this.setState({
      ...this.state,
      peojects: [
        ...this.state.peojects,
        {
          name: name,
          type: type,
          status: status,
        }
      ]
    });
  }

  addAllProjects(projects){
    this.setState({
      ...this.state,
      peojects: projects
    })
  }
}
