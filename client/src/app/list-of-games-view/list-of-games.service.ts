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

  public getGamesLists2D(): void {
    this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/2D_cards`)
    .subscribe(
      (gameCards) => { this.listes[ClientConstants.LIST_2D] = gameCards; },
      (err) => {console.error("erreur :", err); },
    );
  }

  public getGamesLists3D(): void {
    this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/3D_cards`)
    .subscribe(
      (gameCards) => { this.listes[ClientConstants.LIST_3D] = gameCards; },
      (err) => {console.error("erreur :", err); },
    );
  }

  private getGamesLists(): void {
    this.getGamesLists2D();
    this.getGamesLists3D();
  }

  public addGameCard2D(gamecard: GameCard): void {
    this.listes[ClientConstants.LIST_2D].push(gamecard);
  }
}
