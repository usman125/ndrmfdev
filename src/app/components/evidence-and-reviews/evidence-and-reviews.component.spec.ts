import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceAndReviewsComponent } from './evidence-and-reviews.component';

describe('EvidenceAndReviewsComponent', () => {
  let component: EvidenceAndReviewsComponent;
  let fixture: ComponentFixture<EvidenceAndReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceAndReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceAndReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
