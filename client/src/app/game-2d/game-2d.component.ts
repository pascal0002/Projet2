import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "../game-view/game-view.service";
import { DifferenceValidatorService } from "./difference-validator.service";
import { ImageDisplayerService } from "./image-displayer.service";

@Component({
  selector: "app-game-2d",
  templateUrl: "./game-2d.component.html",
  styleUrls: ["./game-2d.component.css"],
})
export class Game2DComponent implements AfterViewInit {
  public gameCard: GameCard;
  public differenceImgPixels: number[];
  public canClickAgain: boolean = true;
  public modifCtx: CanvasRenderingContext2D;
  @ViewChild("ogCanvas") public ogCanvas: ElementRef;
  @ViewChild("modifCanvas") public modifCanvas: ElementRef;

  public constructor(public gameViewService: GameViewService,
    private differenceValidatorService: DifferenceValidatorService,
    private imageDisplayerService: ImageDisplayerService) {
    this.gameCard = gameViewService.model.gamecard;
    this.differenceValidatorService.game2d = gameViewService.model.gamecard;
  }

  public ngAfterViewInit(): void {
    this.differenceValidatorService.getDifferenceImgPixels()
      .then((res: number[]) => {
        this.differenceImgPixels = res;
      })
      .catch((err) => { console.error(err); });
    const ogCtx: CanvasRenderingContext2D = this.ogCanvas.nativeElement.getContext(Constants.CTX_2D);
    this.modifCtx = this.modifCanvas.nativeElement.getContext(Constants.CTX_2D);

    this.drawImageInCanvas(ogCtx, this.gameCard.image, true);
    this.drawImageInCanvas(this.modifCtx, this.gameCard.imageModified, false);
  }

  private drawImageInCanvas(ctx: CanvasRenderingContext2D, imageLocation: string, isOriginalImg: boolean): void {
    this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(imageLocation, isOriginalImg))
      .then((res) => {
        (isOriginalImg) ? this.imageDisplayerService.originalImagePixels = res : this.imageDisplayerService.modifiedImagePixels = res;
        this.imageDisplayerService.drawPixelsInCanvas(ctx, res);
      })
      .catch((err: Error) => { console.error(err); });
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
    }
    this.waitHalfASecond();
  }

  private waitHalfASecond(): void {
    this.canClickAgain = false;
    setTimeout(() => {
      this.canClickAgain = true;
    }, Constants.HALF_A_SECOND);
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
