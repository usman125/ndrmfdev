const SECTIONS = [
  {
    name: 'Project at a glance',
    key: 'extended-os',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Organisational Experience ',
    key: 'extended-rlr',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Project Beneficiaries',
    key: 'extended-gia',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Economic Analysis',
    key: 'extended-proc',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Proposed work-plan',
    key: 'extended-ess',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Team for Proposed Project Implementation',
    key: 'extended-team',
    userRef: null,
    formGenerated: false
  },
]

export class ExtendedAppraisalSmesState {
  extendedAppraisal: {
    assigned: any;
    assignee: any;
    comments: any;
    endDate: any;
    id: any;
    sections: {
      id: any,
      templateType: any,
      template: any,
      data: any,
      sme: any,
      assigned: any,
      status: any,
    }[];
    startDate: any;
    status: any;
    completedDate: any;
    decisionByDm: any;
    isMarkedTo: any;
    subStatus: any;
  } = null;
}