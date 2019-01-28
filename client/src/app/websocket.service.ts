import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MessageType } from "../../../common/communication/messageType";
import {SocketMessage} from "../../../common/communication/SocketMessage";

import * as socketIo from "socket.io-client";

@Injectable()
export class WebsocketService {
    private readonly BASE_URL: string = "http://localhost:3000/";
    private socket: SocketIOClient.Socket;

    public initSocket(): void {
        this.socket = socketIo(this.BASE_URL);
    }

    public sendMessage(messageType: MessageType, message: string): void {
        this.socket.emit(messageType, message);
    }

    public sendMessagePAM(messageType: MessageType, message: SocketMessage ): void {
        this.socket.emit(messageType, message.content);
    }

    public listenForUsernameValidation(): Observable<boolean> {
        return new Observable<boolean>((observer) => {
            this.socket.on(MessageType.VALIDATE_USERNAME, (data: boolean) => observer.next(data));
        });
    }
}
