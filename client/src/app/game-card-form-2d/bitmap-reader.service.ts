import { Injectable } from "@angular/core";
import { IBitmapImage } from "../../../../common/communication/BitmapImage";

const WIDTH_OFFSET: number = 18;
const HEIGHT_OFFSET: number = 22;
const BITS_PER_PIXEL_OFFSET: number = 28;
const PIXEL_OFFSET: number = 10;

@Injectable({
  providedIn: "root",
})
export class BitmapReaderService {

  public constructor() {/**/}

  public decodeBitmapFile(file: File): IBitmapImage {

    const bitmapImage: IBitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    bitmapImage.fileName = file.name;
    let bmpPixelsBuffer: ArrayBuffer = new ArrayBuffer(file.size);
    const fileReader: FileReader = new FileReader();

    fileReader.onload = () => {

      bmpPixelsBuffer = fileReader.result as ArrayBuffer;
      const dataView: DataView = new DataView(bmpPixelsBuffer);
      const pixelsPosition: number = dataView.getUint32(PIXEL_OFFSET, true);

      bitmapImage.width = dataView.getUint32(WIDTH_OFFSET, true);
      bitmapImage.height = dataView.getUint32(HEIGHT_OFFSET, true);
      bitmapImage.bitDepth = dataView.getUint32(BITS_PER_PIXEL_OFFSET, true);
      bitmapImage.pixels = Array.from(new Uint8Array(bmpPixelsBuffer, pixelsPosition));
    };

    fileReader.readAsArrayBuffer(file);

    return bitmapImage;
  }
}
