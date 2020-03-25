const FORMS = [];

export class ProposalFormsState {
  forms: {
    name: string,
    smeRef: string,
    components: {}[],
    type: string,
    page: string,
    numPages: string,
  }[] = FORMS;
}