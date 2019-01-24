import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { WebsocketService } from "./websocket.service";
@Injectable()
export class UserLoginService {

  public constructor(private websocketService: WebsocketService) { }

  public validateUsername(username: string): Observable<boolean> {
    this.websocketService.testUsername(username);

    return this.websocketService.onTestUsername();
  }

  public connect(username: string): void {
    this.websocketService.connectUsername(username);
  }
}
