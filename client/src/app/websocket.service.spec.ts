import { WebsocketService } from "./websocket.service";

let service: WebsocketService;

describe("WebsocketService", () => {

  beforeEach(() => {
    service = new WebsocketService();
    service.initSocket();
  });

  it("should init correctly", () => {
    expect(service["socket"]).not.toBeNull();
  });
});
