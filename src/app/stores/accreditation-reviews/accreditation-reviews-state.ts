const REVIEWS = [
];

export class AccreditationReviewState {
  reviews: {
    data: {
      title: string,
      value: string,
      submitValue: string,
      key: string,
      rating: number,
      status: string,
    }[],
    rating: number,
    status: string,
    userRef: string,
    formIdentity: string,
    generalComments: string,
  }[] = REVIEWS;
}