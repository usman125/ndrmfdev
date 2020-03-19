export interface SectionSelector {
  startDate: string,
  endDate: string,
  sections: {
    name: string,
    key: string
  }[]
}

// export class Selector {
//   section: SectionSelector[];
// }