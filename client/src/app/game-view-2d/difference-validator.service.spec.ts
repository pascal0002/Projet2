import { TestBed } from '@angular/core/testing';

import { DifferenceValidatorService } from './difference-validator.service';

describe('DifferenceValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);
    expect(service).toBeTruthy();
  });
});
