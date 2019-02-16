import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MessageType } from "../../../../common/communication/messageType";
import { WebsocketService } from "../websocket.service";

@Injectable()
export class UserLoginService {

  public constructor(private websocketService: WebsocketService) { }

  public validateUsername(username: string): Observable<boolean> {
    this.websocketService.sendMessage(MessageType.VALIDATE_USERNAME, username);

    return this.websocketService.listenForUsernameValidation();
  }

  public connect(username: string): Observable<boolean> {
    this.websocketService.sendMessage(MessageType.CONNECT, username);

    return this.websocketService.listenForConnectionValidation();
  }
}
