import { Injectable } from '@angular/core';
import { Store } from '../store';
import { AccreditationCommentsMatrixState } from './accreditation-comments-matrix-state';

@Injectable()
export class AccreditationCommentsMatrixStore extends Store<AccreditationCommentsMatrixState> {
  constructor () {
    super(new AccreditationCommentsMatrixState());
  }

  // addVote (candidate: {name: string, votes: number}): void {
  //   this.setState({
  //     ...this.state,
  //     candidates: this.state.candidates.map(c => {
  //       if (c === candidate) {
  //         return {...c, votes: c.votes + 1};
  //       }
  //       return c;
  //     })
  //   });
  // }

  addRequest (request: any): void {
    this.setState({
      ...this.state,
      request: request
    });
  }
}
