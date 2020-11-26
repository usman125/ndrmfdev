import { Injectable } from "@angular/core";
import { CostSummaryState } from "./cost-summary-state";
import { Store } from "../store";

@Injectable()
export class CostSummaryStore extends Store<CostSummaryState> {

  constructor() {
    super(new CostSummaryState());
  }


  addCost = (
    cost
  ) => {
    this.setState({
      ...this.state,
      costs: [
        ...this.state.costs,
        {
          title: cost,
          financers: this.state.costs['financers'],
          totalCost: this.state.costs['totalCost'],
          _id: this.state.costs['_id'],
          mainCostId: this.state.costs['mainCostId'],
          subcosts: this.state.costs['subcosts'].map((c) => {
            return { ...c, title: c.title, cost: c.cost || 0 }
          })
        }
      ]
    })
  }


  addAllCosts(
    data
  ) {
    this.setState({
      ...this.state,
      costs: data
    })
  }


  updateHeadCount(
    cost,
    total
  ) {
    this.setState({
      ...this.state,
      costs: this.state.costs.map((c) => {
        if (c._id === cost) {
          return { ...c, totalCost: total }
        }
        return c;
      })
    })
  }
}

