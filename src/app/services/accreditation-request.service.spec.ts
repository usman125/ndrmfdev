import { TestBed } from '@angular/core/testing';

import { AccreditationRequestService } from './accreditation-request.service';

describe('AccreditationRequestService', () => {
  let service: AccreditationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccreditationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
