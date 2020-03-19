const REQUESTS = [];

export class SingleAccreditationRequestState {
  requests: {
    name: string,
    userRef: string,
    submitData: any,
    form: any,
    status: string,
    formIdentity: string,
    startDate: string,
    endDate: string,
    previousReview: string,
    currentReview: string,
    review: any,
  }[] = REQUESTS;
}
