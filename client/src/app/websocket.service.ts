import { Injectable } from "@angular/core";
/*import { Observable } from "rxjs";*/

import * as socketIo from "socket.io-client";

@Injectable()
export class WebsocketService {
    private readonly BASE_URL: string = "http://localhost:3000/";
    private socket: SocketIOClient.Socket;

    public initSocket(): void {
        this.socket = socketIo(this.BASE_URL);
    }

    public send(message: string): void {
        this.socket.emit("message", message);
    }
/*
    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on("message", (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
*/
}
