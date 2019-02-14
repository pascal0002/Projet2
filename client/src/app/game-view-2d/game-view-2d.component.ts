import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component } from "@angular/core";
import { Router } from "@angular/router";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
import {ClientConstants, ServerConstants} from "../../../../common/communication/Constants";
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
  public pixelsDecoded: number[] = [];

  public constructor(private http: HttpClient, private router: Router) {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[4];
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

  // Mettre dans un game-view-info-handler service
  public getClickCoordinates(event: MouseEvent): void {
    const clickCoordinates: IClickInfo = {
      xPos: event.offsetX,
      yPos: this.getCorrectYPos(event.offsetY),
      differenceImageName: this.getDifferenceImageName(),
    };
    this.sendClickPosition(clickCoordinates);
    console.log("xPos : " + clickCoordinates.xPos + ", yPos : " + clickCoordinates.yPos);
    console.log(this.getDifferenceImageName());
  }

  public getCorrectYPos(yPos: number): number {
    return Math.abs(yPos - ClientConstants.VALID_BMP_HEIGHT);
  }

  public sendClickPosition(mousePos: IClickInfo): void {
    this.http.post<IClickInfo>(`${ClientConstants.SERVER_BASE_URL}api/differences/difference_validator`, mousePos)
    .toPromise()
    .then(
      (res) => {
        console.log(res);
        this.playSound();
        /*try {
          const audio: HTMLAudioElement = new Audio("../sound.mp3");
          audio.play();
        } catch (error) {
          console.log(error);
        }*/
      },
    )
    .catch(
      (err) => {console.error("erreur :", err); },
    );
  }

  public playSound(): void {
    console.log(this.router.url);
    const audio: HTMLAudioElement = new Audio();
    audio.src = "../../../assets/sound.mp3";  //"./sound.mp3";
    console.log(window.location.href);
    audio.play();
    
  }

}
