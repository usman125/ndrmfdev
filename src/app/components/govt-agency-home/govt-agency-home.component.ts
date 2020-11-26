import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-govt-agency-home',
  templateUrl: './govt-agency-home.component.html',
  styleUrls: ['./govt-agency-home.component.css']
})
export class GovtAgencyHomeComponent implements OnInit {

  @Output() viewType: any = 'govt';
  @Output() showAddBtn: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
