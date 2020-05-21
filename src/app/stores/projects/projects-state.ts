const PROJECTS = [];
//   {
//     name: 'AJK Fund Project',
//     status: 'accrediated',
//     type: 'single',
//     userRef: 'user1',
//     key: 'ajskhdkjahsd',
//     primaryAppraisalStatus: null, //status can be pending expried or done, null initially 
//     primaryAppraisalStartDate: null, //expiry for DM
//     primaryAppraisalEndDate: null, //expiry for DM
//     extendedAppraisalStatus: null, //status can be pending expried or done 
//     extendedAppraisalExpiry: null, //expiry for DM
//     smeReview: null,
//   },
//   {
//     name: 'Random Project',
//     status: 'In Review',
//     type: 'single',
//     userRef: 'user1',
//     key: 'akjshdbmnbnb',
//     primaryAppraisalStatus: null, //status can be pending expried or done, null initially 
//     primaryAppraisalStartDate: null, //expiry for DM
//     primaryAppraisalEndDate: null, //expiry for DM
//     extendedAppraisalStatus: null, //status can be pending expried or done 
//     extendedAppraisalExpiry: null, //expiry for DM
//     smeReview: null,
//   },
//   {
//     name: 'Main Project',
//     status: "In Review",
//     type: 'single',
//     userRef: 'user6',
//     key: '9080asdah',
//     primaryAppraisalStatus: null, //status can be pending expried or done, null initially 
//     primaryAppraisalStartDate: null, //expiry for DM
//     primaryAppraisalEndDate: null, //expiry for DM
//     extendedAppraisalStatus: null, //status can be pending expried or done 
//     extendedAppraisalExpiry: null, //expiry for DM
//     smeReview: null,
//   },
//   {
//     name: 'AJK Fund Project 2',
//     status: "string",
//     type: 'single',
//     userRef: 'user6',
//     key: '9080asdah98989999',
//     primaryAppraisalStatus: null, //status can be pending expried or done, null initially 
//     primaryAppraisalStartDate: null, //expiry for DM
//     primaryAppraisalEndDate: null, //expiry for DM
//     extendedAppraisalStatus: null, //status can be pending expried or done 
//     extendedAppraisalExpiry: null, //expiry for DM
//     smeReview: null,
//   },
// ]
// export class ProjectsState {
//   projects: {
//     name: string,
//     type: string,
//     status: string,
//     userRef: string,
//     key: string,
//     primaryAppraisalStatus: string,
//     primaryAppraisalStartDate: string,
//     primaryAppraisalEndDate: string,
//     extendedAppraisalStatus: string,
//     extendedAppraisalExpiry: string,
//     smeReview: string,
// }[] = PROJECTS;

export class ProjectsState {
  projects: {
    id: string,
    initiatorFullName: string,
    name: string,
    status: string,
    submittedAt: string,
    thematicAreaName: string
  }[] = []
}
