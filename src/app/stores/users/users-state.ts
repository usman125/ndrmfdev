const USERS = [
  {
    name: 'Usman Ali Khan',
    email: 'khan@khan.com',
    username: 'khan',
    password: 'khan',
    department: 'none',
    role: 'admin',
    smeRef: 'none',
    active: true,
    eligibileFlag: false,
    qualificationFlag: false,
    typeNames: [],
    roleNames: [],
  },
  {
    name: 'Arslan Ali Khan',
    email: 'arsie@arsie.com',
    username: 'arsie',
    password: 'arsie',
    department: 'none',
    role: 'fip',
    smeRef: 'none',
    active: true,
    eligibileFlag: false,
    qualificationFlag: false,
    roleNames: [],
    typeNames: [],
  },
  // {
  //   name: 'Test Fip 1',
  //   email: 'test1@fip.com',
  //   username: 'testfip1',
  //   password: '1234',
  //   department: 'none',
  //   role: 'fip',
  //   smeRef: 'none',
  //   active: true,
  //   eligibileFlag: false,
  //   qualificationFlag: false,
  // },
  // {
  //   name: 'Test Fip 2',
  //   email: 'test2@fip.com',
  //   username: 'testfip2',
  //   password: '1234',
  //   department: 'none',
  //   role: 'fip',
  //   smeRef: 'none',
  //   active: true,
  //   eligibileFlag: false,
  //   qualificationFlag: false,
  // },
  {
    name: 'Dummy User',
    email: 'dummy@user.com',
    username: 'dummy',
    password: '1234',
    department: 'none',
    role: 'fip',
    smeRef: 'none',
    active: true,
    eligibileFlag: true,
    qualificationFlag: false,
    roleNames: [],
    typeNames: [],
  },
  {
    name: 'Usman Ali Khan',
    email: 'usman@ali.com',
    username: 'khansme',
    password: 'khan',
    department: 'none',
    role: 'sme',
    smeRef: 'quali-os',
    active: true,
    eligibileFlag: false,
    qualificationFlag: false,
    roleNames: [],
    typeNames: [],
  },
  // {
  //   name: 'Test Sme 1',
  //   email: 'test1@sme.com',
  //   username: 'testsme1',
  //   password: '1234',
  //   department: 'none',
  //   role: 'sme',
  //   smeRef: 'quali-rlr',
  //   active: true,
  //   eligibileFlag: false,
  //   qualificationFlag: false,
  // },
]

export class UsersState {
  users: {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    smeRef: string,
    department: string,
    username: string,
    password: string,
    active: boolean,
    eligibileFlag: boolean,
    qualificationFlag: boolean,
    roles: any,
    orgId: any,
    orgName: string,
  }[] = [];
}
