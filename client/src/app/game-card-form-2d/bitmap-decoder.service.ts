import { Injectable } from "@angular/core";
import { BitmapImage } from "../../../../common/communication/BitmapImage";

const WIDTH_OFFSET: number = 18;
const HEIGHT_OFFSET: number = 22;
const BITS_PER_PIXEL_OFFSET: number = 28;
//const PIXEL_OFFSET: number = 10;

@Injectable()
export class BitmapDecoderService {

  public decodeBitmapFile(file: File): BitmapImage {
    
    const bitmapImage: BitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    bitmapImage.fileName = file.name;
    let bmpPixelsBuffer: ArrayBuffer = new ArrayBuffer(file.size);
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {

      bmpPixelsBuffer = fileReader.result as ArrayBuffer;
      const dataView: DataView = new DataView(bmpPixelsBuffer);

      bitmapImage.width = dataView.getUint32(WIDTH_OFFSET, true);
      bitmapImage.height = dataView.getUint32(HEIGHT_OFFSET, true);
      bitmapImage.bitDepth = dataView.getUint32(BITS_PER_PIXEL_OFFSET, true);

    };
    fileReader.readAsArrayBuffer(file);
    return bitmapImage;
  }
}
