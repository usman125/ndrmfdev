const DESIGNATIONS = [
  {name:"CEO", id:'ceo'},
  {name:"P&OG", id:'pog'},
  {name:"HR", id:'hr'},
  {name:"Finance", id:'finance'},
  {name:"FMG", id:'fmg'},
  {name:"PAM", id:'pam'},
  {name:"Procurement", id:'proc'},
];

export class DesignationsState {
  designations: {
    name: string, 
    id: string
  }[] = [];
}

