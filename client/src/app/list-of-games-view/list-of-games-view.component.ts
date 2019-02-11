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
    this.listes = this.listOfGamesService.listes;
  }

  public getBestTimeSolo(gameCard: GameCard, position: number): string {
    const user: string = gameCard.bestTimeSolo[position][0];
    const time: number = gameCard.bestTimeSolo[position][1];

    return `${user} : ${this.convertTimeToMSSFormat(time)}`;
  }

  public getBestTime1v1(gameCard: GameCard, position: number): string {
    const user: string = gameCard.bestTime1v1[position][0];
    const time: number = gameCard.bestTime1v1[position][1];

    return `${user} : ${this.convertTimeToMSSFormat(time)}`;
  }

  private convertTimeToMSSFormat(time: number): string {
    const seconde: number = time % ClientConstants.SECOND_PER_MINUTE;
    const minute: number = (time - seconde) / ClientConstants.SECOND_PER_MINUTE;

    return `${minute}:${this.totwoDigitString(seconde)}`;
  }

  private totwoDigitString(initialNumber: number): string {
    return ("0" + initialNumber).slice(ClientConstants.TWO_DIGIT);
  }

}
