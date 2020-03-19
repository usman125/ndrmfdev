import { Injectable } from '@angular/core';
import { Store } from '../store';
import { SectionSelectorState } from './section-selector-state';

@Injectable()
export class SectionSelectorStore extends Store<SectionSelectorState> {
  constructor() {
    super(new SectionSelectorState());
  }

  addSelections(selections: { name: string, key: string }[]): void {
    this.setState({
      selections: selections
    });
  }

  removeSelection(selection: { name: string, key: string }): void {
    this.setState({
      selections: this.state.selections.map((c) => {
        if (selection.key !== c.key){
          return c;
        }
        return c;
      })
    });
  }

  removeAllSelections(){
    this.setState({
      ...this.state,
      selections: []
    })
  }

  // addCandidate(name: string): void {
  //   this.setState({
  //     ...this.state,
  //     candidates: [...this.state.candidates, { name: name, votes: 0 }]
  //   });
  // }
}
