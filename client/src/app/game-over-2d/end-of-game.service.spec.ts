import { TestBed } from "@angular/core/testing";

import { EndOfGameService } from "./end-of-game.service";

describe("EndOfGameService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: EndOfGameService = TestBed.get(EndOfGameService);
    expect(service).toBeTruthy();
  });
});
