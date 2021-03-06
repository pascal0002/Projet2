import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators, ValidatorFn } from "@angular/forms";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { FormHandler3DService } from "./form-handler-3d.service";

@Component({
  selector: "app-game-card-form-3d",
  templateUrl: "./game-card-form-3d.component.html",
  styleUrls: ["../game-card-form-2d/game-card-form-2d.component.css", "./game-card-form-3d.component.css"],
})
export class GameCardForm3DComponent implements OnInit {

  public form3DGroup: FormGroup;
  public objectTypes: string[];
  public error: string;
  @Output() public form3DClosedEvent: EventEmitter<boolean> = new EventEmitter();

  public constructor(private formHandler3DService: FormHandler3DService) {
    this.objectTypes = Constants.OBJECT_TYPES;
    this.error = "";
  }

  public ngOnInit(): void {
    this.form3DGroup = new FormGroup({
      cardName: new FormControl("", [
        Validators.required,
        Validators.minLength(Constants.MIN_TITLE_LENGTH),
        Validators.maxLength(Constants.MAX_TITLE_LENGTH),
      ]),
      optionMenu: new FormControl("", [
        Validators.required,
      ]),
      numberOfObjects: new FormControl("", [
        Validators.required,
        Validators.max(Constants.MAX_NUMBER_OF_OBJECTS),
        Validators.min(Constants.MIN_NUMBER_OF_OBJECTS),
      ]),
      checkBoxGroup: new FormGroup({
        addCheckBox: new FormControl(false),
        deleteCheckBox: new FormControl(false),
        modifyCheckBox: new FormControl(false),
      },                           this.requireCheckboxesToBeCheckedValidator()),

    });
  }

  private requireCheckboxesToBeCheckedValidator(): ValidatorFn {
    return this.formHandler3DService.getValidatorFunction();
  }

  private get3DFormInfo(): IFormInfo3D {

    return {
      gameName: this.form3DGroup.controls.cardName.value,
      objectType: this.form3DGroup.controls.optionMenu.value,
      numberOfObjects: this.form3DGroup.controls.numberOfObjects.value,
      addObjects: (this.form3DGroup.controls.checkBoxGroup.value.addCheckBox) ? true : false,
      deleteObjects: (this.form3DGroup.controls.checkBoxGroup.value.deleteCheckBox) ? true : false,
      modifyObjects: (this.form3DGroup.controls.checkBoxGroup.value.modifyCheckBox) ? true : false,
    };
  }

  public submit(): void {
    const formInfo: IFormInfo3D = this.get3DFormInfo();
    this.closeForm();
    this.formHandler3DService.send3DFormInfo(formInfo)
      .then(
        (isOk) => { if (isOk) { this.formHandler3DService.createObjects(formInfo); } },
      )
      .catch(
        (err) => { this.error = err.error; },
      );
  }

  private resetInputValues(): void {
    this.form3DGroup.reset();
    this.error = "";
  }

  private closeForm(): void {
    this.resetInputValues();
    this.form3DClosedEvent.emit(true);
  }
}
