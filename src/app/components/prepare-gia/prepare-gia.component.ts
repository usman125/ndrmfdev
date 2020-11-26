import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-prepare-gia',
  templateUrl: './prepare-gia.component.html',
  styleUrls: ['./prepare-gia.component.css']
})
export class PrepareGiaComponent implements OnInit {

  @Output() showAddBtn: boolean = false;
  @Output() viewType: string = 'gia';

  constructor() { }

  ngOnInit(): void {
  }

}
