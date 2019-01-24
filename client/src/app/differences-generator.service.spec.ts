import { TestBed } from '@angular/core/testing';

import { DifferencesGeneratorService } from './differences-generator.service';

describe('DifferencesGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DifferencesGeneratorService = TestBed.get(DifferencesGeneratorService);
    expect(service).toBeTruthy();
  });
});
