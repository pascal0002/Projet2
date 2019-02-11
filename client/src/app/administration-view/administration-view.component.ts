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

  public listes: GameCard[][];

  public constructor(private listOfGamesService: ListOfGamesService) {
    this.listes = this.listOfGamesService.listes;
  }

  public openForm2D(): void {
    const form2D: HTMLElement | null = document.getElementById("formWindow2D");
    const pageMask: HTMLElement | null = document.getElementById("pageMask");

    if (form2D && pageMask) {
      form2D.style.display = "block";
      pageMask.style.display = "block";
    }
  }

  public openForm3D(): void {
    const form3D: HTMLElement | null = document.getElementById("formWindow3D");
    const pageMask: HTMLElement | null = document.getElementById("pageMask");

    if (form3D && pageMask) {
      form3D.style.display = "block";
      pageMask.style.display = "block";
    }
  }
}
