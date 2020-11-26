import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-pip',
  templateUrl: './admin-pip.component.html',
  styleUrls: ['./admin-pip.component.css']
})
export class AdminPipComponent implements OnInit {

  @Output() show: any = null;

  constructor() { }

  ngOnInit(): void {
    this.show = 'pip';
  }

}
