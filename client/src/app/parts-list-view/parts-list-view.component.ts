import { Component, Input, OnInit } from "@angular/core";
import {GameCard} from "../../../../common/communication/game-card";
import {TWO_DIMENSION_GAME_CARD_LIST} from "../../../../server/public/mock/2d-game-card-mock-list";
import {THREE_DIMENSION_GAME_CARD_LIST} from "../../../../server/public/mock/3d-game-card-mock-list";

@Component({
  selector: "app-parts-list-view",
  templateUrl: "./parts-list-view.component.html",
  styleUrls: ["./parts-list-view.component.css"],
})

export class PartsListViewComponent implements OnInit {

  @Input() public isInAdminView: boolean = false;
  public listes: GameCard[][] = [TWO_DIMENSION_GAME_CARD_LIST, THREE_DIMENSION_GAME_CARD_LIST];

  public constructor(/**/) {
    /**/
  }

  public ngOnInit(): void {
    /**/
  }
}
