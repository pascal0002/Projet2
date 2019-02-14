import { Component, Input } from "@angular/core";
import { Mode } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "../game-view/game-view.service";
import { ListOfGamesService } from "./list-of-games.service";

@Component({
  selector: "app-list-of-games-view",
  templateUrl: "./list-of-games-view.component.html",
  styleUrls: ["./list-of-games-view.component.css"],
})

export class ListOfGamesViewComponent {

  @Input() public isInAdminView: boolean = false;
  public listes: GameCard[][];

  public constructor(public listOfGamesService: ListOfGamesService, public gameViewService: GameViewService) {
    this.listes = this.listOfGamesService.listes;
  }

  public playSolo(gameCard: GameCard): void {
    console.log("allo");
    this.gameViewService.gamecard = gameCard;
    this.gameViewService.mode = Mode.SOLO;
  }

  public play1v1(gameCard: GameCard): void {
    this.gameViewService.gamecard = gameCard;
    this.gameViewService.mode = Mode.ONE_VS_ONE;
  }
}
