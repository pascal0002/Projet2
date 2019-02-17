import { Component, OnInit } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
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

  public ctx: CanvasRenderingContext2D | null;
  public clickPosition: Array<number>;

  public diffFoundCount: number = 0;
  public gameCard: GameCard;
  public modifiedImgPath: string;

  public constructor(public gameViewService: GameViewService, private differenceValidatorService: DifferenceValidatorService,
                     private imageDisplayerService: ImageDisplayerService) {
    this.gameCard = gameViewService.gamecard;
    this.differenceValidatorService.game2d = gameViewService.gamecard;
    this.modifiedImgPath = this.differenceValidatorService.getModifiedImagePath();
  }

  public ngOnInit(): void {
    this.differenceValidatorService.startNewGame();

    // Create canvas
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = ClientConstants.VALID_BMP_WIDTH;
    canvas.height = ClientConstants.VALID_BMP_HEIGHT;
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");

    if (this.ctx) {
      // console.log(this.gameCard);
      this.imageDisplayerService.drawPixelsInCanvas(this.ctx, this.gameCard.image);
    }

    addEventListener("click", (e) => {
      // this.clickImage(e);
      // this.getPixel();
    });
  }

 /*public ngAfterViewInit(): void {

    // Create canvas
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = ClientConstants.VALID_BMP_WIDTH;
    canvas.height = ClientConstants.VALID_BMP_HEIGHT;
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");

    this.drawPixelsInCanvas();
    addEventListener("click", (e) => {
      this.clickImage(e);
      this.getPixel();
    });
  }*/

  public sendClickInfo(mouseEvent: MouseEvent): void {
    this.differenceValidatorService.sendClickInfo(this.differenceValidatorService.getClickInfo(mouseEvent.offsetX, mouseEvent.offsetY));
  }

}
