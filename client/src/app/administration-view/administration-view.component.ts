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
    this.listes = listOfGamesService.listes;
  }

  public openForm2D(): void {
    this.formValidator2D.openForm();
  }
}
