import { MessageType } from "../../../common/communication/messageType";
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

  it("should listen correctly", () => {
    service.listenForUsernameValidation().subscribe();
    expect(service["socket"].listeners(MessageType.VALIDATE_USERNAME).length).toBeGreaterThan(0);
  });
});
