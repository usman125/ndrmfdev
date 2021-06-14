const DISBURSMENT = null;

export class SingleGrantDisbursmentsState {
  disbursment: {
    proposalName: string,
    implementationPlan: any,
    initialAdvance: {
      status: any,
      subStatus: any,
      amount: any,
      data: any,
      id: any,
      initialAdvanceReviewsList: any
      payeesName: any,
      payeesAddress: any,
      bankName: any,
      bankAddress: any,
      payeesAccount: any,
      swiftCode: any,
      specialPaymentInstruction: any,
    },
    quarterAdvanceList: any,
    assigned: any,
    id: any,
    initAdvanceStatus: any,
    owner: any,
    quarterAdvanceStatus: any,
    status: any,
    subStatus: any,
    selectionType: any
  } = DISBURSMENT;
}
