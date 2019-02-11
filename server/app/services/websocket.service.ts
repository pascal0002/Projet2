import * as http from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import * as socketIo from "socket.io";
import { MessageType } from "../../../common/communication/messageType";
import Types from "../types";
import { LoginService } from "./login.service";

@injectable()
export class WebsocketService {

    private socket: socketIo.Server;

    public constructor(@inject(Types.LoginService) private loginService: LoginService) { }

    public init(server: http.Server): void {
        this.socket = socketIo(server);
        this.listen();
    }

    public listen(): void {
        this.socket.on("connection", (socket: socketIo.Server) => {
            let usernameSocket: string;

            socket.on(MessageType.VALIDATE_USERNAME, (username: string) => {
                socket.emit(MessageType.VALIDATE_USERNAME, this.loginService.validateUsername(username));
            });

            socket.on(MessageType.CONNECT, (username: string) => {
                usernameSocket = username;
                this.loginService.isUsernameUnique(username)
                .then((isUnique: boolean) => {
                    if (isUnique) {
                        this.loginService.connectUser(username);
                        socket.emit(MessageType.CONNECT, true);
                    } else {
                        socket.emit(MessageType.CONNECT, false);
                    }
                });
            });

            socket.on("disconnect", () => {
                this.loginService.disconnect(usernameSocket);
            });
        });
    }
}
