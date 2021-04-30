import { Injectable } from '@angular/core';
import { Store } from '../store';
import { DesignationsState } from './designations-state';

@Injectable()
export class DesignationsStore extends Store<DesignationsState> {
  constructor() {
    super(new DesignationsState());
  }

  addDesignations(
    name: string,
    id: string,
  ): void {
    this.setState({
      ...this.state,
      designations: [
        ...this.state.designations,
        {
          name: name,
          id: id,
        }
      ]
    });
  }

  addAllDesignations(
    designations
  ): void {
    this.setState({
      ...this.state,
      designations: designations
    });
  }
}
