const QPR = {
  title: null,
  quarter: null,
  costData: null,
  progress: null,
  update: true,
  clubbed: false,
  clubId: null,
  clubData: null,
}

export class CostDetailsState {
  cost: {
    title: string,
    quarter: number,
    costData: any
    progress: any,
    update: boolean,
    clubbed: boolean,
    clubId: string,
    clubData: any,
  } = QPR;
}
