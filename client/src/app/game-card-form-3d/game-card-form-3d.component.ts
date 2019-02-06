import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { ClientConstants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";

@Component({
  selector: "app-game-card-form-3d",
  templateUrl: "./game-card-form-3d.component.html",
  styleUrls: ["../game-card-form-2d/game-card-form-2d.component.css", "./game-card-form-3d.component.css"],
})
export class GameCardForm3DComponent implements OnInit {

  public form3DGroup: FormGroup;
  public objectTypes: string[];

  public constructor(private http: HttpClient) {
    this.objectTypes = ClientConstants.OBJECT_TYPES;
  }

  public ngOnInit(): void {
    this.form3DGroup = new FormGroup({
      cardName: new FormControl("", [
        Validators.required,
        Validators.minLength(ClientConstants.MIN_TITLE_LENGTH),
        Validators.maxLength(ClientConstants.MAX_TITLE_LENGTH),
      ]),
      optionMenu: new FormControl("", [
        Validators.required,
      ]),
      numberOfObjects: new FormControl("", [
        Validators.required,
        Validators.max(ClientConstants.MAX_NUMBER_OF_OBJECTS),
        Validators.min(ClientConstants.MIN_NUMBER_OF_OBJECTS),
      ]),
      checkBoxGroup: new FormGroup({
        addCheckBox: new FormControl(false),
        deleteCheckBox: new FormControl(false),
        modifyCheckBox: new FormControl(false),
      },                           this.requireCheckboxesToBeCheckedValidator()),

    });
  }

  public requireCheckboxesToBeCheckedValidator(minChecked: number = 1): ValidatorFn {
    return (formGroup: FormGroup) => {
      let checked: number = 0;

      Object.keys(formGroup.controls).forEach((key) => {
        const control: AbstractControl = formGroup.controls[key];

        if (control.value === true) {
          checked++;
        }
      });

      if (checked < minChecked) {
        return {
          requireCheckboxesToBeChecked: true,
        };
      }

      return null;
    };
  }

  public get3DFormInfo(): IFormInfo3D {

    return {
      gameName: this.form3DGroup.controls.cardName.value,
      objectType: this.form3DGroup.controls.optionMenu.value,
      numberOfObjects: this.form3DGroup.controls.numberOfObjects.value,
      addObjects: this.form3DGroup.controls.checkBoxGroup.value.addCheckBox,
      deleteObjects: this.form3DGroup.controls.checkBoxGroup.value.deleteCheckBox,
      modifyObjects: this.form3DGroup.controls.checkBoxGroup.value.modifyCheckBox,
    };
  }

  public async sendFormInfo(): Promise<IFormInfo3D> {

    const FORM_INFO: IFormInfo3D = this.get3DFormInfo();

    this.closeForm();

    return new Promise<IFormInfo3D>(() => {
      this.http.post<IFormInfo3D>(`${ClientConstants.SERVER_BASE_URL}api/game_cards/info_3D_game`, FORM_INFO).toPromise();
    });
  }

  public resetInputValues(): void {
    this.form3DGroup.reset();
  }

  public closeForm(): void {
    this.resetInputValues();

    const form3D: HTMLElement | null = document.getElementById("formWindow3D");
    const pageMask: HTMLElement | null = document.getElementById("pageMask");

    if (form3D && pageMask) {
      form3D.style.display = "none";
      pageMask.style.display = "none";
    }
  }
}
