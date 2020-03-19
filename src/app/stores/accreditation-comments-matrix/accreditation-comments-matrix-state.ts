const REQUEST = [
  {
    name: '',
    userRef: '',
    submitData: null,
    form: {},
    status: '',
    formIndentity: '',
    startDate: '',
    endDate: '',
    previousReview: null,
    currentReview: null,
    review: {
      data: [{
        title: '',
        value: '',
        submitValue: '',
        key: '',
        rating: 0,
        status: '',
      }],
      rating: 0,
      status: '',
      userRef: '',
      formIdentity: '',
      generalComments: '',
    }
  }
]

export class AccreditationCommentsMatrixState {
  request: {
    name: string,
    userRef: string,
    submitData: any,
    form: any,
    status: string,
    formIndentity: string,
    startDate: string,
    endDate: string,
    previousReview: string,
    currentReview: string,
    review: {
      data:{
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
    }
  }[] = REQUEST;
}