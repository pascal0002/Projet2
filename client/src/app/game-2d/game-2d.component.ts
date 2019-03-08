import { AfterViewInit, Component, ElementRef, ViewChild  } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { GameViewService } from "../game-view/game-view.service";
import { ClickPermissionService } from "./click-permission.service";
import { DifferenceValidatorService } from "./difference-validator.service";
import { ErrorDisplayer2dService } from "./error-displayer-2d.service";
import { ImageDisplayerService } from "./image-displayer.service";

@Component({
  selector: "app-game-2d",
  templateUrl: "./game-2d.component.html",
  styleUrls: ["./game-2d.component.css"],
})
export class Game2DComponent implements AfterViewInit {
  public differenceImgPixels: number[];
  public imagesHaveBeenLoaded: boolean;

  @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_TEXT_2D) public modifTextCanvas: ElementRef;
  @ViewChild(Constants.ORIGINAL_CANVAS_TEXT_2D) public ogTextCanvas: ElementRef;

  public constructor(public gameViewService: GameViewService,
                     private differenceValidatorService: DifferenceValidatorService,
                     private imageDisplayerService: ImageDisplayerService,
                     private errorDisplayerService: ErrorDisplayer2dService,
                     private clickPermissionService: ClickPermissionService) {

    this.imagesHaveBeenLoaded = false;
    this.differenceValidatorService.game2d = gameViewService.model.gamecard;
    this.clickPermissionService = new ClickPermissionService(errorDisplayerService);
    this.setDifferenceImgPixels();
  }

  public ngAfterViewInit(): void {
    const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
    const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

    this.drawTheTwoImages(ogCtx, modifCtx);
  }

  private setDifferenceImgPixels(): void {
    this.differenceValidatorService.getDifferenceImgPixels()
    .then((differenceImgPixels: number[]) => {
      this.differenceImgPixels = differenceImgPixels;
    })
    .catch((err) => { console.error(err); });
  }

  private drawTheTwoImages(ogCtx: CanvasRenderingContext2D, modifCtx: CanvasRenderingContext2D): void {
    this.drawImageInCanvas(ogCtx, this.gameViewService.model.gamecard.image, true);
    this.drawImageInCanvas(modifCtx, this.gameViewService.model.gamecard.imageModified, false)
    .then(() => {
      this.gameViewService.startChrono();
      this.imagesHaveBeenLoaded = true;
      this.clickPermissionService.canSendInfoToServer = true;
    });
  }

  private drawImageInCanvas(ctx: CanvasRenderingContext2D, imageLocation: string, isOriginalImg: boolean): Promise<void> {
    return new Promise((resolve) => {
      resolve(
            this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(imageLocation, isOriginalImg))
            .then((imgPixels) => {
              (isOriginalImg) ?
                this.imageDisplayerService.originalImagePixels = imgPixels
                : this.imageDisplayerService.modifiedImagePixels = imgPixels;
              this.imageDisplayerService.drawPixelsInCanvas(ctx, imgPixels);
            })
            .catch((err: Error) => { console.error(err); }));
    });
  }

  public sendClickInfo(mouseEvent: MouseEvent, ogCanvasIsClicked: boolean): void {
    if (this.clickPermissionService.canClickAgain()) {
      this.clickPermissionService.blockClicksToServer();
      this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY),
                                                    this.differenceImgPixels)
        .then(
          (differenceToErase) => {
            if (differenceToErase) {
              this.onDifferenceFound(differenceToErase.posOfPixelsToErase);
              this.differenceImgPixels = differenceToErase.updatedDifferenceImage;
            } else {
              this.onClickFail(mouseEvent.offsetX, mouseEvent.offsetY, ogCanvasIsClicked);
            }
          },
        )
        .catch((err) => { console.error("erreur :", err); });
      this.clickPermissionService.unblockClicksToServerAfterDelay();
    }
  }

  private onDifferenceFound(differencePixelsToErase: number[]): void {
    const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);
    this.imageDisplayerService.eraseDifference(modifCtx, differencePixelsToErase);
    this.differenceValidatorService.playSuccessSound();
    this.gameViewService.onDiffFound();
  }

  private onClickFail(xPos: number, yPos: number, ogCanvasIsClicked: boolean): void {
    this.differenceValidatorService.playFailSound();
    const ogTextCtx: CanvasRenderingContext2D = this.ogTextCanvas.nativeElement.getContext(Constants.CTX_2D);
    const modifTextCtx: CanvasRenderingContext2D = this.modifTextCanvas.nativeElement.getContext(Constants.CTX_2D);

    (ogCanvasIsClicked) ?
      this.errorDisplayerService.drawError(xPos, yPos, ogTextCtx)
    : this.errorDisplayerService.drawError(xPos, yPos, modifTextCtx);
  }
}
