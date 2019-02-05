import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { ClientConstants } from "../../../../common/communication/Constants";

@Component({
  selector: "app-game-card-form-3d",
  templateUrl: "./game-card-form-3d.component.html",
  styleUrls: ["../game-card-form-2d/game-card-form-2d.component.css", "./game-card-form-3d.component.css"],
})
export class GameCardForm3DComponent implements OnInit {

  public form3DGroup: FormGroup;

  public constructor() {/**/ }

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
        Validators.max(200),
        Validators.min(10),
      ]),
     

    });

    /*this.form2DGroup = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(ClientConstants.MIN_TITLE_LENGTH),
        Validators.maxLength(ClientConstants.MAX_TITLE_LENGTH),
      ]),
      originalFileInput: new FormControl("", []),
      modifiedFileInput: new FormControl("", []),
    }); */
   }

  public sendFormInfo(): void {
    console.log("Submit clicked.");
    console.log(this.form3DGroup.controls.cardName.value);
    console.log(this.form3DGroup.controls.optionMenu.value);
    console.log(this.form3DGroup.controls.radio1.value);
    console.log(this.form3DGroup.controls.radio2.value);
    console.log(this.form3DGroup.controls.radio3.value);

  }
}
