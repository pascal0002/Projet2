import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { ClientConstants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";

@Injectable({
  providedIn: "root",
})
export class FormHandler3DService {

  public constructor(private http: HttpClient) { /**/}

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

  public send3DFormInfo(formInfo: IFormInfo3D): Promise<IFormInfo3D> {
    return new Promise<IFormInfo3D>((resolve: Function) => {
      resolve(this.http.post<IFormInfo3D>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/info_3D_game`, formInfo).toPromise());
    });
  }

}
