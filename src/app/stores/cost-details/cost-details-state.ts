const QPR = {
  title: null,
  quarter: null,
  costData: null,
  progress: null,
  update: true
}

export class CostDetailsState {
  cost: {
    title: string,
    quarter: number,
    costData: any
    progress: any,
    update: boolean
  } = QPR;
}
