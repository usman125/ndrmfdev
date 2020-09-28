import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CostDetailsState } from './cost-details-state';

@Injectable()
export class CostDetailsStore extends Store<CostDetailsState> {
  constructor() {
    super(new CostDetailsState());
  }

  setDefaults(title, quarter, costData): void {
    this.setState({
      ...this.state,
      cost: {
        ...this.state.cost,
        costData: costData,
        title: title,
        quarter: quarter
      }
    });
  }

}
