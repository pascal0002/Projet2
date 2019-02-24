import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { IImageLocation } from "../../../../common/communication/ImageLocation";

@Injectable({
  providedIn: "root",
})

export class ImageDisplayerService {
  public originalImagePixels: number[];
  public modifiedImagePixels: number[];

  public constructor(private http: HttpClient) {
  }

  public async getImagePixels(imageLocation: string): Promise<number[]> {
    const imgLocation: IImageLocation = { location: imageLocation };

    return new Promise<number[]>((resolve: Function, res: Function) =>
      resolve(this.http.post<number[]>(Constants.SERVER_BASE_URL + Constants.API + Constants.IMAGEPIXEL_URL, imgLocation).toPromise()));
  }

  public drawPixelsInCanvas(ctx: CanvasRenderingContext2D, pixels: number[]): void {
    const imageData: ImageData = new ImageData(Constants.VALID_BMP_WIDTH, Constants.VALID_BMP_HEIGHT);
    let canvasIndex: number = 0;

    for (let imageIndex: number = 0; imageIndex < pixels.length;
      imageIndex += Constants.NEXT_PIXEL_RGB) {
      // The r and g values are inversed in the images that are gotten from the server
      imageData.data[canvasIndex + Constants.RED_COLOR] = pixels[imageIndex + Constants.BLUE_COLOR];
      imageData.data[canvasIndex + Constants.GREEN_COLOR] = pixels[imageIndex + Constants.GREEN_COLOR];
      imageData.data[canvasIndex + Constants.BLUE_COLOR] = pixels[imageIndex + Constants.RED_COLOR];
      // A value
      imageData.data[canvasIndex + Constants.OPACITY_INDEX] = Constants.MAX_PIXEL_OPACITY;
      canvasIndex += Constants.NEXT_PIXEL_RGBA;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  public eraseDifference(modifCtx: CanvasRenderingContext2D, pixelsToChange: number[]): void {
    // In canvas, the pixels are written from top to bottom, while they are stored from bottom up on the server.
    const flippedModifiedPixels: number[] = this.flipPixelsOnYAxis(this.modifiedImagePixels);
    const flippedOriginalPixels: number[] = this.flipPixelsOnYAxis(this.originalImagePixels);
    pixelsToChange.forEach((pixelPos: number) => {
      flippedModifiedPixels[pixelPos + Constants.RED_COLOR] = flippedOriginalPixels[pixelPos + Constants.RED_COLOR];
      flippedModifiedPixels[pixelPos + Constants.GREEN_COLOR] = flippedOriginalPixels[pixelPos + Constants.GREEN_COLOR];
      flippedModifiedPixels[pixelPos + Constants.BLUE_COLOR] = flippedOriginalPixels[pixelPos + Constants.BLUE_COLOR];
    });
    this.modifiedImagePixels = this.flipPixelsOnYAxis(flippedModifiedPixels);
    this.drawPixelsInCanvas(modifCtx, this.modifiedImagePixels);
  }

  public getFolderLocation(path: string, isTheOriginalImage: boolean): string {
    return (isTheOriginalImage) ?
      Constants.PUBLIC_OG_FOLDER_PATH + path.split(Constants.BACK_SLASH).pop() as string
      : Constants.PUBLIC_MODIF_FOLDER_PATH + path.split(Constants.BACK_SLASH).pop() as string;
  }

  private flipPixelsOnYAxis(pixels: number[]): number[] {
    const flippedPixels: number[] = [];
    for (let y: number = (Constants.VALID_BMP_HEIGHT - 1); y >= 0; y--) {
      for (let x: number = 0; x < Constants.VALID_BMP_WIDTH * Constants.BYTES_PER_PIXEL; x++) {
        flippedPixels.push(pixels[y * Constants.VALID_BMP_WIDTH * Constants.BYTES_PER_PIXEL + x]);
      }
    }

    return flippedPixels;
  }
}
