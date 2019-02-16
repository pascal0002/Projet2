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
  public imagePath: IImagePath = {path: ServerConstants.PUBLIC_MOD_FOLDER_PATH + "MY_TEST_BMP_MODIF.bmp"};
  public originalImagePixels: number[] = [];

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
    // const img: HTMLImageElement = new Image();
    // img.src = this.game2d.imageName;

    // Create canvas
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");
    const imageData: ImageData = new ImageData(640, 480);

    if (this.ctx) {
      // Iterate through every pixel
      this.originalImage()
      .then((res) => {
        console.log(res);
        this.originalImagePixels = res;
        let j: number = 0;
        for (let i: number = 0; i < this.originalImagePixels.length; i += 3) {
          imageData.data[j + 0] = this.originalImagePixels[i + 0];    // R value
          imageData.data[j + 1] = this.originalImagePixels[i + 1];    // G value
          imageData.data[j + 2] = this.originalImagePixels[i + 2];    // B value
          imageData.data[j + 3] = 255;                                // A value
          j += 4;
        }
        if (this.ctx) {
          this.ctx.putImageData(imageData, 0, 0, );
        }
      });
      /*for (let i: number = 0; i < this.originalImage.length; i ++) {
        image[i] = this.originalImage()[i];
      }*/
      /*for (let i: number = 0; i < this.originalImagePixels.length; i += 4) {
        imageData.data[i + 0] = this.originalImagePixels[i + 0];    // R value
        imageData.data[i + 1] = this.originalImagePixels[i + 1];    // G value
        imageData.data[i + 2] = this.originalImagePixels[i + 2];    // B value
        imageData.data[i + 3] = 255;             // A value
      }
      this.ctx.putImageData(imageData, 0, 0, );*/
    }

    // Load image, create canvas and draw

    // this.ctx.drawImage(img, 0, 0, img.width, img.height);

    // addEventListener("click", (e) => {
    //      this.clickImage(e);
    //      this.getPixel();
    //    });
  }

  public async originalImage(): Promise<number[]> {

    return new Promise<number[]> ((resolve: Function, res: Function) =>
    resolve(this.http.post<number[]>(ClientConstants.SERVER_BASE_URL + "api/differences/bitmap_encoder", this.imagePath)
    .toPromise()));
    /*
    .then(
      (res) => {
        this.originalImagePixels = res;
      },
    )
    .catch(
      (err) => {console.error("erreur :", err); },
    );*/

  }








  public clickImage(event: MouseEvent): void {
    this.clickPosition = [event.offsetX, event.offsetY];
    this.sendClickPosition(this.clickPosition);
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
