const PROPOSALS = [
  {
    userRef: 'user1',
    formSubmitData: { 'projectName': 'Mera Project', 'companyName': 'XYZ Bucket Company', 'howManyEmployee': 4 },
    status: 'pending',
    formIdentity: 'proposal-os',
    startDate: null,
    endDate: null,
    previousReview: null,
    currentReview: null,
    requestKey: 'proposal-form',
    userUpdateFlag: false,
  },
]


export class ProposalRequests {
  proposals: any = PROPOSALS;
}