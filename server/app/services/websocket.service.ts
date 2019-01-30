import * as http from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import * as socketIo from "socket.io";
import { MessageType } from "../../../common/communication/messageType";
import Types from "../types";
import { LoginService } from "./login.service";
@injectable()
export class WebsocketService {

    private _io: socketIo.Server;

    public constructor(@inject(Types.LoginService) private loginService: LoginService) { }

    public init(server: http.Server): void {
        this._io = socketIo(server);
        this.listen();
    }

    public listen(): void {
        this._io.on("connection", (socket: socketIo.Server) => {
            let usernameSocket: string;

            socket.on(MessageType.VALIDATE_USERNAME, (username: string) => {
                socket.emit(MessageType.VALIDATE_USERNAME, this.loginService.validateUsername(username));
            });

            socket.on(MessageType.CONNECT, (username: string) => {
                usernameSocket = username;
                this.loginService.connectUser(username);
            });

            socket.on("disconnect", () => {
                this.loginService.disconnect(usernameSocket);
            });

            socket.on(MessageType.DECODE_BITMAP_FILE, (file: File) => {
                // tslint:disable-next-line:no-console
                console.log(file.name);
                // this.bitmapDecoderService.decodeBitmapFile(file);
              //  console.log(this.bitmapDecoderService.decodeBitmapFile(file).fileName);
                // tslint:disable-next-line:no-console
                console.log("Trying to decode file");
            });

        });
    }

    public get socket(): socketIo.Server {
        return this._io;
    }
}
