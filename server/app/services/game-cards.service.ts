import Axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";
import {GameCard} from "../../../common/communication/game-card";
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
@injectable()
export class GameCardsService {

  public constructor(@inject(Types.DifferenceCounterService) private differenceCounterService: DifferenceCounterService) {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): Promise<BitmapImage> {
    const images: Object = {"originalImage": originalImg,
                            "modifiedImage": modifiedImg};

    return Axios.post<BitmapImage>("http://localhost:3000/api/differences", images)
    .then((image: AxiosResponse<BitmapImage>) => {

      return image.data;
    });
  }

  public validateDifferencesImage(differencesImage: BitmapImage): boolean {
    return (this.differenceCounterService.getNumberOfDifferences(differencesImage) === VALID_NUMBER_OF_DIFFERENCES);
  }

  public generateGameCard(): GameCard {
    return { title: "",
             imageName: "",
             modifiedImageName: "",
             highScoreSolo: this.generateBestTime(MINIMAL_TIME_SOLO, MAXIMAL_TIME_SOLO),
             highScore1v1: this.generateBestTime(MINIMAL_TIME_DUO, MAXIMAL_TIME_DUO),
           };
  }

  private generateBestTime(minimalTime: number, maximalTime: number): string[] {
    const highScore: string[] = [];
    for (let i: number = 0; i < NUMBER_HIGH_SCORE; i++) {
      const time: string = this.convertTimeToMSSFormat(this.getRandomNumber(minimalTime, maximalTime));
      const userID: number = this.getRandomNumber(0, MAXIMAL_USER_ID);
      highScore.push(`${time} user${userID}`);
    }

    return highScore;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
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
