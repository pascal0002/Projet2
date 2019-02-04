import { Component, OnInit } from "@angular/core";
import {GameCard} from "../../../../common/communication/game-card";
import {TWO_DIMENSION_GAME_CARD_LIST} from "../../../../server/public/mock/2d-game-card-mock-list";
import {THREE_DIMENSION_GAME_CARD_LIST} from "../../../../server/public/mock/3d-game-card-mock-list";
import {FormValidator2dService} from "../game-card-form-2d/form-validator-2d.service";

@Component({
  selector: "app-administration-view",
  templateUrl: "./administration-view.component.html",
  styleUrls: [
              "./administration-view.component.css",
              "../list-of-games-view/list-of-games-view.component.css",
              "../list-of-games-view/list-of-games-view.component.css",
             ],
})
export class AdministrationViewComponent implements OnInit {

  public constructor(private formValidator2D: FormValidator2dService) {
    this.listes = [TWO_DIMENSION_GAME_CARD_LIST, THREE_DIMENSION_GAME_CARD_LIST];
  }

  public listes: GameCard[][];

  public openForm2D(): void {
    this.formValidator2D.openForm();
  }
  public ngOnInit(): void {/**/}
}
