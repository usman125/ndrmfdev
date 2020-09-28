const QPR = {
  title: null,
  quarter: null,
  costData: null
}

export class CostDetailsState {
  cost: {
    title: string,
    quarter: number,
    costData: any
  } = QPR;
}
