import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class ListOfGamesService {

  public constructor(private http: HttpClient) { }

  public async getGamesLists2D(): Promise<GameCard[]> {
    return new Promise<GameCard[]>((resolve: Function) => {
      resolve(this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/2D_cards`)
        .toPromise()
        .then((gameCard) => {
          return gameCard;
        })
        .catch(
          (err) => {console.error("erreur :", err); },
        ));
    });
  }

  public async getGamesLists3D(): Promise<GameCard[]> {
    return new Promise<GameCard[]>((resolve: Function) => {
      resolve(this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/3D_cards`)
        .toPromise()
        .then((gameCard) => {
          return gameCard;
        })
        .catch(
          (err) => {console.error("erreur :", err); },
        ));
    });
  }
}
