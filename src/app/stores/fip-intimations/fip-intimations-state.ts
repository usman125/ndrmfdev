const INTIMATIONS = [
  {
    "userRef": "dummy@user.com",
    "formIdentity": "quali-os",
    "endDate": "2020-03-23T19:00:00.000Z",
    "comments": [
      {
        "data": "My commnet your oasd oasud oaisdu oaisud",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": "Helloo Here is the first comment",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": "Small Comments from all over the word",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
    ],
    "intimation_status": "pending"
  },
  {
    "userRef": "dummy@user.com",
    "formIdentity": "quali-rlr",
    "endDate": "2020-03-23T19:00:00.000Z",
    "comments": [
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
    ],
    "intimation_status": "pending"
  },
  {
    "userRef": "dummy@user.com",
    "formIdentity": "quali-gia",
    "endDate": "2020-03-23T19:00:00.000Z",
    "comments": [
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      },
    ],
    "intimation_status": "pending"
  },
  {
    "userRef": "dummy@user.com",
    "formIdentity": "quali-proc",
    "endDate": "2020-03-23T19:00:00.000Z",
    "comments": [
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      }
    ],
    "intimation_status": "updated"
  },
  {
    "userRef": "dummy@user.com",
    "formIdentity": "quali-ess",
    "endDate": "2020-03-23T19:00:00.000Z",
    "comments": [
      {
        "data": " iuy98 797 080 97",
        "date": "2020-03-10T19:00:00.000Z"
      }
    ],
    "intimation_status": "updated"
  }
];

export class fipIntimationsState {
  intimations: {
    userRef: string,
    formIdentity: string,
    comments: {
      data: string,
      date: string,
    }[],
    endDate: string,
    intimation_status: string,
  }[] = INTIMATIONS;
}