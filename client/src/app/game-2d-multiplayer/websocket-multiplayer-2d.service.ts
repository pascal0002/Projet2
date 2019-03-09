import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as socketIo from "socket.io-client";
import { Constants } from "../../../../common/communication/Constants";
import { IMessage } from "../../../../common/communication/Message";
import { MessageMultiplayer2D } from "../../../../common/communication/MessageMultiplayer2D";

@Injectable({
  providedIn: "root",
})
export class WebsocketMultiplayer2dService {

  private socket: SocketIOClient.Socket;

  public initSocket(): void {
    this.socket = socketIo(Constants.SERVER_BASE_URL);
  }


  public sendMessage(messageMultiplayer2D: MessageMultiplayer2D, message: IMessage): void {
    this.socket.emit(messageMultiplayer2D, message);
  }

  public listenForDifferenceToErase(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
      this.socket.on(MessageMultiplayer2D.DIFFERENCE_FOUND, (data: IMessage) => {
        observer.next(data);
        console.log("fuck my life");
      });
    });
  }
}
