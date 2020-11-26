const QPR = {
  quarter: 0,
  ndrmfShare: 0,
  ndrmfAchieved: 0,
  ndrmfExpense: 0,
  ndrmfExpenseAchieved: 0,
  fipShare: 0,
  fipAchieved: 0,
  fipExpense: 0,
  fipExpenseAchieved: 0,
}

export class QprState {
  stats: {
    quarter: any,
    ndrmfShare: any,
    ndrmfAchieved: any,
    ndrmfExpense: any,
    ndrmfExpenseAchieved: any,
    fipShare: any,
    fipAchieved: any,
    fipExpense: any,
    fipExpenseAchieved: any,
  } = QPR;
}
