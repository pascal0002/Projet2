import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
import { ClientConstants, ServerConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { TWO_DIMENSION_GAME_CARD_LIST } from "../../../../server/public/mock/2d-game-card-mock-list";

@Injectable({
  providedIn: "root",
})
export class DifferenceValidatorService {

  public game2d: GameCard;

  public constructor(private http: HttpClient) {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[4];
   }

  public getClickCoordinates(event: MouseEvent): IClickInfo {

    return {
      xPos: event.offsetX,
      yPos: this.getCorrectYPos(event.offsetY),
      differenceImageName: this.getDifferenceImageName(),
    };
  }

  public getCorrectYPos(yPos: number): number {
    return Math.abs(yPos - ClientConstants.VALID_BMP_HEIGHT);
  }

  public getDifferenceImageName(): string {
    const orginalFilePath: string = this.game2d.imageName;
    const differenceFilePath: string =
     orginalFilePath.substr(0, orginalFilePath.length - ServerConstants.EXTENSION_LENGTH) + "Differences.bmp";

    return differenceFilePath.split("/").pop() as string;
  }

  public sendClickPosition(mousePos: IClickInfo): void {
    this.http.post<IClickInfo>(`${ClientConstants.SERVER_BASE_URL}api/differences/difference_validator`, mousePos)
    .toPromise()
    .then(
      (res) => {
        console.log(res);
        this.playSound();
      },
    )
    .catch(
      (err) => {console.error("erreur :", err); },
    );
  }

  public playSound(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = "../../../assets/sound.mp3";
    audio.play();
  }
}
