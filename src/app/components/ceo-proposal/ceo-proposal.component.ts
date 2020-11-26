import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ceo-proposal',
  templateUrl: './ceo-proposal.component.html',
  styleUrls: ['./ceo-proposal.component.css']
})
export class CeoProposalComponent implements OnInit {

  @Output() viewType: any = 'ceo';
  @Output() showAddBtn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
