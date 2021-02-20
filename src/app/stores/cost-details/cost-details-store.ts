import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CostDetailsState } from './cost-details-state';

@Injectable()
export class CostDetailsStore extends Store<CostDetailsState> {
  constructor() {
    super(new CostDetailsState());
  }

  setDefaults(
    _id,
    title,
    quarter,
    costData,
    progress,
    update,
    clubbed,
    clubId,
    clubData,
    progressSubmitted,
  ): void {
    this.setState({
      ...this.state,
      cost: {
        ...this.state.cost,
        _id: _id,
        costData: costData,
        title: title,
        quarter: quarter,
        update: update,
        clubbed: clubbed,
        clubId: clubId,
        progress: progress,
        clubData: clubData,
        progressSubmitted: progressSubmitted,
      }
    });
  }

  changeUpdateValue(value): void {
    this.setState({
      ...this.state,
      cost: {
        ...this.state.cost,
        update: value
      }
    });
  }

}
