import { TestBed } from "@angular/core/testing";

import { WebsocketMultiplayer2dService } from "./websocket-multiplayer-2d.service";

describe("WebsocketMultiplayer2dService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: WebsocketMultiplayer2dService = TestBed.get(WebsocketMultiplayer2dService);
    expect(service).toBeTruthy();
  });
});
