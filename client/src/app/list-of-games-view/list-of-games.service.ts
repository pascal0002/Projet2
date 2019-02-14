import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class ListOfGamesService {

  public listes: GameCard[][];

  public constructor(private http: HttpClient) {
    this.listes = [[], []];
    this.getGamesLists();
  }

  private getGamesLists(): void {
    this.getGamesLists2D();
    this.getGamesLists3D();
  }

  private getGamesLists2D(): void {
    this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/2D_cards`)
    .subscribe(
      (gameCards) => { this.listes[ClientConstants.LIST_2D] = gameCards; },
      (err) => {console.error("erreur :", err); },
    );
  }

  private getGamesLists3D(): void {
    this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/3D_cards`)
    .subscribe(
      (gameCards) => { this.listes[ClientConstants.LIST_3D] = gameCards; },
      (err) => {console.error("erreur :", err); },
    );
  }

  public addGameCard2D(gamecard: GameCard): void {
    this.listes[ClientConstants.LIST_2D].push(gamecard);
  }

  public addGameCard3D(gamecard: GameCard): void {
    this.listes[ClientConstants.LIST_3D].push(gamecard);
  }

  public getBestTimeSolo(gameCard: GameCard, position: number): string {
    const user: string = gameCard.bestTimeSolo[position].user;
    const time: number = gameCard.bestTimeSolo[position].time;

    return `${user} : ${this.convertTimeToMSSFormat(time)}`;
  }

  public getBestTime1v1(gameCard: GameCard, position: number): string {
    const user: string = gameCard.bestTime1v1[position].user;
    const time: number = gameCard.bestTime1v1[position].time;

    return `${user} : ${this.convertTimeToMSSFormat(time)}`;
  }

  private convertTimeToMSSFormat(time: number): string {
    const seconde: number = time % ClientConstants.SECOND_PER_MINUTE;
    const minute: number = (time - seconde) / ClientConstants.SECOND_PER_MINUTE;

    return `${minute}:${this.totwoDigitString(seconde)}`;
  }

  private totwoDigitString(initialNumber: number): string {
    return ("0" + initialNumber).slice(ClientConstants.TWO_DIGIT);
  }
}
