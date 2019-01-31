import { MessageType } from "../../../common/communication/messageType";
import { WebsocketService } from "./websocket.service";

import * as socketIo from "socket.io-client";

let service: WebsocketService;
const fakeUrl: string = "http://0.0.0.0:9876/";
let fakeSocket: SocketIOClient.Socket;

describe("WebsocketService", () => {

  beforeEach(() => {
    service = new WebsocketService();
    service.initSocket();
  });

  it("should init correctly", () => {
    expect(service["socket"]).not.toBeNull();
  });

  it("should send the message correctly", () => {

    fakeSocket = socketIo(fakeUrl);
    service["socket"] = fakeSocket;

    const spy: jasmine.Spy = jasmine.createSpy();

    service["socket"].io.on(MessageType.VALIDATE_USERNAME, spy);

    service.sendMessage(MessageType.VALIDATE_USERNAME, "Jean");

    expect(spy).toHaveBeenCalled();
  });

});
