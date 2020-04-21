const PROJECTS = [
  {
    name: 'AJK Fund Project',
    status: 'accrediated',
    type: 'single'
  },
  {
    name: 'Random Project',
    status: 'In Review',
    type: 'single'
  },
  {
    name: 'Main Project',
    status: "In Review",
    type: 'single'
  },
  {
    name: 'AJK Fund Project 2',
    status: "string",
    type: 'single'
  },
]
export class ProjectsState {
  peojects: {
    name: string,
    type: string,
    status: string,
  }[] = PROJECTS;
}
