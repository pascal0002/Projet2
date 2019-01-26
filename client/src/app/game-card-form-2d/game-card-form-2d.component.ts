import { Component, OnInit } from "@angular/core";
import { FormHandler2dService } from "./form-handler-2d.service";
import { BitmapImage } from "./BitmapImage";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BitmapDecoderService } from "./bitmap-decoder.service";

@Component({
  selector: "app-game-card-form-2d",
  templateUrl: "./game-card-form-2d.component.html",
  styleUrls: ["./game-card-form-2d.component.css"],
})
export class GameCardFormComponent implements OnInit {
  public title: String;
  public originalBitmap: BitmapImage = new BitmapImage();
  public modifiedBitmap: BitmapImage = new BitmapImage();
  public form2DGroup: FormGroup;

  public constructor(private formHandlerService: FormHandler2dService, private bitmapDecoderService: BitmapDecoderService) { }

  public closeForm2D() {
    this.formHandlerService.closeForm();
  }

  public ngOnInit() {
    this.form2DGroup = new FormGroup({
      title: new FormControl(this.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      originalFileInput: new FormControl("",[]),
      modifiedFileInput: new FormControl("",[]),
    });
  }

  

  public decodeOriginalBitmap() {
    // Faire: decodeOriginalImg(){ get element by id and pass it to decoder}
    let inputElement = document.getElementById("originalBMPInput") as HTMLInputElement;
    let file;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.originalBitmap = this.bitmapDecoderService.decodeBitmapFile(file);
      }
    }
  }

  public decodeModifiedBitmap() {
    // Faire: decodeOriginalImg(){ get element by id and pass it to decoder}
    let inputElement = document.getElementById("modifiedBMPInput") as HTMLInputElement;
    let file;

    if (inputElement.files) {
      file = inputElement.files[0];
      if (file) {
        this.modifiedBitmap = this.bitmapDecoderService.decodeBitmapFile(file);
      }
    }
  }

  get titleName() {
    return this.form2DGroup.get("title");
  }

  get fileInput(){
    return this.form2DGroup.get("fileInput");
  }

  get originalFileInput(){
    return this.form2DGroup.get("originalFileInput");
  }

  get modifiedFileInput(){
    return this.form2DGroup.get("modifiedFileInput");
  }

  public validImageDimensions(height : number, width : number) : boolean{
    return (height === 561 && width === 400);
  }

  public validBitDepth(bitDepth : number): boolean{
    return (bitDepth === 24);
  }

  public validBMPExtension(extension : string) : boolean {
    return (extension.split(".").pop() === "bmp");
  }

  public onSubmit():boolean {
    return (
true
           
           );
  }



}
