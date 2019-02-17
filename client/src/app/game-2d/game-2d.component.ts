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
    const modifCtx: CanvasRenderingContext2D = modifCanvas.getContext("2d") as CanvasRenderingContext2D;

    this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(this.gameCard.image, true))
    .then((res) => {
      this.imageDisplayerService.drawPixelsInCanvas(ogCtx, res);
    });

    this.imageDisplayerService.getImagePixels(this.imageDisplayerService.getFolderLocation(this.modifiedImgPath, false))
    .then((res) => {
      this.imageDisplayerService.drawPixelsInCanvas(modifCtx, res);
    });
  }

  public sendClickInfo(mouseEvent: MouseEvent): void {
    this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY));
  }

}
