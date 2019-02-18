import { Component, OnInit } from "@angular/core";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "../game-view/game-view.service";
import { DifferenceValidatorService } from "./difference-validator.service";
import { ImageDisplayerService } from "./image-displayer.service";

@Component({
  selector: "app-game-2d",
  templateUrl: "./game-2d.component.html",
  styleUrls: ["./game-2d.component.css"],
})
export class Game2DComponent implements OnInit {
  public gameCard: GameCard;
  public modifiedImgPath: string;
  public modifCtx: CanvasRenderingContext2D;

  public constructor(public gameViewService: GameViewService,
                     private differenceValidatorService: DifferenceValidatorService,
                     private imageDisplayerService: ImageDisplayerService) {
    this.gameCard = gameViewService.gamecard;
    this.differenceValidatorService.game2d = gameViewService.gamecard;
    this.modifiedImgPath = this.differenceValidatorService.getModifiedImagePath();
  }

  public ngOnInit(): void {
    this.differenceValidatorService.startNewGame();

    const ogCanvas: HTMLCanvasElement = document.getElementById("ogCanvas") as HTMLCanvasElement;
    const ogCtx: CanvasRenderingContext2D = ogCanvas.getContext("2d") as CanvasRenderingContext2D;

    const modifCanvas: HTMLCanvasElement = document.getElementById("modifCanvas") as HTMLCanvasElement;
    this.modifCtx = modifCanvas.getContext("2d") as CanvasRenderingContext2D;

    this.drawImageInCanvas(ogCtx, this.gameCard.image, true);
    this.drawImageInCanvas(this.modifCtx, this.modifiedImgPath, false);
  }

  public drawImageInCanvas(ctx: CanvasRenderingContext2D, imageLocation: string, isOriginalImg: boolean): void {
    this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(imageLocation, isOriginalImg))
    .then((res) => {
      (isOriginalImg) ? this.imageDisplayerService.originalImagePixels = res : this.imageDisplayerService.modifiedImagePixels = res;
      this.imageDisplayerService.modifiedImagePixels = res;
      this.imageDisplayerService.drawPixelsInCanvas(ctx, res);
    });
  }

  public sendClickInfo(mouseEvent: MouseEvent): void {
    this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY))
      .then((res) => {
        if (res.length !== 0) {
          this.imageDisplayerService.eraseDifference(this.modifCtx, res);
          this.differenceValidatorService.playVictorySound();
        } else {
          this.differenceValidatorService.playFailSound();
        }
      },
      )
      .catch(
        (err) => { console.error("erreur :", err); });
  }
}
