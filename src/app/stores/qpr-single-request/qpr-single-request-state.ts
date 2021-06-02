const QPR = {
  fipName: null,
  processOwnerName: null,
  status: null,
  subStatus: null,
  proposalRef: null,
  implementationPlan: null,
  submittedAt: null,
  dueDate: null,
  quarter: null,
  sections: null,
  reassignmentTask: null,
  tasksForOthers: null,
}

export class QprSingleRequestState {
  qpr: {
    fipName: any,
    processOwnerName: any,
    status: any,
    subStatus: any,
    proposalRef: any,
    implementationPlan: any,
    submittedAt: any,
    dueDate: any,
    quarter: any,
    sections: any,
    reassignmentTask: any,
    tasksForOthers: any,
  } = QPR;
}
