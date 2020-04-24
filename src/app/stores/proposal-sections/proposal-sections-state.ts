const SECTIONS = [
  {
    name: 'Project at a glance',
    key: 'proposal-os',
    userRef: null,
    formGenerated: true
  },
  {
    name: 'Organisational Experience ',
    key: 'proposal-rlr',
    userRef: null,
    formGenerated: true
  },
  {
    name: 'Project Beneficiaries',
    key: 'proposal-gia',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Economic Analysis',
    key: 'proposal-proc',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Proposed work-plan',
    key: 'proposal-ess',
    userRef: null,
    formGenerated: false
  },
  {
    name: 'Team for Proposed Project Implementation',
    key: 'proposal-team',
    userRef: null,
    formGenerated: false
  },
]

export class ProposalSectionsState {
  sections: {
    name: string,
    key: string,
    userRef: string,
    formGenerated: boolean
  }[] = SECTIONS;
}