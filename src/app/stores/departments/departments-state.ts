const DEPARTMENTS = [
  {name:"CEO", key:'ceo'},
  {name:"P&OG", key:'pog'},
  {name:"HR", key:'hr'},
  {name:"Finance", key:'finance'},
  {name:"FMG", key:'fmg'},
  {name:"PAM", key:'pam'},
  {name:"Procurement", key:'proc'},
];

export class DepartmentsState {
  departments: {
    name: string, 
    key: string
  }[] = DEPARTMENTS;
}

