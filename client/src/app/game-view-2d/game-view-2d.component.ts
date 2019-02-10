import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component } from "@angular/core";
import { IClickCoordinates } from "../../../../common/communication/ClickCoordinates";
import {ClientConstants} from "../../../../common/communication/Constants";
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

  public constructor(private http: HttpClient) {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[3];
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

  public getClickCoordinates(event: MouseEvent): void {
    const clickCoordinates: IClickCoordinates = {
      xPos: event.offsetX,
      yPos: this.getCorrectYPos(event.offsetY),
    };
    this.sendClickPosition(clickCoordinates);
    console.log("xPos : " + clickCoordinates.xPos + ", yPos : " + clickCoordinates.yPos);

  }

  public getCorrectYPos(yPos: number): number {
    return Math.abs(yPos - ClientConstants.VALID_BMP_HEIGHT);
  }

  public sendClickPosition(mousePos: IClickCoordinates): void {
    this.http.post<IClickCoordinates>(`${ClientConstants.SERVER_BASE_URL}api/differences/difference_validator`, mousePos)
    .toPromise()
    .then()
    .catch(
      (err) => {console.error("erreur :", err); },
    );
  }

}
