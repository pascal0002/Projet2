import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class ListOfGamesService {

  public constructor(private http: HttpClient) { }

  public getGamesLists2D(): Observable<GameCard[]> {
    return this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/2D_cards`);
  }

  public getGamesLists3D(): Observable<GameCard[]> {
    return this.http.get<GameCard[]>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/3D_cards`);
  }
}
