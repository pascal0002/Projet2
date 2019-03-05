import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { GameViewService } from "../game-view/game-view.service";
import { DifferenceValidatorService } from "./difference-validator.service";
import { ImageDisplayerService } from "./image-displayer.service";

@Component({
  selector: "app-game-2d",
  templateUrl: "./game-2d.component.html",
  styleUrls: ["./game-2d.component.css"],
})
export class Game2DComponent implements AfterViewInit {
  public differenceImgPixels: number[];
  public canClickAgain: boolean = true;
  public imagesHaveBeenLoaded: boolean = false;
  public modifCtx: CanvasRenderingContext2D;
  @ViewChild(Constants.ORIGINAL_CANVAS_2D) public ogCanvas: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_2D) public modifCanvas: ElementRef;

  public constructor(public gameViewService: GameViewService,
                     private differenceValidatorService: DifferenceValidatorService,
                     private imageDisplayerService: ImageDisplayerService) {
    this.canClickAgain = true;
    this.imagesHaveBeenLoaded = false;
    this.differenceValidatorService.game2d = gameViewService.model.gamecard;
    this.setDifferenceImgPixels();
  }

  public ngAfterViewInit(): void {
    const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
    this.modifCtx = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

    this.drawTheTwoImages(ogCtx, this.modifCtx);
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
      this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY),
                                                    this.differenceImgPixels)
        .then(
          (res) => {
            if (res) {
              this.onDifferenceFound(res.posOfPixelsToErase);
              this.differenceImgPixels = res.updatedDifferenceImage;
            } else {
              this.onClickFail();
            }
          },
        )
        .catch((err) => { console.error("erreur :", err); });
      this.waitHalfASecond();
    }
  }

  private waitHalfASecond(): void {
    this.canClickAgain = false;
    setTimeout(() => {
      this.canClickAgain = true;
    },         Constants.HALF_A_SECOND);
  }

  private onDifferenceFound(differencePixelsToErase: number[]): void {
    this.imageDisplayerService.eraseDifference(this.modifCtx, differencePixelsToErase);
    this.differenceValidatorService.playVictorySound();
    this.gameViewService.onDiffFound();
  }

  private onClickFail(): void {
    this.differenceValidatorService.playFailSound();
  }

}
