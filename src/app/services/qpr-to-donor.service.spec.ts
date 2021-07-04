import { TestBed } from '@angular/core/testing';

import { QprToDonorService } from './qpr-to-donor.service';

describe('QprToDonorService', () => {
  let service: QprToDonorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QprToDonorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
