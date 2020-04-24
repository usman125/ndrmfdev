const PROJECTS = [
  {
    name: 'AJK Fund Project',
    status: 'accrediated',
    type: 'single',
    userRef: 'user1',
  },
  {
    name: 'Random Project',
    status: 'In Review',
    type: 'single',
    userRef: 'user1',
  },
  {
    name: 'Main Project',
    status: "In Review",
    type: 'single',
    userRef: 'user6',
  },
  {
    name: 'AJK Fund Project 2',
    status: "string",
    type: 'single',
    userRef: 'user6',
  },
]
export class ProjectsState {
  peojects: {
    name: string,
    type: string,
    status: string,
    userRef: string,
  }[] = PROJECTS;
}
