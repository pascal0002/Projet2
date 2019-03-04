import { Component, Input } from "@angular/core";
import swal from "sweetalert";
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
    this.gameViewService.model.gamecard = gameCard;
    this.gameViewService.model.mode = Mode.SOLO;
  }

  public play1v1(gameCard: GameCard): void {
    this.gameViewService.model.gamecard = gameCard;
    this.gameViewService.model.mode = Mode.ONE_VS_ONE;
  }

  public delete(gameCard: GameCard): void {
    swal({
      closeOnClickOutside: false,
      text: "Vouler vous vraiment supprimer ce jeu ?",
      buttons: ["Annuler", "Supprimer le jeu!"],
    })
    .then((confirm: boolean) => {if (confirm) {this.listOfGamesService.delete(gameCard); }})
    .catch((err: Error) => console.error(err));
  }
}
