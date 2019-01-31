import Axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { FormInfo } from "../../../common/communication/FormInfo";
import { GameCard } from "../../../common/communication/game-card";
import { TWO_DIMENSION_GAME_CARD_LIST } from "../../public/mock/2d-game-card-mock-list";
import Types from "../types";
import { DifferenceCounterService } from "./difference-counter.service";

const VALID_NUMBER_OF_DIFFERENCES: number = 7;

const MINIMAL_TIME_DUO: number = 150;
const MAXIMAL_TIME_DUO: number = 300;
const MINIMAL_TIME_SOLO: number = 210;
const MAXIMAL_TIME_SOLO: number = 360;

const NUMBER_HIGH_SCORE: number = 3;

const SECOND_PER_MINUTE: number = 60;

const MAXIMAL_USER_ID: number = 999;

const TWO_DIGIT: number = -2;

const ORIGINAL_IMAGE_FOLDER: string = "http://localhost:3000/originalImages/";
const MODIFIED_IMAGE_FOLDER: string = "http://localhost:3000/originalImages/";
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
    return (this.differenceCounterService.getNumberOfDifferences(differencesImage) === VALID_NUMBER_OF_DIFFERENCES);
  }

  public generateGameCard(formInfo: FormInfo): GameCard {

    return {
      title: formInfo.gameName,
      imageName: this.generateOriginalImagePath(formInfo.originalImage.fileName),
      modifiedImageName: this.generateModifiedImagePath(formInfo.modifiedImage.fileName),
      bestTimeSolo: this.generateBestTime(MINIMAL_TIME_SOLO, MAXIMAL_TIME_SOLO),
      bestTime1v1: this.generateBestTime(MINIMAL_TIME_DUO, MAXIMAL_TIME_DUO),
    };
  }

  private generateOriginalImagePath(imageName: string): string {

    return ORIGINAL_IMAGE_FOLDER + imageName;
  }

  private generateModifiedImagePath(imageName: string): string {

    return MODIFIED_IMAGE_FOLDER + imageName;
  }

  private generateBestTime(minimalTime: number, maximalTime: number): string[] {
    const highScore: string[] = [];
    for (let i: number = 0; i < NUMBER_HIGH_SCORE; i++) {
      const time: string = this.convertTimeToMSSFormat(this.getRandomRange(minimalTime, maximalTime));
      const userID: number = this.getRandomRange(0, MAXIMAL_USER_ID);
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
    const seconde: number = time % SECOND_PER_MINUTE;
    const minute: number = (time - seconde) / SECOND_PER_MINUTE;

    return `${minute}:${this.totwoDigitString(seconde)}`;
  }

  private totwoDigitString(initialNumber: number): string {
    return ("0" + initialNumber).slice(TWO_DIGIT);
  }
}
