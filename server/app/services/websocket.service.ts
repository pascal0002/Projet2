import * as http from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import * as socketIo from "socket.io";
import Types from "../types";
import { LoginService } from "./login.service";
@injectable()
export class WebsocketService {

    private io: socketIo.Server;

    public constructor(@inject(Types.LoginService) private loginService: LoginService) {}

    public init(server: http.Server): void {
        this.io = socketIo(server);
        this.listen();
    }

    public listen(): void {
        this.io.on("connection", (socket: socketIo.Server) => {
            let usernameSocket: string;

            socket.on("testUsername", (username: string) => {
                socket.emit("testUsername", this.loginService.validateUsername(username));
            });

            socket.on("connectUsername", (username: string) => {
                usernameSocket = username;
                this.loginService.connectUser(username);
            });

            socket.on("disconnect", () => {
                this.loginService.disconnect(usernameSocket);
            });
        });
    }
}
