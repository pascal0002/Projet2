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
            console.log("Client connected");

            socket.on("testUsername", (username: string) => {
                console.log("testUsername ", username);
                socket.emit("testUsername", this.loginService.isUsernameUnique(username));
            });

            socket.on("connectUsername", (username: string) => {
                console.log("connectUsername", username);
                usernameSocket = username;
                this.loginService.connectUser(username);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected ", usernameSocket);
                this.loginService.disconnect(usernameSocket);
            });
        });
    }
}
