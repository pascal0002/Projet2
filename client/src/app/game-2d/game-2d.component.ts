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
  public clickSubscription: Subscription;
  public canClickAgain: boolean = true;
  public imagesHaveBeenLoaded: boolean = false;
  public modifCtx: CanvasRenderingContext2D;

  @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;
  @ViewChild("modifErrorCanvas") public modifTextCanvas: ElementRef;

  public constructor(public gameViewService: GameViewService,
                     private differenceValidatorService: DifferenceValidatorService,
                     private imageDisplayerService: ImageDisplayerService,
                     private errorDisplayerService: ErrorDisplayer2dService) {

    this.canClickAgain = true;
    this.imagesHaveBeenLoaded = false;
    this.differenceValidatorService.game2d = gameViewService.model.gamecard;
    this.setDifferenceImgPixels();
    this.clickSubscription = this.errorDisplayerService.clickingPermission.subscribe((permission) => this.canClickAgain = permission);
  }

  public ngAfterViewInit(): void {
    const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
    this.modifCtx = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

    this.drawTheTwoImages(ogCtx, this.modifCtx);
  }

  public ngOnDestroy(): void {
    this.clickSubscription.unsubscribe();
  }

  private setDifferenceImgPixels(): void {
    this.differenceValidatorService.getDifferenceImgPixels()
    .then((res: number[]) => {
      this.differenceImgPixels = res;
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
            .then((res) => {
              (isOriginalImg) ? this.imageDisplayerService.originalImagePixels = res : this.imageDisplayerService.modifiedImagePixels = res;
              this.imageDisplayerService.drawPixelsInCanvas(ctx, res);
            })
            .catch((err: Error) => { console.error(err); }));
    });
  }

  public sendClickInfo(mouseEvent: MouseEvent): void {
    if (this.canClickAgain) {
      this.canClickAgain = false;
      this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY),
                                                    this.differenceImgPixels)
        .then(
          (differenceToErase) => {
            if (differenceToErase) {
              this.onDifferenceFound(differenceToErase.posOfPixelsToErase);
              this.differenceImgPixels = differenceToErase.updatedDifferenceImage;
              this.waitQuarterASecond();
            } else {
              this.onClickFail(mouseEvent.offsetX, mouseEvent.offsetY, this.modifCtx, this.modifTextCanvas);
            }
          },
        )
        .catch((err) => { console.error("erreur :", err); });
    }
  }

  private waitQuarterASecond(): void {
    setTimeout(() => {
      this.canClickAgain = true;
    },         (Constants.QUARTER_A_SECOND));
  }

  private onDifferenceFound(differencePixelsToErase: number[]): void {
    this.imageDisplayerService.eraseDifference(this.modifCtx, differencePixelsToErase);
    this.differenceValidatorService.playVictorySound();
    this.gameViewService.onDiffFound();
  }

  private onClickFail(xPos: number, yPos: number, ctx: CanvasRenderingContext2D, textCanvas: ElementRef): void {
    this.differenceValidatorService.playFailSound();
    const textCtx: CanvasRenderingContext2D = textCanvas.nativeElement.getContext(Constants.CTX_2D);
    this.errorDisplayerService.drawError(xPos, yPos, textCtx);
  }
}
