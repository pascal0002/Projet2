import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IBitmapImage } from "../../../../common/communication/BitmapImage";
import { FormInfo } from "../../../../common/communication/FormInfo";
import { GameCard } from "../../../../common/communication/game-card";
import { BitmapDecoderService } from "./bitmap-decoder.service";
import { BitmapReaderService } from "./bitmap-reader.service";
import { FormValidator2dService } from "./form-validator-2d.service";

const MIN_LENGTH_TITLE: number = 3;
const MAX_LENGTH_TITLE: number = 15;

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {

  public form2DGroup: FormGroup;
  private formInfo: FormInfo = {
    gameName: "",
    originalImage: { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] },
    modifiedImage: { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] },
  };
  public isFilesWith7Differences: boolean = true;

  private readonly BASE_URL: string = "http://localhost:3000/";

  public constructor(private formValidatorService: FormValidator2dService, private bitmapReaderService: BitmapReaderService,
                     private http: HttpClient) { }

  public closeForm2D(): void {
    this.clearFormInfo();
    this.clearInputFields();
    this.formValidatorService.closeForm();
  }

  public ngOnInit(): void {
    this.form2DGroup = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(MIN_LENGTH_TITLE),
        Validators.maxLength(MAX_LENGTH_TITLE),
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
    this.generateGameCard(this.formInfo)
    .catch(
      (err) => {console.error("erreur :", err); },
    );
  }

  public async generateGameCard(formInfo: FormInfo): Promise<GameCard> {
    return new Promise<GameCard>(() => {
      this.http.post<GameCard>(`${this.BASE_URL}api/game_cards/image_pair`, formInfo)
      .toPromise()
      .then(
        (res) => { this.isFilesWith7Differences = true;
                   this.closeForm2D();
                 },
        (res) => { this.isFilesWith7Differences = false; },
      )
      .catch(
        (err) => {console.error("erreur :", err); },
      );
    });
  }

  public clearFormInfo(): void {
    this.formInfo.gameName = "";
    this.formInfo.originalImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    this.formInfo.modifiedImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
  }

  public clearInputFields(): void {
    const modifiedImageInput: HTMLInputElement = document.getElementById("modifiedBMPInput") as HTMLInputElement;
    const orignialImageInput: HTMLInputElement = document.getElementById("originalBMPInput") as HTMLInputElement;
    orignialImageInput.value = "";
    modifiedImageInput.value = "";
  }
}
