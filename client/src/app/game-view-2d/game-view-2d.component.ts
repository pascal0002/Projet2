import { Component, OnInit } from "@angular/core";
import {GameCard} from "../../../../common/communication/game-card";
import {TWO_DIMENSION_GAME_CARD_LIST} from "../../../../server/public/mock/2d-game-card-mock-list";

@Component({
  selector: "app-game-view-2d",
  templateUrl: "./game-view-2d.component.html",
  styleUrls: ["./game-view-2d.component.css"],
})

export class GameView2DComponent implements OnInit {

  public game2d: GameCard;

  public constructor() {
    this.game2d = TWO_DIMENSION_GAME_CARD_LIST[0];
  }

  public ngOnInit(): void {
    /* */
  }

}
