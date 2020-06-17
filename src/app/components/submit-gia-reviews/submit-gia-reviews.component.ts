import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submit-gia-reviews',
  templateUrl: './submit-gia-reviews.component.html',
  styleUrls: ['./submit-gia-reviews.component.css']
})
export class SubmitGiaReviewsComponent implements OnInit {

  @Output() viewType: string = 'view-gia';

  constructor() { }

  ngOnInit(): void {
  }

}
