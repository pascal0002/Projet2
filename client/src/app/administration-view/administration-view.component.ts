import { Component } from "@angular/core";
import { GameCard } from "../../../../common/communication/game-card";
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

  public form2DIsHidden: boolean;
  public form3DIsHidden: boolean;
  public listes: GameCard[][];

  public constructor(private listOfGamesService: ListOfGamesService) {
    this.listes = this.listOfGamesService.listes;
    this.form2DIsHidden = true;
    this.form3DIsHidden = true;
  }

  public openForm2D(): void {
    this.form2DIsHidden = false;
  }

  public closeForm2D($event: boolean): void {
    this.form2DIsHidden = true;
  }

  public openForm3D(): void {
    this.form3DIsHidden = false;
  }

  public closeForm3D($event: boolean): void {
    this.form3DIsHidden = true;
  }
}
