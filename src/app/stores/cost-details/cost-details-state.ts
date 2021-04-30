const QPR = {
  _id: null,
  title: null,
  quarter: null,
  costData: null,
  progress: null,
  update: true,
  clubbed: false,
  clubId: null,
  clubData: null,
  progressSubmitted: null,
}

export class CostDetailsState {
  cost: {
    _id: string,
    title: string,
    quarter: number,
    costData: any
    progress: any,
    update: boolean,
    clubbed: boolean,
    clubId: string,
    clubData: any,
    progressSubmitted: boolean,
  } = QPR;
}
