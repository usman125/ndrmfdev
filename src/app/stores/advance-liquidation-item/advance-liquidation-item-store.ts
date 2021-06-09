import { Injectable } from '@angular/core';
import { Store } from '../store';
import { AdvanceLiquidationItemState } from './advance-liquidation-item-state';

@Injectable()
export class AdvanceLiquidationItemStore extends Store<AdvanceLiquidationItemState> {
  constructor() {
    super(new AdvanceLiquidationItemState());
  }

  addAdvanceLiquidationItem(data) {
    this.setState({
      ...this.state,
      data: data
    })
  }

  addAdvanceLiquidationItemData(data) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        data: data
      }
    })
  }

  submitLiquidation(ndrmfSoes, fipSoes) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        ndrmfSoes: ndrmfSoes,
        fipSoes: fipSoes,
        status: 'Under Review'
      }
    })
  }


  addAdvanceLiquidationItemTotalCost(amount) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        amount: amount
      }
    })
  }

}