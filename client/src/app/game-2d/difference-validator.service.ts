import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
import { Constants } from "../../../../common/communication/Constants";
import { IDifferenceImage } from "../../../../common/communication/DifferenceImage";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})
export class DifferenceValidatorService {

  public game2d: GameCard;
  public diffFoundCount: number;

  public constructor(private http: HttpClient) {
  }

  public getClickInfo(xPosition: number, yPosition: number): IClickInfo {

    return {
      xPos: xPosition,
      yPos: this.getCorrectYPos(yPosition),
      differenceImageName: this.getDifferenceImageName(),
    };
  }

  private getCorrectYPos(yPos: number): number {
    return Math.abs(yPos - Constants.VALID_BMP_HEIGHT);
  }

  private getDifferenceImageName(): string {
    const orginalFilePath: string = this.game2d.image;
    const differenceFilePath: string =
      orginalFilePath.substr(0, orginalFilePath.length - Constants.EXTENSION_LENGTH) + "Differences.bmp";

    return differenceFilePath.split("/").pop() as string;
  }

  public getModifiedImagePath(): string {
    const orginalFilePath: string = this.game2d.image;
    const imageName: string = (orginalFilePath.substr(0, orginalFilePath.length - Constants.EXTENSION_LENGTH) + "Modified.bmp")
      .split("/").pop() as string;

    return Constants.MODIFIED_IMAGE_FOLDER + imageName;
  }

  public startNewGame(): void {
    const differenceImage: IDifferenceImage = { name: this.getDifferenceImageName() };
    this.http.post<IDifferenceImage>(`${Constants.SERVER_BASE_URL}api/differences/new_game`, differenceImage).toPromise();
  }

  public async sendClickInfo(mousePos: IClickInfo): Promise<number[]> {
    return new Promise<number[]>((resolve: Function) => {
      resolve(this.http.post<number[]>(`${Constants.SERVER_BASE_URL}api/differences/difference_validator`, mousePos)
        .toPromise());
    });
  }

  public playVictorySound(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = "../../../assets/Sounds/victorySound.mp3";
    audio.play();
  }

  public playFailSound(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = "../../../assets/Sounds/failSound.mp3";
    audio.play();
  }
}
