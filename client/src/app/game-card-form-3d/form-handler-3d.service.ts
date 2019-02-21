import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";
import { SceneService } from "../scene-constructor/scene.service";

@Injectable({
  providedIn: "root",
})
export class FormHandler3DService {

  public constructor(private http: HttpClient, private listOfGameService: ListOfGamesService,
                     private sceneService: SceneService) { }

  public getValidatorFunction(): ValidatorFn {
    return (formGroup: FormGroup) => {
      let checked: number = 0;

      Object.keys(formGroup.controls).forEach((key) => {
        const control: AbstractControl = formGroup.controls[key];

        if (control.value) {
          checked++;
        }
      });

      if (checked < Constants.MIN_NUMBER_OF_CHECKED_CHECKBOXES) {
        return {
          requireCheckboxesToBeChecked: true,
        };
      }

      return null;
    };
  }

  public async send3DFormInfo(formInfo: IFormInfo3D): Promise<boolean> {
    return this.http.post<boolean>(`${Constants.SERVER_BASE_URL}api/game_cards/info_3D_game`, formInfo).toPromise();
  }

  public createObjects(formInfo: IFormInfo3D): void {
    this.sceneService.createObjects(formInfo)
      .then((objects) => {
        this.sceneService.generateObjects(objects, formInfo.gameName)
          .then(
            (gamecard) => { this.listOfGameService.addGameCard3D(gamecard); },
            (gameCard) => { alert(gameCard.error); },
          )
          .catch((error: Error) => { console.error(error.message); });
      })
      .catch((error: Error) => { console.error(error.message); });
  }

}
