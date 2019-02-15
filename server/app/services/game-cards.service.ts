import Axios, { AxiosResponse } from "axios";
import { inject, injectable } from "inversify";
import * as mongoose from "mongoose";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { Dimension, ServerConstants } from "../../../common/communication/Constants";
import { IFormInfo2D } from "../../../common/communication/FormInfo2D";
import { IFormInfo3D } from "../../../common/communication/FormInfo3D";
import { GameCard } from "../../../common/communication/game-card";
import Types from "../types";
import { DatabaseService } from "./database.service";
import { DifferenceCounterService } from "./difference-counter.service";
import { gameCard2D } from "./game-card-2D-schema";
import { gameCard3D } from "./game-card-3D-schema";

@injectable()
export class GameCardsService {

  public constructor(@inject(Types.DifferenceCounterService) private differenceCounterService: DifferenceCounterService,
                     @inject(Types.DatabaseService) private databaseService: DatabaseService) { }

  public async generateDifferences(originalImg: IBitmapImage, modifiedImg: IBitmapImage): Promise<IBitmapImage> {
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

  public async getGameCards2D(): Promise<mongoose.Document[]> {
    return this.databaseService.getAll(gameCard2D);
  }

  public async getGameCards3D(): Promise<mongoose.Document[]> {
    return this.databaseService.getAll(gameCard3D);
  }

  public convertDBGameCards(gameCardsDB: mongoose.Document[], dimension: Dimension): GameCard[] {
    const gameCards: GameCard[] = [];
    gameCardsDB.forEach((gameCard: mongoose.Document) => {
      gameCards.push(this.convertDBGameCard(gameCard, dimension));
    });

    return gameCards;
  }

  public addGameCard2D(formInfo: IFormInfo2D, differenceImage: IBitmapImage): GameCard {
    const gameCard: GameCard = this.generateGameCard2D(formInfo);
    this.databaseService.add(new gameCard2D({
      title: gameCard.title,
      originalImagePath: gameCard.originalImagePath,
      differenceImagePath: this.generateDifferenceImagePath(differenceImage.fileName),
      bestScoreSolo: gameCard.bestTimeSolo,
      bestScore1v1: gameCard.bestTime1v1,
    }));

    return gameCard;
  }

  public addGameCard3D(formInfo: IFormInfo3D): GameCard {
    const gameCard: GameCard = this.generateGameCard3D(formInfo);
    this.databaseService.add(new gameCard3D({
      title: gameCard.title,
      imageData: "",
      bestScoreSolo: gameCard.bestTimeSolo,
      bestScore1v1: gameCard.bestTime1v1,
    }));

    return gameCard;
  }

  private convertDBGameCard(gameCard: mongoose.Document, dimension: Dimension): GameCard {
    return {
      title: gameCard.toJSON().title,
      originalImagePath: gameCard.toJSON().originalImagePath,
      bestTimeSolo: gameCard.toJSON().bestScoreSolo,
      bestTime1v1: gameCard.toJSON().bestScore1v1,
      dimension: dimension,
    };
  }

  private generateGameCard2D(formInfo: IFormInfo2D): GameCard {

    return {
      title: formInfo.gameName,
      originalImagePath: this.generateOriginalImagePath(formInfo.originalImage.fileName),
      bestTimeSolo: this.generateBestTime(ServerConstants.MINIMAL_TIME_SOLO, ServerConstants.MAXIMAL_TIME_SOLO),
      bestTime1v1: this.generateBestTime(ServerConstants.MINIMAL_TIME_DUO, ServerConstants.MAXIMAL_TIME_DUO),
      dimension: Dimension.TWO_DIMENSION,
    };
  }

  private generateGameCard3D(formInfo: IFormInfo3D): GameCard {

    return {
      title: formInfo.gameName,
      originalImagePath: "",
      bestTimeSolo: this.generateBestTime(ServerConstants.MINIMAL_TIME_SOLO, ServerConstants.MAXIMAL_TIME_SOLO),
      bestTime1v1: this.generateBestTime(ServerConstants.MINIMAL_TIME_DUO, ServerConstants.MAXIMAL_TIME_DUO),
      dimension: Dimension.THREE_DIMENSION,
    };
  }

  private generateOriginalImagePath(imageName: string): string {

    return ServerConstants.ORIGINAL_IMAGE_FOLDER + imageName;
  }

  private generateDifferenceImagePath(imageName: string): string {

    return ServerConstants.DIFFERENCE_IMAGE_FOLDER + imageName;
  }

  private generateBestTime(minimalTime: number, maximalTime: number): { user: string, time: number }[] {
    const highScores: { user: string, time: number }[] = [];
    for (let i: number = 0; i < ServerConstants.NUMBER_HIGH_SCORE; i++) {
      const highScore: number = this.getRandomRange(minimalTime, maximalTime);
      const userID: number = this.getRandomRange(0, ServerConstants.MAXIMAL_USER_ID);
      highScores.push({
        user: `user${userID}`,
        time: highScore,
      });
      minimalTime = highScore;
    }

    return highScores;
  }

  private getRandomRange(min: number, max: number): number {
    return Math.floor(this.getRandomNumber() * (max - min) + min);
  }

  private getRandomNumber(): number {
    return Math.random();
  }
}
