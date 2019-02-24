import { Injectable } from "@angular/core";
import { IBitmapImage } from "../../../../common/communication/BitmapImage";
import { Constants } from "../../../../common/communication/Constants";

@Injectable({
  providedIn: "root",
})
export class BitmapReaderService {

  // Dylan nous as dit que ce n'était pas nécéssaire de tester cette fonction
  public decodeBitmapFile(file: File): IBitmapImage {

    const bitmapImage: IBitmapImage = { height: 0, width: 0, bitDepth: 0, fileName: "", pixels: [] };
    bitmapImage.fileName = file.name;
    let bmpPixelsBuffer: ArrayBuffer = new ArrayBuffer(file.size);
    const fileReader: FileReader = new FileReader();

    fileReader.onload = () => {
      bmpPixelsBuffer = fileReader.result as ArrayBuffer;
      const dataView: DataView = new DataView(bmpPixelsBuffer);
      const pixelsPosition: number = dataView.getUint32(Constants.PIXEL_OFFSET, true);

      bitmapImage.width = dataView.getUint32(Constants.WIDTH_OFFSET, true);
      bitmapImage.height = Math.abs(dataView.getInt32(Constants.HEIGHT_OFFSET, true));
      bitmapImage.bitDepth = dataView.getUint32(Constants.BITS_PER_PIXEL_OFFSET, true);
      bitmapImage.pixels = Array.from(new Uint8Array(bmpPixelsBuffer, pixelsPosition));
    };

    fileReader.readAsArrayBuffer(file);

    return bitmapImage;
  }
}
