import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
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
  public clickPosition: Array<number>;

  public constructor(private http: HttpClient) {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[0];
  }

  public ngAfterViewInit(): void {

    // Create img
    const img: HTMLImageElement = new Image();
    img.src = this.game2d.imageName;

    // Load image, create canvas and draw
    img.onload = (() => {

        // Create canvas
        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        document.body.appendChild(canvas);
        // const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
        this.ctx = canvas.getContext("2d");

        if (this.ctx && img.complete) {
          this.ctx.drawImage(img, 0, 0, img.width, img.height);
        }

        addEventListener("click", (e) => {
          this.clickImage(e);
          this.getPixel(img, 0, 0); // Erreur d'accès sur la console page web
        });
      });
  }

  public clickImage(event: MouseEvent): void {
    this.clickPosition = [event.offsetX, event.offsetY];
    this.sendClickPosition(this.clickPosition);
    /*
    console.log("----Click event!----");
    console.log("Client coordinates: ");
    console.log(event.clientX);
    console.log(event.clientY);
    */
    console.log("Offset coordinates: ");
    console.log(event.offsetX);
    console.log(event.offsetY);
    console.log("---------------------");

  }

  public getPixel(img: HTMLImageElement, xPos: number, yPos: number): void {

    if (this.ctx) {
      const imageData: ImageData = this.ctx.getImageData(xPos, yPos, img.width, img.height);
      console.log(imageData.data.length);
      console.log("First pixel colors: " + imageData.data);
    }
    // L'accès à imageData.data ne semble pas être autorisé
    // const imageData: ImageData = new ImageData(img.width, img.height);

    // return
  }

  public sendClickPosition(mousePos: Array<number>): void {
    this.http.post<Array<number>>(`${ClientConstants.SERVER_BASE_URL}api/differences/difference_validator`, mousePos)
    .toPromise()
    .then()
    .catch(
      (err) => {console.error("erreur :", err); },
    );
  }

}
