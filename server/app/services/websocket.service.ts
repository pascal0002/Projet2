import * as http from "http";
import { injectable } from "inversify";
import "reflect-metadata";
import * as socketIo from "socket.io";

@injectable()
export class WebsocketService {

    private io: socketIo.Server;

    public init(server: http.Server): void {
        this.io = socketIo(server);
        this.listen();
    }

    public listen(): void {
        this.io.on("connection", (socket: socketIo.Server) => {
            console.log("Client connected");
            /*socket.on("message", (m: Message) => {
                console.log("[server](message): %s", JSON.stringify(m));
                this.io.emit("message", m);
            });*/

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }
}
