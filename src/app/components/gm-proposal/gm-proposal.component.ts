import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gm-proposal',
  templateUrl: './gm-proposal.component.html',
  styleUrls: ['./gm-proposal.component.css']
})
export class GmProposalComponent implements OnInit {

  @Output() viewType: any = 'gm';
  @Output() showAddBtn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
