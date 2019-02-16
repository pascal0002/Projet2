import { Injectable } from "@angular/core";
import { Mode } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class GameViewService {

  public gamecard: GameCard;
  public mode: Mode;

  public constructor() {  }
}
