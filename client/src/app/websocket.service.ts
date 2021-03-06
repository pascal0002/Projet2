import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as socketIo from "socket.io-client";
import { Constants } from "../../../common/communication/Constants";
import { MessageType } from "../../../common/communication/messageType";

@Injectable()
export class WebsocketService {
  private socket: SocketIOClient.Socket;

  public initSocket(): void {
    this.socket = socketIo(Constants.SERVER_BASE_URL);
  }

  public sendMessage(messageType: MessageType, message: string): void {
    this.socket.emit(messageType, message);
  }

  public listenForUsernameValidation(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.socket.on(MessageType.VALIDATE_USERNAME, (data: boolean) => observer.next(data));
    });
  }

  public listenForConnectionValidation(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.socket.on(MessageType.CONNECT, (data: boolean) => observer.next(data));
    });
  }
}
