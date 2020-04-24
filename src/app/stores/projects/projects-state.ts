const PROJECTS = [
  {
    name: 'AJK Fund Project',
    status: 'accrediated',
    type: 'single',
    userRef: 'user1',
    key: 'ajskhdkjahsd',
  },
  {
    name: 'Random Project',
    status: 'In Review',
    type: 'single',
    userRef: 'user1',
    key: 'akjshdbmnbnb',
  },
  {
    name: 'Main Project',
    status: "In Review",
    type: 'single',
    userRef: 'user6',
    key: '9080asdah',
  },
  {
    name: 'AJK Fund Project 2',
    status: "string",
    type: 'single',
    userRef: 'user6',
    key: '9080asdah98989999',
  },
]
export class ProjectsState {
  projects: {
    name: string,
    type: string,
    status: string,
    userRef: string,
    key: string,
  }[] = PROJECTS;
}
