const COSTS = [];

export class CostSummaryState {
  costs: {
    title: string,
    financers:  [],
    totalCost:  number,
    subcosts: any,
    _id: string,
    mainCostId: string,
  }[] = COSTS;
}