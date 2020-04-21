import { TestBed } from '@angular/core/testing';

import { AccreditationReviewsService } from './accreditation-reviews.service';

describe('AccreditationReviewsService', () => {
  let service: AccreditationReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccreditationReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
