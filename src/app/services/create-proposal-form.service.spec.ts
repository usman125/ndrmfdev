import { TestBed } from '@angular/core/testing';

import { CreateProposalFormService } from './create-proposal-form.service';

describe('CreateProposalFormService', () => {
  let service: CreateProposalFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateProposalFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
