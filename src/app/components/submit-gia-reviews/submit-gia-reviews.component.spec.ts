import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitGiaReviewsComponent } from './submit-gia-reviews.component';

describe('SubmitGiaReviewsComponent', () => {
  let component: SubmitGiaReviewsComponent;
  let fixture: ComponentFixture<SubmitGiaReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitGiaReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitGiaReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
