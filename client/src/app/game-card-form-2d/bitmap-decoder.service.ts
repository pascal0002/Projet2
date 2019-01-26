import { Injectable } from '@angular/core';
import { BitmapImage } from "./BitmapImage";
@Injectable({
  providedIn: 'root'
})
export class BitmapDecoderService {
  constructor() { }

  decodeBitmapFile(file: File): BitmapImage {
    console.log("is in the decoder");
    let bitmapImage = new BitmapImage();
    bitmapImage.fileName = file.name;
    let BMPpixelsBuffer = new ArrayBuffer(file.size);
    let fileReader = new FileReader();
    fileReader.onload = function (e) {
      console.log("is in onload");
      BMPpixelsBuffer = fileReader.result as ArrayBuffer;
      let dataView = new DataView(BMPpixelsBuffer);

      bitmapImage.width = dataView.getUint32(18, true);
      bitmapImage.height = dataView.getUint32(22, true);
      bitmapImage.bitDepth = dataView.getUint32(28, true);

    }
    fileReader.readAsArrayBuffer(file);

    return bitmapImage;
  }
  test(){
    alert("fuck ce projet");
  }
}
