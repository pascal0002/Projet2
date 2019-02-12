import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { ClientConstants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { GameCard } from "../../../../common/communication/game-card";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";

@Injectable({
  providedIn: "root",
})
export class FormHandler3DService {

  public constructor(private http: HttpClient, private listOfGameService: ListOfGamesService) { /**/}

  public getValidatorFunction(): ValidatorFn {
    return (formGroup: FormGroup) => {
      let checked: number = 0;

      Object.keys(formGroup.controls).forEach((key) => {
        const control: AbstractControl = formGroup.controls[key];

        if (control.value === true) {
          checked++;
        }
      });

      if (checked < ClientConstants.MIN_NUMBER_OF_CHECKED_CHECKBOXES) {
        return {
          requireCheckboxesToBeChecked: true,
        };
      }

      return null;
    };
  }

  public async send3DFormInfo(formInfo: IFormInfo3D): Promise<GameCard> {
    return new Promise<GameCard>(() => {
      this.http.post<GameCard>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/info_3D_game`, formInfo)
      .toPromise()
      .then(
        (gamecard) => { this.listOfGameService.addGameCard3D(gamecard); },
        (gameCard) => { alert(gameCard.error); },
      )
      .catch(
        (err) => {console.error("erreur :", err); },
      );
    });
  }

}
