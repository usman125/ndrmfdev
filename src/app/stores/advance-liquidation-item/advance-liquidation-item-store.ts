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
        data: data.map((c) => {
          return {
            ...c,
            // parentCosts: [],
          }
        })
      }
    })
  }

  setDataParents(activity, data) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        data: this.state.data.data.map((c) => {
          if (activity._id === c._id) {
            return {
              ...c,
              parentCosts: data,
            }
          }
          return c;
        })
      }
    })
  }

  setAdvanceLiquidationStatus(status) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        status: status,
        subStatus: 'Pending',
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
