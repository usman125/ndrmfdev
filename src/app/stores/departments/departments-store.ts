import { Injectable } from '@angular/core';
import { Store } from '../store';
import { DepartmentsState } from './departments-state';

@Injectable()
export class DepartmentsStore extends Store<DepartmentsState> {
  constructor() {
    super(new DepartmentsState());
  }

  addDepartment(
    name: string,
    id: string,
  ): void {
    this.setState({
      ...this.state,
      departments: [
        ...this.state.departments,
        {
          name: name,
          id: id,
        }
      ]
    });
  }

  addAllDepartments(
    departments
  ): void {
    this.setState({
      ...this.state,
      departments: departments
    });
  }
}
