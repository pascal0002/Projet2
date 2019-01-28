import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { BitmapImage } from "../../../../common/BitmapImage";
import { BitmapDecoderService } from "./bitmap-decoder.service";
import { FormValidator2dService } from "./form-validator-2d.service";

const MIN_LENGTH_TITLE: number = 3;
const MAX_LENGTH_TITLE: number = 15;

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {
  public title: string;
  public originalBitmap: BitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "" };
  public modifiedBitmap: BitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "" };
  public form2DGroup: FormGroup;

  public constructor(private formValidatorService: FormValidator2dService, private bitmapDecoderService: BitmapDecoderService) { }

  public closeForm2D(): void {
    this.formValidatorService.closeForm();
  }

  public addGameCard2D(): void {
    this.formValidatorService.addGameCard();
  }

  public ngOnInit(): void {
    this.form2DGroup = new FormGroup({
      title: new FormControl(this.title, [
        Validators.required,
        Validators.minLength(MIN_LENGTH_TITLE),
        Validators.maxLength(MAX_LENGTH_TITLE),
      ]),
      originalFileInput: new FormControl("", []),
      modifiedFileInput: new FormControl("", []),
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  public decodeOriginalBitmap(): void {
    const inputElement: HTMLInputElement = document.getElementById("originalBMPInput") as HTMLInputElement;
    let file: File;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.originalBitmap = this.bitmapDecoderService.decodeBitmapFile(file);
      }
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  public decodeModifiedBitmap(): void {
    const inputElement: HTMLInputElement = document.getElementById("modifiedBMPInput") as HTMLInputElement;
    let file: File;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.modifiedBitmap = this.bitmapDecoderService.decodeBitmapFile(file);
      }
    }
  }

  public get titleName(): AbstractControl | null {
    return this.form2DGroup.get("title");
  }

  public get fileInput(): AbstractControl | null {
    return this.form2DGroup.get("fileInput");
  }

  public get originalFileInput(): AbstractControl | null {
    return this.form2DGroup.get("originalFileInput");
  }

  public get modifiedFileInput(): AbstractControl | null {
    return this.form2DGroup.get("modifiedFileInput");
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
    return this.formValidatorService.validTitle(this.title);
  }

  public onSubmit(): void {
    //
  }
}
