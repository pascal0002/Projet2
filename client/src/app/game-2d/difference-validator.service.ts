import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
import { Constants } from "../../../../common/communication/Constants";
import { IDiffInfoToHandle } from "../../../../common/communication/DiffInfoToHandle";
import { IDifferenceImage } from "../../../../common/communication/DifferenceImage";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})
export class DifferenceValidatorService {

  public game2d: GameCard;

  public constructor(private http: HttpClient) {
  }

  public getClickInfo(xPosition: number, yPosition: number): IClickInfo {

    return {
      xPos: xPosition,
      yPos: this.getCorrectYPos(yPosition),
    };
  }

  private getCorrectYPos(yPos: number): number {
    return Math.abs(yPos - Constants.VALID_BMP_HEIGHT);
  }

  private getDifferenceImageName(): string {
    const orginalFilePath: string = this.game2d.image;
    const differenceFilePath: string =
      orginalFilePath.substr(0, orginalFilePath.length - Constants.EXTENSION_LENGTH) + Constants.DIFFIMAGE_SUFFIX;

    return differenceFilePath.split("/").pop() as string;
  }

  public async getDifferenceImgPixels(): Promise<number[]> {
    const differenceImage: IDifferenceImage = { name: this.getDifferenceImageName(), pixels: []};

    return (this.http.post<number[]>(Constants.SERVER_BASE_URL + Constants.API_NEWGAME_URL, differenceImage)
      .toPromise()
      .catch((err: Error) => { console.error(err); }) as Promise<number[]>);
  }

  public async sendClickInfo(mousePos: IClickInfo, differencePixels: number[]): Promise<number[]> {
    const differenceImage: IDifferenceImage = {name: "cac", pixels: differencePixels};
    const diffInfo: IDiffInfoToHandle = {clickInfo: mousePos, differenceImage: differenceImage };

    return new Promise<number[]>((resolve: Function) => {
      resolve(this.http.post<number[]>(Constants.SERVER_BASE_URL + Constants.API_DIFFVALIDATOR_URL, diffInfo)
        .toPromise());
    });
  }

  public playVictorySound(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = Constants.SOUND_FOLDER + Constants.VICTORY_SOUND;
    audio.play()
      .catch((err: Error) => { console.error(err); });
  }

  public playFailSound(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = Constants.SOUND_FOLDER + Constants.FAIL_SOUND;
    audio.play()
      .catch((err: Error) => { console.error(err); });
  }
}
