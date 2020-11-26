const PROPOSALS = [
  {
    userRef: 'user1',
    formSubmitData: {
      "projec": "Test Project 2",
      "companyName": "Azat Foundation",
      "duration": "18",
      "budget": "large",
      "startDate": "2020-04-22T12:00:00+05:00",
      "endDate": "2020-04-25T12:00:00+05:00",
      "a": "Lahore, Samndabad",
      "submit": true
    },
    status: 'pending',
    formIdentity: 'proposal-os',
    startDate: null,
    endDate: null,
    previousReview: null,
    currentReview: null,
    requestKey: 'proposal-form',
    userUpdateFlag: false,
    projectRef: 'ajskhdkjahsd',
  },
]


export class ProposalRequests {
  proposals: any = PROPOSALS;
}