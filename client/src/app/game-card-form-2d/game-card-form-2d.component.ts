import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { BitmapImage } from "../../../../common/communication/BitmapImage";
import { FormInfo } from "../../../../common/communication/FormInfo";
import { BitmapReaderService } from "./bitmap-reader.service";
import { FormValidator2dService } from "./form-validator-2d.service";
//import { Observable, of } from "rxjs";
//import { catchError } from "rxjs/operators";

const MIN_LENGTH_TITLE: number = 3;
const MAX_LENGTH_TITLE: number = 15;

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {
 // private readonly BASE_URL: string = "http://localhost:3000/api/saveImagePair";
  public title: string;
  public originalBitmap: BitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "" , pixels: []};
  public modifiedBitmap: BitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
  public form2DGroup: FormGroup;

  public constructor(private formValidatorService: FormValidator2dService, private bitmapReaderService: BitmapReaderService) { }

  public closeForm2D(): void {
    this.formValidatorService.closeForm();
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

  public decodeOriginalBitmap(): void {
    const inputElement: HTMLInputElement = document.getElementById("originalBMPInput") as HTMLInputElement;
    let file: File;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.originalBitmap = this.bitmapReaderService.decodeBitmapFile(file);
      }
    }
  }

  public decodeModifiedBitmap(): void {
    const inputElement: HTMLInputElement = document.getElementById("modifiedBMPInput") as HTMLInputElement;
    let file: File;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.modifiedBitmap = this.bitmapReaderService.decodeBitmapFile(file);
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
/*
  private handleError<T>(
        request: string,
        result?: T,
        ): (error:Error)=>
        Observable<T>{
          return (error: Error):
        Observable<T> =>{
          return of(result as T);
        };
  }*/

  public onSubmit(): void {
    // tslint:disable-next-line:no-console
    const gameCard: FormInfo = {gameName: this.title, originalImage: this.originalBitmap, modifiedImage: this.modifiedBitmap};
    
    //this.formValidatorService.onSubmit(this.originalBitmap, this.modifiedBitmap);
    this.formValidatorService.onSubmit(gameCard);
  }

}
