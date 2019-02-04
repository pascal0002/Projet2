import Axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";
import { IFormInfo } from "../../../common/communication/FormInfo";
import { GameCard } from "../../../common/communication/game-card";
import Types from "../types";
import { DifferenceCounterService } from "./difference-counter.service";

@injectable()
export class GameCardsService {

  public constructor(@inject(Types.DifferenceCounterService) private differenceCounterService: DifferenceCounterService) {/**/ }

  public generateDifferences(originalImg: IBitmapImage, modifiedImg: IBitmapImage): Promise<IBitmapImage> {
    const images: Object = {
      "originalImage": originalImg,
      "modifiedImage": modifiedImg,
    };

    return Axios.post<IBitmapImage>("http://localhost:3000/api/differences", images)
      .then((image: AxiosResponse<IBitmapImage>) => {

        return image.data;
      });
  }

  public validateDifferencesImage(differencesImage: IBitmapImage): boolean {
    return (this.differenceCounterService.getNumberOfDifferences(differencesImage) === ServerConstants.VALID_NUMBER_OF_DIFFERENCES);
  }

  public generateGameCard(formInfo: IFormInfo): GameCard {

    return {
      title: formInfo.gameName,
      imageName: this.generateOriginalImagePath(formInfo.originalImage.fileName),
      modifiedImageName: this.generateModifiedImagePath(formInfo.modifiedImage.fileName),
      bestTimeSolo: this.generateBestTime(ServerConstants.MINIMAL_TIME_SOLO, ServerConstants.MAXIMAL_TIME_SOLO),
      bestTime1v1: this.generateBestTime(ServerConstants.MINIMAL_TIME_DUO, ServerConstants.MAXIMAL_TIME_DUO),
    };
  }

  private generateOriginalImagePath(imageName: string): string {

    return ServerConstants.ORIGINAL_IMAGE_FOLDER + imageName;
  }

  private generateModifiedImagePath(imageName: string): string {

    return ServerConstants.MODIFIED_IMAGE_FOLDER + imageName;
  }

  private generateBestTime(minimalTime: number, maximalTime: number): string[] {
    const highScore: string[] = [];
    for (let i: number = 0; i < ServerConstants.NUMBER_HIGH_SCORE; i++) {
      minimalTime = this.getRandomRange(minimalTime, maximalTime);
      const time: string = this.convertTimeToMSSFormat(minimalTime);
      const userID: number = this.getRandomRange(0, ServerConstants.MAXIMAL_USER_ID);
      highScore.push(`${time} user${userID}`);
    }

    return highScore;
  }

  public getRandomRange(min: number, max: number): number {
    return Math.floor(this.getRandomNumber() * (max - min) + min);
  }

  public getRandomNumber(): number {
    return Math.random();
  }

  private convertTimeToMSSFormat(time: number): string {
    const seconde: number = time % ServerConstants.SECOND_PER_MINUTE;
    const minute: number = (time - seconde) / ServerConstants.SECOND_PER_MINUTE;

    return `${minute}:${this.totwoDigitString(seconde)}`;
  }

  private totwoDigitString(initialNumber: number): string {
    return ("0" + initialNumber).slice(ServerConstants.TWO_DIGIT);
  }
}
