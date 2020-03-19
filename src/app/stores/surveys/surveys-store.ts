import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SurveysState } from './surveys-state';

@Injectable()
export class SurveysStore extends Store<SurveysState> {
  constructor() {
    super(new SurveysState());
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

  addForm(
    name: string,
    smeRef: string,
    passScore: string,
    totalScore: string,
    display: string,
    page: number,
    refreshOn: string,
    numPages: number,
    components: any
  ): void {
    this.setState({
      ...this.state,
      surveys: [
        ...this.state.surveys,
        {
          name: name,
          smeRef: smeRef,
          page: page,
          passScore: passScore,
          totalScore: totalScore,
          numPages: numPages,
          refreshOn: refreshOn,
          display: display,
          components: components
        }
      ]
    });
  }
}
