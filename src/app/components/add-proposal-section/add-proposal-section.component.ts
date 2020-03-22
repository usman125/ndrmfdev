import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-proposal-section',
  templateUrl: './add-proposal-section.component.html',
  styleUrls: ['./add-proposal-section.component.css']
})

export class AddProposalSectionComponent implements OnInit {

  constructor(
    private _router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  goBack() {
    this._router.navigate(['proposal-sections']);
  }

}
