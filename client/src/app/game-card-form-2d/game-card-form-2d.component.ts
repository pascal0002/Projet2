import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo2D } from "../../../../common/communication/FormInfo2D";
import { ListOfGamesService } from "../list-of-games-view/list-of-games.service";
import { BitmapReaderService } from "./bitmap-reader.service";
import { FormValidator2dService } from "./form-validator-2d.service";
@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardForm2DComponent implements OnInit {
  @Output() public form2DClosedEvent: EventEmitter<boolean> = new EventEmitter();

  public form2DGroup: FormGroup;
  private formInfo: IFormInfo2D;
  public error: String;

  public constructor(private formValidatorService: FormValidator2dService,
                     private bitmapReaderService: BitmapReaderService,
                     private listOfGameService: ListOfGamesService) {
    this.formInfo = {
      gameName: "",
      originalImage: { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] },
      modifiedImage: { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] },
    };
    this.error = "";
  }

  public closeForm2D(): void {
    this.hideForm2D();
    this.form2DGroup.reset();
    this.clearFormInfo();
  }

  private hideForm2D(): void {
    this.form2DClosedEvent.emit(true);
  }

  public ngOnInit(): void {
    this.form2DGroup = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(Constants.MIN_TITLE_LENGTH),
        Validators.maxLength(Constants.MAX_TITLE_LENGTH),
      ]),
      originalFileInput: new FormControl("", []),
      modifiedFileInput: new FormControl("", []),
    });
  }

  public readOriginalBitmap($event: Event): void {
    let originalInput: HTMLInputElement;
    let file: File;
    if ($event.target) {
      originalInput = $event.target as HTMLInputElement;
      if (originalInput.files) {
        file = originalInput.files[0];
        this.formInfo.originalImage = this.bitmapReaderService.decodeBitmapFile(file);
      }
    }
  }

  public readModifiedBitmap($event: Event): void {

    let modifiedInput: HTMLInputElement;
    let file: File;
    if ($event.target) {
      modifiedInput = $event.target as HTMLInputElement;
      if (modifiedInput.files) {
        file = modifiedInput.files[0];
        this.formInfo.modifiedImage = this.bitmapReaderService.decodeBitmapFile(file);
      }
    }
  }

  private validImageDimensions(height: number, width: number): boolean {
    return this.formValidatorService.validImageDimensions(height, width);
  }

  private validBitDepth(bitDepth: number): boolean {
    return this.formValidatorService.validBitDepth(bitDepth);
  }

  private validBMPExtension(extension: string): boolean {
    return this.formValidatorService.validBMPExtension(extension);
  }

  private validTitle(): boolean {
    return this.formValidatorService.validTitle(this.formInfo.gameName);
  }

  public onSubmit(): void {
    this.formValidatorService.generateGameCard(this.formInfo)
      .then(
        (gamecard) => {
          this.listOfGameService.addGameCard2D(gamecard);
          this.closeForm2D();
        },
      )
      .catch(
        (err) => { this.error = err.error; },
      );
  }

  public updateGameName(): void {
    this.formInfo.gameName = this.form2DGroup.controls.title.value;
  }

  private clearFormInfo(): void {
    this.formInfo.gameName = "";
    this.formInfo.originalImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    this.formInfo.modifiedImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    this.error = "";
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
