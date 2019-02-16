import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { ClientConstants, ServerConstants } from "../../../../common/communication/Constants";
import { IImagePath } from "../../../../common/communication/ImagePath";
import { GameCard } from "../../../../common/communication/game-card";

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

    // Create canvas
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d");

    this.drawPixelsInCanvas();
    addEventListener("click", (e) => {
      this.clickImage(e);
      this.getPixel();
    });
  }

  public async originalImage(): Promise<number[]> {

    return new Promise<number[]> ((resolve: Function, res: Function) =>
    resolve(this.http.post<number[]>(ClientConstants.SERVER_BASE_URL + "api/differences/bitmap_encoder", this.imagePath)
    .toPromise()));
  }

  public drawPixelsInCanvas(): void {
    const imageData: ImageData = new ImageData(640, 480);
    if (this.ctx) {
      // Iterate through every pixel
      this.originalImage()
      .then((res) => {
        this.originalImagePixels = res;
        let j: number = 0;
        for (let i: number = 0; i < this.originalImagePixels.length; i += 3) {
          imageData.data[j + 0] = this.originalImagePixels[i + 2];    // B value
          imageData.data[j + 1] = this.originalImagePixels[i + 1];    // G value
          imageData.data[j + 2] = this.originalImagePixels[i + 0];    // R value
          imageData.data[j + 3] = 255;                                // A value
          j += 4;
        }

        if (this.ctx) {
          this.ctx.putImageData(imageData, 0, 0, );
        }

      });
    }
  }

  public clickImage(event: MouseEvent): void {
    this.clickPosition = [event.offsetX, event.offsetY];
    // this.sendClickPosition(this.clickPosition);
  }

  public getPixel(): void {

  }

  /*
  public sendClickPosition(mousePos: Array<number>): void {
     this.http.post<Array<number>>(ClientConstants.SERVER_BASE_URL + "api/differences/difference_validator", mousePos)
     .toPromise()
     .then()
     .catch(
       (err) => {console.error("erreur :", err); },
     );
  }*/

}
