import { Component } from "@angular/core";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "../game-view/game-view.service";
import { DifferenceValidatorService } from "./difference-validator.service";

@Component({
  selector: "app-game-2d",
  templateUrl: "./game-2d.component.html",
  styleUrls: ["./game-2d.component.css"],
})
export class Game2DComponent {

  public gameCard: GameCard;

  public constructor(public gameViewService: GameViewService, private differenceValidatorService: DifferenceValidatorService) {
    this.gameCard = gameViewService.gamecard;
    this.differenceValidatorService.game2d = gameViewService.gamecard;
  }

}
