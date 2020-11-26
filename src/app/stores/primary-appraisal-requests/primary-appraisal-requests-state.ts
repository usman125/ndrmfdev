const REQUESTS = [
  // {
  //   "name": 'Eligibility - Registration',
  //   "display": "form",
  //   "formIdentity": "primary-appraisal",
  //   "page": 0,
  //   "numPages": 2,
  // },
  // {
  //   "name": "Eligibility - Financial Management",
  //   "display": "form",
  //   "formIdentity": "primary-appraisal",
  //   "page": 0,
  //   "numPages": 2,
  // },
]

export class PrimaryAppraisalRequestsState {
  requests: {
    projectRef: string,
    viewerRef: string,
    submitData: any,
    formIdentity: string,
    smeRef: string,
    status: string,
  }[] = REQUESTS;
}
