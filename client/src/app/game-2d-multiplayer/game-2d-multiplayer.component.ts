import { /*AfterViewInit,*/ Component, ElementRef, ViewChild  } from "@angular/core";
import { Subscription } from "rxjs";
// import { IClickInfo } from "../../../../common/communication/ClickInfo";
import { Constants } from "../../../../common/communication/Constants";
// import { IDiffInfoToHandle } from "../../../../common/communication/DiffInfoToHandle";
// import { IDifferenceImage } from "../../../../common/communication/DifferenceImage";
// import { IMessage } from "../../../../common/communication/Message";
// import { MessageMultiplayer2D } from "../../../../common/communication/MessageMultiplayer2D";
// import { ClickPermissionService } from "../game-2d/click-permission.service";
// import { DifferenceValidatorService } from "../game-2d/difference-validator.service";
// import { ErrorDisplayer2dService } from "../game-2d/error-displayer-2d.service";
// import { ImageDisplayerService } from "../game-2d/image-displayer.service";
// import { GameViewService } from "../game-view/game-view.service";
// import { WebsocketMultiplayer2dService } from "./websocket-multiplayer-2d.service";

@Component({
  selector: "app-game-2d-multiplayer",
  templateUrl: "./game-2d-multiplayer.component.html",
  styleUrls: ["../game-2d/game-2d.component.css", "./game-2d-multiplayer.component.css"],
})
export class Game2DMultiplayerComponent /*implements AfterViewInit*/ {

  public isInWaitingRoom: boolean;
  public imagesHaveBeenLoaded: boolean;
  public differenceImgPixels: number[];
  public modifiedImgSubscription: Subscription;

  @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_TEXT_2D) public modifTextCanvas: ElementRef;
  @ViewChild(Constants.ORIGINAL_CANVAS_TEXT_2D) public ogTextCanvas: ElementRef;

  // public constructor(public gameViewService: GameViewService,
  //                    private differenceValidatorService: DifferenceValidatorService,
  //                    private imageDisplayerService: ImageDisplayerService,
  //                    private errorDisplayerService: ErrorDisplayer2dService,
  //                    private clickPermissionService: ClickPermissionService,
  //                    private websocketMultiplayer2DService: WebsocketMultiplayer2dService) {
  //   // this.modifiedImgSubscription = this.imageDisplayerService.modifiedPixelsObserver.subscribe((modifiedImgPixels) => {
  //   //   const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);
  //   //   this.imageDisplayerService.drawPixelsInCanvas(modifCtx, modifiedImgPixels);
  //   // });
  //   this.imagesHaveBeenLoaded = false;
  //   this.isInWaitingRoom = true;
  //   this.differenceValidatorService.game2d = gameViewService.model.gamecard;
  //   this.clickPermissionService = new ClickPermissionService(this.errorDisplayerService);
  //   this.setDifferenceImgPixels();
  //   this.clickPermissionService.canSendInfoToServer = true;
  //   this.clickPermissionService.clickIsEnabled = true;
  //   this.websocketMultiplayer2DService.initSocket();

  //   this.websocketMultiplayer2DService.listenForDifferenceToErase().subscribe((differenceToErase: IMessage) => {
  //     const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);
  //     this.imageDisplayerService.eraseDifference(modifCtx, differenceToErase.data.posOfPixelsToErase);
  //     this.differenceImgPixels = differenceToErase.data.updatedDifferenceImage;
  //   });
  // }

  // private setDifferenceImgPixels(): void {
  //   this.differenceValidatorService.getDifferenceImgPixels()
  //   .then((differenceImgPixels: number[]) => {
  //     this.differenceImgPixels = differenceImgPixels;
  //   })
  //   .catch((err) => { console.error(err); });
  // }


  // public ngAfterViewInit(): void {
  //   const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
  //   const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);
  //   this.drawTheTwoImages(ogCtx, modifCtx);
  // }

  // private drawTheTwoImages(ogCtx: CanvasRenderingContext2D, modifCtx: CanvasRenderingContext2D): void {
  //   this.drawImageInCanvas(ogCtx, this.gameViewService.model.gamecard.image, true);
  //   this.drawImageInCanvas(modifCtx, this.gameViewService.model.gamecard.imageModified, false)
  //   .then(() => {
  //     this.isInWaitingRoom = false;
  //   });
  // }

  // private drawImageInCanvas(ctx: CanvasRenderingContext2D, imageLocation: string, isOriginalImg: boolean): Promise<void> {
  //   return new Promise((resolve) => {
  //     resolve(
  //           this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(imageLocation, isOriginalImg))
  //           .then((imgPixels) => {
  //             (isOriginalImg) ?
  //               this.imageDisplayerService.originalImagePixels = imgPixels
  //               : this.imageDisplayerService.modifiedImagePixels = imgPixels;
  //             this.imageDisplayerService.drawPixelsInCanvas(ctx, imgPixels);
  //           })
  //           .catch((err: Error) => { console.error(err); }));
  //   });
  // }

  // public sendClickInfo(mouseEvent: MouseEvent, ogCanvasIsClicked: boolean): void {
  //   const mousePos: IClickInfo = this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY);
  //   console.log("cote client");
  //   if (this.clickPermissionService.canClickAgain()) {
  //     this.clickPermissionService.blockClicksToServer();
  //     const differenceImage: IDifferenceImage = {name: "", pixels: this.differenceImgPixels };
  //     const diffInfo: IDiffInfoToHandle = {clickInfo: mousePos, differenceImage: differenceImage };
  //     const diffRequestMsg: IMessage = { data: diffInfo };
  //     this.websocketMultiplayer2DService.sendMessage(MessageMultiplayer2D.ERASE_DIFFERENCE_REQUEST, diffRequestMsg);
  //     // this.websocketMultiplayer2DService.listenForDifferenceToErase().subscribe((differenceToErase: IMessage) => {
  //     //   this.onDifferenceFound(differenceToErase.data.posOfPixelsToErase);
  //     //   this.differenceImgPixels = differenceToErase.data.updatedDifferenceImage;
  //     // });
  //     // this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY),
  //     //                                               this.differenceImgPixels)
  //     //   .then(
  //     //     (differenceToErase) => {
  //     //       if (differenceToErase) {
  //     //         this.onDifferenceFound(differenceToErase.posOfPixelsToErase);
  //     //         this.differenceImgPixels = differenceToErase.updatedDifferenceImage;
  //     //       } else {
  //     //         this.onClickFail(mouseEvent.offsetX, mouseEvent.offsetY, ogCanvasIsClicked);
  //     //       }
  //     //     },
  //     //   )
  //     //   .catch((err) => { console.error("erreur :", err); });
  //     this.clickPermissionService.unblockClicksToServerAfterDelay();
  //   }
  // }

  // public onDifferenceFound(differencePixelsToErase: number[]): void {
  //   const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);
  //   this.imageDisplayerService.eraseDifference(modifCtx, differencePixelsToErase);
  //   this.differenceValidatorService.playSuccessSound();
  //   this.gameViewService.onDiffFound();
  // }
}

// public async sendClickInfo(mousePos: IClickInfo, differencePixels: number[]): Promise<IDifferenceErased> {
//   const differenceImage: IDifferenceImage = {name: "", pixels: differencePixels};
//   const diffInfo: IDiffInfoToHandle = {clickInfo: mousePos, differenceImage: differenceImage };

//   return new Promise<IDifferenceErased>((resolve: Function) => {
//     resolve(this.http.post<IDifferenceErased>(Constants.SERVER_BASE_URL + Constants.API + Constants.DIFFVALIDATOR_URL, diffInfo)
//       .toPromise());
//   });
// }

// ----------------------------------------------------------------------------------------------

// import { AfterViewInit, Component, ElementRef, ViewChild  } from "@angular/core";
// import { Constants } from "../../../../common/communication/Constants";
// import { ClickPermissionService } from "../game-2d/click-permission.service";
// import { DifferenceValidatorService } from "../game-2d/difference-validator.service";
// import { ErrorDisplayer2dService } from "../game-2d/error-displayer-2d.service";
// import { ImageDisplayerService } from "../game-2d/image-displayer.service";
// import { GameViewService } from "../game-view/game-view.service";

// @Component({
//   selector: "app-game-2d",
//   templateUrl: "./game-2d.component.html",
//   styleUrls: ["./game-2d.component.css"],
// })
// export class Game2DComponent implements AfterViewInit {
//   public differenceImgPixels: number[];
//   public imagesHaveBeenLoaded: boolean;

//   @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
//   @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;
//   @ViewChild(Constants.MODIFIED_CANVAS_TEXT_2D) public modifTextCanvas: ElementRef;
//   @ViewChild(Constants.ORIGINAL_CANVAS_TEXT_2D) public ogTextCanvas: ElementRef;

//   public constructor(public gameViewService: GameViewService,
//                      private differenceValidatorService: DifferenceValidatorService,
//                      private imageDisplayerService: ImageDisplayerService,
//                      private errorDisplayerService: ErrorDisplayer2dService,
//                      private clickPermissionService: ClickPermissionService) {

//     this.imagesHaveBeenLoaded = false;
//     this.differenceValidatorService.game2d = gameViewService.model.gamecard;
//     this.clickPermissionService = new ClickPermissionService(this.errorDisplayerService);
//     this.setDifferenceImgPixels();
//   }

//   public ngAfterViewInit(): void {
//     const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
//     const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

//     this.drawTheTwoImages(ogCtx, modifCtx);
//   }

//   private setDifferenceImgPixels(): void {
//     this.differenceValidatorService.getDifferenceImgPixels()
//     .then((differenceImgPixels: number[]) => {
//       this.differenceImgPixels = differenceImgPixels;
//     })
//     .catch((err) => { console.error(err); });
//   }

//   private drawTheTwoImages(ogCtx: CanvasRenderingContext2D, modifCtx: CanvasRenderingContext2D): void {
//     this.drawImageInCanvas(ogCtx, this.gameViewService.model.gamecard.image, true);
//     this.drawImageInCanvas(modifCtx, this.gameViewService.model.gamecard.imageModified, false)
//     .then(() => {
//       this.gameViewService.startChrono();
//       this.imagesHaveBeenLoaded = true;
//       this.clickPermissionService.canSendInfoToServer = true;
//     });
//   }

//   private drawImageInCanvas(ctx: CanvasRenderingContext2D, imageLocation: string, isOriginalImg: boolean): Promise<void> {
//     return new Promise((resolve) => {
//       resolve(
//             this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(imageLocation, isOriginalImg))
//             .then((imgPixels) => {
//               (isOriginalImg) ?
//                 this.imageDisplayerService.originalImagePixels = imgPixels
//                 : this.imageDisplayerService.modifiedImagePixels = imgPixels;
//               this.imageDisplayerService.drawPixelsInCanvas(ctx, imgPixels);
//             })
//             .catch((err: Error) => { console.error(err); }));
//     });
//   }

//   public sendClickInfo(mouseEvent: MouseEvent, ogCanvasIsClicked: boolean): void {
//     if (this.clickPermissionService.canClickAgain()) {
//       this.clickPermissionService.blockClicksToServer();
//       this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY),
//                                                     this.differenceImgPixels)
//         .then(
//           (differenceToErase) => {
//             if (differenceToErase) {
//               this.onDifferenceFound(differenceToErase.posOfPixelsToErase);
//               this.differenceImgPixels = differenceToErase.updatedDifferenceImage;
//             } else {
//               this.onClickFail(mouseEvent.offsetX, mouseEvent.offsetY, ogCanvasIsClicked);
//             }
//           },
//         )
//         .catch((err) => { console.error("erreur :", err); });
//       this.clickPermissionService.unblockClicksToServerAfterDelay();
//     }
//   }

//   public sendClickInfoMultiplayer(mouseEvent: MouseEvent, ogCanvasIsClicked: boolean): void {

//   }

//   private onDifferenceFound(differencePixelsToErase: number[]): void {
//     const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);
//     this.imageDisplayerService.eraseDifference(modifCtx, differencePixelsToErase);
//     this.differenceValidatorService.playSuccessSound();
//     this.gameViewService.onDiffFound();
//   }

//   private onClickFail(xPos: number, yPos: number, ogCanvasIsClicked: boolean): void {
//     this.differenceValidatorService.playFailSound();
//     const ogTextCtx: CanvasRenderingContext2D = this.ogTextCanvas.nativeElement.getContext(Constants.CTX_2D);
//     const modifTextCtx: CanvasRenderingContext2D = this.modifTextCanvas.nativeElement.getContext(Constants.CTX_2D);

//     (ogCanvasIsClicked) ?
//       this.errorDisplayerService.drawError(xPos, yPos, ogTextCtx)
//     : this.errorDisplayerService.drawError(xPos, yPos, modifTextCtx);
//   }
// }
