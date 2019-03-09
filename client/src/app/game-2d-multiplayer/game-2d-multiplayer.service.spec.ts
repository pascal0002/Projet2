import { TestBed } from "@angular/core/testing";

import { Game2dMultiplayerService } from "./game-2d-multiplayer.service";

describe("Game2dMultiplayerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: Game2dMultiplayerService = TestBed.get(Game2dMultiplayerService);
    expect(service).toBeTruthy();
  });
});
