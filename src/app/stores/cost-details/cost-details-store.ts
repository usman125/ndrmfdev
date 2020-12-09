import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CostDetailsState } from './cost-details-state';

@Injectable()
export class CostDetailsStore extends Store<CostDetailsState> {
  constructor() {
    super(new CostDetailsState());
  }

  setDefaults(
    title,
    quarter,
    costData,
    progress,
    update,
    clubbed,
    clubId,
    clubData,
  ): void {
    this.setState({
      ...this.state,
      cost: {
        ...this.state.cost,
        costData: costData,
        title: title,
        quarter: quarter,
        update: update,
        clubbed: clubbed,
        clubId: clubId,
        progress: progress,
        clubData: clubData,
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
