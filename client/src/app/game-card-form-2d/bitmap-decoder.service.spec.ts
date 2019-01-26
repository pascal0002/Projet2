import { TestBed } from '@angular/core/testing';

import { BitmapDecoderService } from './bitmap-decoder.service';

describe('BitmapDecoderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitmapDecoderService = TestBed.get(BitmapDecoderService);
    expect(service).toBeTruthy();
  });
});
