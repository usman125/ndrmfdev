import { Injectable } from '@angular/core';
import { Store } from '../store';
import { GrantDisbursmentsState } from './grant-disbursments-state';

@Injectable()
export class GrantDisbursmentsStore extends Store<GrantDisbursmentsState> {
  constructor() {
    super(new GrantDisbursmentsState());
  }

  addGrantDisbursment(
    id: any,
    created_by: any,
    create_date: any,
    proposalName: any,
  ): void {
    this.setState({
      ...this.state,
      disbursments: [
        ...this.state.disbursments,
        {
          id: id,
          created_by: created_by,
          create_date: create_date,
          proposalName: proposalName,
        }
      ]
    });
  }

  addGrantDisbursments(disbursments) {
    this.setState({
      ...this.state,
      disbursments: disbursments
    })
  }
}
