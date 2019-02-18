import { TestBed } from '@angular/core/testing';

import { Game3dGeneratorService } from './game-3d-generator.service';

describe('Game3dGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Game3dGeneratorService = TestBed.get(Game3dGeneratorService);
    expect(service).toBeTruthy();
  });
});
