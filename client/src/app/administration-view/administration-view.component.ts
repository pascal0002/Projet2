import { Component } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { FormValidator2dService } from "../game-card-form-2d/form-validator-2d.service";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";

@Component({
  selector: "app-administration-view",
  templateUrl: "./administration-view.component.html",
  styleUrls: [
              "./administration-view.component.css",
              "../list-of-games-view/list-of-games-view.component.css",
              "../list-of-games-view/list-of-games-view.component.css",
             ],
})

export class AdministrationViewComponent {

  public listes: GameCard[][];

  public constructor(private formValidator2D: FormValidator2dService, private listOfGamesService: ListOfGamesService) {
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

  public openForm2D(): void {
    this.formValidator2D.openForm();
  }
}
