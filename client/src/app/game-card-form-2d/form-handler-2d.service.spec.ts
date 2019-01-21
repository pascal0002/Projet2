import { TestBed } from '@angular/core/testing';

import { FormHandler2dService } from './form-handler-2d.service';

describe('FormHandler2dService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormHandler2dService = TestBed.get(FormHandler2dService);
    expect(service).toBeTruthy();
  });
});
