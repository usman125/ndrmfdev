const SECTIONS = [];

export class QprSectionsState {
  sections: {
    id: string,
    name: string,
    totalScore: number,
    passingScore: number,
    templateType: string,
    template: any,
    data: any,
    sme: any,
    assigned: boolean,
    reviewHistory: any,
    review: any,
    reviewStatus: string,
    projectStatus: string,
    reassignmentStatus: string,
    reviewDeadline: any,
    reviewCompletedDate: any,
    qprId: any,
  }[] = SECTIONS;
}
