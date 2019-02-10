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

  public constructor(private listOfGamesService: ListOfGamesService) {
    this.listes = [[], []];
    this.getGamesLists();
  }

  private getGamesLists(): void {
    this.getGamesList2D();
    this.getGamesList3D();
  }

  private getGamesList2D(): void {
    this.listOfGamesService.getGamesLists2D()
    .subscribe(
      (gameCards) => { this.listes[ClientConstants.LIST_2D] = gameCards; },
      (err) => {console.error("erreur :", err); },
    );
  }

  private getGamesList3D(): void {
    this.listOfGamesService.getGamesLists3D()
    .subscribe(
      (gameCards) => { this.listes[ClientConstants.LIST_3D] = gameCards; },
      (err) => {console.error("erreur :", err); },
    );
  }
}
