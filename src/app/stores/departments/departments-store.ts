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
    key: string,
  ): void {
    this.setState({
      ...this.state,
      departments: [
        ...this.state.departments,
        {
          name: name,
          key: key,
        }
      ]
    });
  }
}
