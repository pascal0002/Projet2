import * as http from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import * as socketIo from "socket.io";
import { Constants } from "../../../common/communication/Constants";
// import { IDiffInfoToHandle } from "../../../common/communication/DiffInfoToHandle";
import { IDifferenceErased } from "../../../common/communication/DifferenceErased";
import { IMessage } from "../../../common/communication/Message";
import { MessageMultiplayer2D } from "../../../common/communication/MessageMultiplayer2D";
import { MessageType } from "../../../common/communication/messageType";
import { DifferenceIdentificator2DService } from "../services/difference-identificator-2d.service";
import Types from "../types";
import { LoginService } from "./login.service";

@injectable()
export class WebsocketService {

    private socket: socketIo.Server;

    public constructor(@inject(Types.LoginService) private loginService: LoginService,
                       @inject(Types.DifferenceIdentificator2DService) private diffIdentifService: DifferenceIdentificator2DService) { }

    public init(server: http.Server): void {
        this.socket = socketIo(server);
        this.listen();
        this.listenMultiplayer2D();
    }

    public listen(): void {
        this.socket.on("connection", (socket: socketIo.Server) => {
            let usernameSocket: string;

            socket.on(MessageType.VALIDATE_USERNAME, (username: string) => {
                socket.emit(MessageType.VALIDATE_USERNAME, this.loginService.validateUsername(username));
            });

            socket.on(MessageType.CONNECT, (username: string) => {
                usernameSocket = username;
                this.loginService.countUsernameOccurence(username)
                .then((occurence: number) => {
                    if (occurence === 0) {
                        this.loginService.connectUser(username);
                        socket.emit(MessageType.CONNECT, true);
                    } else {
                        socket.emit(MessageType.CONNECT, false);
                    }
                })
                .catch((err: Error) => {console.error(err); });
            });

            socket.on("disconnect", () => {
                this.loginService.disconnect(usernameSocket);
            });
        });
    }

    public listenMultiplayer2D(): void {
        this.socket.on("connection", (socket: socketIo.Server) => {
            socket.on(MessageMultiplayer2D.ERASE_DIFFERENCE_REQUEST, (diffMsgRequest: IMessage) => {
                const positionInPixelsArray: number = this.diffIdentifService.getPositionInArray(diffMsgRequest.data.clickInfo);
                let erasePixelMsg: IMessage = { data: null};
                if (this.diffIdentifService.confirmDifference(diffMsgRequest.data.clickInfo,
                                                              diffMsgRequest.data.differenceImage.pixels)) {
                    const updatedDiffPixels: number[] = this.diffIdentifService.eraseDifference(positionInPixelsArray,
                                                                                                diffMsgRequest.data.differenceImage.pixels,
                                                                                                Constants.VALID_BMP_WIDTH);
                    const differenceErased: IDifferenceErased = {
                        posOfPixelsToErase: this.diffIdentifService.posOfDifferencePixels,
                        updatedDifferenceImage: updatedDiffPixels,
                    };
                    erasePixelMsg = { data: differenceErased };
                    this.socket.emit(MessageMultiplayer2D.DIFFERENCE_FOUND, erasePixelMsg);
                } else {
                    this.socket.emit(MessageMultiplayer2D.DIFFERENCE_NOT_FOUND, erasePixelMsg);
                }
            });
        });

    }
}

/*const diffInfoToHandle: IDiffInfoToHandle = req.body;
            const positionInPixelsArray: number = this.differenceIdentificator2DService.getPositionInArray(diffInfoToHandle.clickInfo);
            if (this.differenceIdentificator2DService.confirmDifference(diffInfoToHandle.clickInfo,
                                                                        diffInfoToHandle.differenceImage.pixels)) {
                    const updatedDiffImg: number[] = this.differenceIdentificator2DService.eraseDifference(
                                                                                                    positionInPixelsArray,
                                                                                                    diffInfoToHandle.differenceImage.pixels,
                                                                                                    Constants.VALID_BMP_WIDTH);

                    const differenceErased: IDifferenceErased = {
                        posOfPixelsToErase: this.differenceIdentificator2DService.posOfDifferencePixels,
                        updatedDifferenceImage: updatedDiffImg,
                    };
                    res.json(differenceErased);
                } else {
                    res.send(null);
                } */
