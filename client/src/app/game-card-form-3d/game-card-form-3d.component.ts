import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { ClientConstants } from "../../../../common/communication/Constants";

@Component({
  selector: "app-game-card-form-3d",
  templateUrl: "./game-card-form-3d.component.html",
  styleUrls: ["../game-card-form-2d/game-card-form-2d.component.css", "./game-card-form-3d.component.css"],
})
export class GameCardForm3DComponent implements OnInit {

  public form3DGroup: FormGroup;
  public objectTypes: string[];

  public constructor() {
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
      numberOfObjets: new FormControl("", [
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

  public sendFormInfo(): void {
    console.log("Submit clicked.");
    console.log(this.form3DGroup.controls.cardName.value);
    console.log(this.form3DGroup.controls.optionMenu.value);

  }
}
