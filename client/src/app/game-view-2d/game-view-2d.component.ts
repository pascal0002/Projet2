import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClientConstants, ServerConstants } from "../../../../common/communication/Constants";
import { IImagePath } from "../../../../common/communication/ImagePath";
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
  public imagePath: IImagePath = {path: ServerConstants.PUBLIC_OG_FOLDER_PATH + "cat.bmp"};

  public constructor(private http: HttpClient, route: Router) {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[0];
  }

  // Peut etre ajouter un attribut dans gameCard au lieu de faire ca
  public getDifferenceImageName(): string {
    const orginalFilePath: string = this.game2d.imageName;
    const differenceFilePath: string =
     orginalFilePath.substr(0, orginalFilePath.length - ServerConstants.EXTENSION_LENGTH) + "Differences.bmp";

    return differenceFilePath.split("/").pop() as string;
  }

  public getImageNameFromPath(path: string): string | undefined {
    return path.split("/").pop();
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
          this.getPixel(); // Erreur d'accès sur la console page web
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

    console.log("Offset coordinates: ");
    console.log(event.offsetX);
    console.log(event.offsetY);
    console.log("---------------------");
    */
  }

  public getPixel(): void {

    this.http.post<string>(ClientConstants.SERVER_BASE_URL + "api/differences/bitmap_encoder", this.imagePath)
    .toPromise()
    .then(
      (res) => {
        console.log(res);
      },
    )
    .catch(
      (err) => {console.error("erreur :", err); },
    );

    if (this.ctx) {
      // const imageData: ImageData = this.ctx.getImageData(xPos, yPos, img.width, img.height);
      // console.log(imageData.data.length);
      // console.log("First pixel colors: " + imageData.data);
    }
    // L'accès à imageData.data ne semble pas être autorisé
    // const imageData: ImageData = new ImageData(img.width, img.height);

    // return
  }

  public sendClickPosition(mousePos: Array<number>): void {
  //   this.http.post<Array<number>>(ClientConstants.SERVER_BASE_URL + "api/differences/difference_validator`, mousePos)
  //   .toPromise()
  //   .then()
  //   .catch(
  //     (err) => {console.error("erreur :", err); },
  //   );
  }

}
