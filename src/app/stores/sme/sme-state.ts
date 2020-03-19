const SMES = [
  { name: 'Organization Structure', key: 'quali-os', userRef: 'usman@ali.com', formGenerated: true },
  { name: 'Regulatory and legal regimes', key: 'quali-rlr', userRef: 'test1@sme.com', formGenerated: true },
  { name: 'Gender and Inclusion', key: 'quali-gia', userRef: null, formGenerated: true },
  { name: 'Procurement', key: 'quali-proc', userRef: null, formGenerated: true },
  { name: 'Environment & Social Safeguards', key: 'quali-ess', userRef: null, formGenerated: true },
]

export class SmeState {
  smes: { name: string, key: string, userRef: string, formGenerated: boolean }[] = SMES;
}