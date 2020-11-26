import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {

  @Output() showAddBtn: boolean = true;
  @Output() viewType: string = 'user';

  constructor() { }

  ngOnInit(): void {
  }

}
