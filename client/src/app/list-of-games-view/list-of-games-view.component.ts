import { Component, Input } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { ListOfGamesService } from "./list-of-games.service";

@Component({
  selector: "app-list-of-games-view",
  templateUrl: "./list-of-games-view.component.html",
  styleUrls: ["./list-of-games-view.component.css"],
})

export class ListOfGamesViewComponent {

  @Input() public isInAdminView: boolean = false;
  public listes: GameCard[][];

  public constructor(public listOfGamesService: ListOfGamesService) {
    this.listes = this.listOfGamesService.listes;
  }

}
