import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClientConstants } from "../../../../common/communication/Constants";
import { IFormInfo } from "../../../../common/communication/FormInfo";
import { BitmapReaderService } from "./bitmap-reader.service";
import { FormValidator2dService } from "./form-validator-2d.service";

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {

  public form2DGroup: FormGroup;
  private formInfo: IFormInfo;

  public constructor(private formValidatorService: FormValidator2dService,
                     private bitmapReaderService: BitmapReaderService) {
    this.formInfo = {
      gameName: "",
      originalImage: { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] },
      modifiedImage: { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] },
    };
  }

  public closeForm2D(): void {
    this.formValidatorService.closeForm2D();
    this.form2DGroup.reset();
  }

  public ngOnInit(): void {
    this.form2DGroup = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(ClientConstants.MIN_TITLE_LENGTH),
        Validators.maxLength(ClientConstants.MAX_TITLE_LENGTH),
      ]),
      originalFileInput: new FormControl("", []),
      modifiedFileInput: new FormControl("", []),
    });
  }

  public readOriginalBitmap(): void {
    const inputElement: HTMLInputElement = document.getElementById("originalBMPInput") as HTMLInputElement;
    let file: File;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.formInfo.originalImage = this.bitmapReaderService.decodeBitmapFile(file);
      }
    }
  }

  public readModifiedBitmap(): void {
    const inputElement: HTMLInputElement = document.getElementById("modifiedBMPInput") as HTMLInputElement;
    let file: File;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.formInfo.modifiedImage = this.bitmapReaderService.decodeBitmapFile(file);
      }
    }
  }

  public validImageDimensions(height: number, width: number): boolean {
    return this.formValidatorService.validImageDimensions(height, width);
  }

  public validBitDepth(bitDepth: number): boolean {
    return this.formValidatorService.validBitDepth(bitDepth);
  }

  public validBMPExtension(extension: string): boolean {
    return this.formValidatorService.validBMPExtension(extension);
  }

  public validTitle(): boolean {
    return this.formValidatorService.validTitle(this.formInfo.gameName);
  }

  public onSubmit(): void {
    this.formValidatorService.generateGameCard(this.formInfo)
      .catch(
        (err) => { console.error("erreur :", err); },
      );
  }

  public updateGameName(): void {
    const gameNameInput: HTMLInputElement = document.getElementById("gameName") as HTMLInputElement;
    this.formInfo.gameName = gameNameInput.value;
  }

  public clearFormInfo(): void {
    this.formInfo.gameName = "";
    this.formInfo.originalImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    this.formInfo.modifiedImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
  }

  public canSubmit(): boolean {

    return (
      this.validBMPExtension(this.formInfo.originalImage.fileName) &&
      this.validBMPExtension(this.formInfo.modifiedImage.fileName) &&
      this.validBitDepth(this.formInfo.originalImage.bitDepth) &&
      this.validBitDepth(this.formInfo.modifiedImage.bitDepth) &&
      this.validImageDimensions(this.formInfo.originalImage.height, this.formInfo.originalImage.width) &&
      this.validImageDimensions(this.formInfo.modifiedImage.height, this.formInfo.modifiedImage.width) &&
      this.validTitle()
    );
  }

  public isAValidOriginalImage(): boolean {
    return (
      this.validBMPExtension(this.formInfo.originalImage.fileName) &&
      this.validBitDepth(this.formInfo.originalImage.bitDepth) &&
      this.validImageDimensions(this.formInfo.originalImage.height, this.formInfo.originalImage.width)
    );
  }

  public isAValidModifiedImage(): boolean {
    return (
      this.validBMPExtension(this.formInfo.modifiedImage.fileName) &&
      this.validBitDepth(this.formInfo.modifiedImage.bitDepth) &&
      this.validImageDimensions(this.formInfo.modifiedImage.height, this.formInfo.modifiedImage.width)
    );
  }
}
