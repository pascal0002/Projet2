import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild  } from "@angular/core";
import { Subscription } from "rxjs";
import { Constants } from "../../../../common/communication/Constants";
import { GameViewService } from "../game-view/game-view.service";
import { DifferenceValidatorService } from "./difference-validator.service";
import { ErrorDisplayer2dService } from "./error-displayer-2d.service";
import { ImageDisplayerService } from "./image-displayer.service";

@Component({
  selector: "app-game-2d",
  templateUrl: "./game-2d.component.html",
  styleUrls: ["./game-2d.component.css"],
})
export class Game2DComponent implements AfterViewInit, OnDestroy {
  public differenceImgPixels: number[];
  public clickPermission: Subscription;
  public clickIsEnabled: boolean;
  public canSendInfoToServer: boolean;
  public imagesHaveBeenLoaded: boolean;
  // public modifCtx: CanvasRenderingContext2D;

  @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;
  @ViewChild("modifTextCanvas") public modifTextCanvas: ElementRef;
  @ViewChild("ogTextCanvas") public ogTextCanvas: ElementRef;

  public constructor(public gameViewService: GameViewService,
                     private differenceValidatorService: DifferenceValidatorService,
                     private imageDisplayerService: ImageDisplayerService,
                     private errorDisplayerService: ErrorDisplayer2dService) {

    this.clickIsEnabled = true;
    this.imagesHaveBeenLoaded = false;
    this.canSendInfoToServer = true;
    this.differenceValidatorService.game2d = gameViewService.model.gamecard;
    this.setDifferenceImgPixels();
    this.clickPermission = this.errorDisplayerService.clickingPermission.subscribe((permission) => this.clickIsEnabled = permission);
  }

  public ngAfterViewInit(): void {
    const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
    const modifCtx: CanvasRenderingContext2D = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

    this.drawTheTwoImages(ogCtx, modifCtx);
  }

  public ngOnDestroy(): void {
    this.clickPermission.unsubscribe();
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
    if (this.canSendInfoToServer && this.clickIsEnabled) {
      this.canSendInfoToServer = false;
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
      this.waitQuarterASecond();
    }
  }

  private waitQuarterASecond(): void {
    setTimeout(() => {
      this.canSendInfoToServer = true;
    },         (Constants.QUARTER_A_SECOND));
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
