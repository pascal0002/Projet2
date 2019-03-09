 // import * as http from "http";
// import { inject, injectable } from "inversify";
// import "reflect-metadata";
// import * as socketIo from "socket.io";
// import { MessageMultiplayer2D } from "../../../common/communication/MessageMultiplayer2D";
// import Types from "../types";
// import { LoginService } from "./login.service";

// @injectable()
// export class WebsocketMultiplayer2DService {

//     private socket: socketIo.Server;

//     public constructor(@inject(Types.LoginService) private loginService: LoginService) { }

//     public init(server: http.Server): void {
//         this.socket = socketIo(server);
//         this.listen();
//     }

//     public listen(): void {
//         this.socket.on("connection", (socket: socketIo.Server) => {
//             let usernameSocket: string;

//             socket.on(MessageType.VALIDATE_USERNAME, (username: string) => {
//                 socket.emit(MessageType.VALIDATE_USERNAME, this.loginService.validateUsername(username));
//             });

//             socket.on(MessageType.CONNECT, (username: string) => {
//                 usernameSocket = username;
//                 this.loginService.countUsernameOccurence(username)
//                 .then((occurence: number) => {
//                     if (occurence === 0) {
//                         this.loginService.connectUser(username);
//                         socket.emit(MessageType.CONNECT, true);
//                     } else {
//                         socket.emit(MessageType.CONNECT, false);
//                     }
//                 })
//                 .catch((err: Error) => {console.error(err); });
//             });

//             socket.on("disconnect", () => {
//                 this.loginService.disconnect(usernameSocket);
//             });
//         });
//     }
// }
