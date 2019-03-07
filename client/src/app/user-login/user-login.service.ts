import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MessageType } from "../../../../common/communication/messageType";
import { WebsocketService } from "../websocket.service";

@Injectable()
export class UserLoginService {
  public username: string;

  public constructor(private websocketService: WebsocketService) {
    this.username = "";
  }

  public validateUsername(username: string): Observable<boolean> {
    this.username = username;
    this.websocketService.sendMessage(MessageType.VALIDATE_USERNAME, username);

    return this.websocketService.listenForUsernameValidation();
  }

  public connect(): Observable<boolean> {
    this.websocketService.sendMessage(MessageType.CONNECT, this.username);

    return this.websocketService.listenForConnectionValidation();
  }
}
