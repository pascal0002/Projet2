import { AfterViewInit, Component } from "@angular/core";
import { GameCard } from "../../../../common/communication/game-card";
import { TWO_DIMENSION_GAME_CARD_LIST } from "../../../../server/public/mock/2d-game-card-mock-list";

@Component({
  selector: "app-game-view-2d",
  templateUrl: "./game-view-2d.component.html",
  styleUrls: ["./game-view-2d.component.css"],
})

export class GameView2DComponent implements AfterViewInit {

  public game2d: GameCard;
  public ctx: CanvasRenderingContext2D | null;
  public constructor() {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[0];
  }

  public ngAfterViewInit(): void {

    // Create img
//    const img: HTMLImageElement = new Image();
//    img.src = this.game2d.imageName;

    // Create canvas
//    const canvas: HTMLCanvasElement = document.createElement("canvas");
//    canvas.width = img.width;
//    canvas.height = img.height;
//    document.body.appendChild(canvas);
   // const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
//    this.ctx = canvas.getContext("2d");
    // Load image and draw
 //   img.onload = (() => {
 //     if (this.ctx && img.complete) {
 //       this.ctx.drawImage(img, 0, 0, 640, 480);
 //     } else {
 //       console.log("Error: context is null");
 //     }
 //   });
  }

  public clickImage(event: MouseEvent): void {
    console.log("----Click event!----");
    console.log("Client coordinates: ");
    console.log(event.clientX);
    console.log(event.clientY);
    console.log("Offset coordinates: ");
    console.log(event.offsetX);
    console.log(event.offsetY);
    console.log("---------------------");
  }

}
