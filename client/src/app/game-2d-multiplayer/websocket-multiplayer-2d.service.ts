import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as socketIo from "socket.io-client";
import { Constants } from "../../../../common/communication/Constants";
// import { IDifferenceErased } from "../../../../common/communication/DifferenceErased";
import { IMessage } from "../../../../common/communication/Message";
import { MessageMultiplayer2D } from "../../../../common/communication/MessageMultiplayer2D";

@Injectable({
  providedIn: "root",
})
export class WebsocketMultiplayer2dService {

  private socket: SocketIOClient.Socket;

  public initSocket(): void {
    this.socket = socketIo(Constants.SERVER_BASE_URL);
  }

  public sendMessage(messageMultiplayer2D: MessageMultiplayer2D, message: IMessage): void {
    this.socket.emit(messageMultiplayer2D, message);
  }

  public listenForDifferenceToErase(): Observable<IMessage> {
    return new Observable<IMessage>((observer) => {
      this.socket.on(MessageMultiplayer2D.DIFFERENCE_FOUND, (data: IMessage) => {
        observer.next(data);
      });
    });
  }

  // public listenForIdentificationError(): Observable<IDifferenceErased> {
  //   return new Observable<IDifferenceErased>((observer) => {
  //     this.socket.on(MessageMultiplayer2D.DIFFERENCE_FOUND, (data: IDifferenceErased) => observer.next(data));
  //   });
  // }
}

/*public listenMultiplayer2D(): void {
        this.socket.on("connection", (socket: socketIo.Server) => {
            socket.on(MessageMultiplayer2D.ERASE_DIFFERENCE_REQUEST, (diffInfoToHandle: IDiffInfoToHandle) => {
                const positionInPixelsArray: number = this.diffIdentifService.getPositionInArray(diffInfoToHandle.clickInfo);
                let erasePixelMsg: IMessage = { data: null};

                if (this.diffIdentifService.confirmDifference(diffInfoToHandle.clickInfo, diffInfoToHandle.differenceImage.pixels)) {
                    const updatedDiffPixels: number[] = this.diffIdentifService.eraseDifference(positionInPixelsArray,
                                                                                                diffInfoToHandle.differenceImage.pixels,
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
        }); */
