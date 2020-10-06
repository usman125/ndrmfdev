import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CostDetailsState } from './cost-details-state';

@Injectable()
export class CostDetailsStore extends Store<CostDetailsState> {
  constructor() {
    super(new CostDetailsState());
  }

  setDefaults(title, quarter, costData, progress, update): void {
    this.setState({
      ...this.state,
      cost: {
        ...this.state.cost,
        costData: costData,
        title: title,
        quarter: quarter,
        update: update,
        progress: progress
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
