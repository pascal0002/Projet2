import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientConstants, ServerConstants } from "../../../../common/communication/Constants";
import { IImagePath } from "../../../../common/communication/ImagePath";

@Injectable({
  providedIn: "root",
})

export class GameViewService {

    public originalImagePixels: number[] = [];

    public constructor(private http: HttpClient) {
    }

    public async getOriginalImagePixels(imagePath: string): Promise<number[]> {

        return new Promise<number[]> ((resolve: Function, res: Function) =>
        resolve(this.http.post<number[]>(ClientConstants.SERVER_BASE_URL + "api/differences/bitmap_encoder", imagePath)
        .toPromise()));
      }

    public drawPixelsInCanvas(ctx: CanvasRenderingContext2D, imagePath: string): void {
        const imageData: ImageData = new ImageData(ClientConstants.VALID_BMP_WIDTH, ClientConstants.VALID_BMP_HEIGHT);

        if (ctx) {
        this.getOriginalImagePixels(imagePath)
        .then((res) => {
            this.originalImagePixels = res;
            let canvasIndex: number = 0;
            // Iterate through every pixel
            this.originalImagePixels.forEach((originalImageIndex: number) => {
                imageData.data[canvasIndex + ClientConstants.RED_COLOR] =
                    this.originalImagePixels[originalImageIndex + ClientConstants.BLUE_COLOR];    // B value

                imageData.data[canvasIndex + ClientConstants.GREEN_COLOR] =
                    this.originalImagePixels[originalImageIndex + ClientConstants.GREEN_COLOR];   // G value

                imageData.data[canvasIndex + ClientConstants.BLUE_COLOR] =
                    this.originalImagePixels[originalImageIndex + ClientConstants.RED_COLOR];     // R value

                imageData.data[canvasIndex + ClientConstants.OPACITY_INDEX] =
                    ClientConstants.MAX_PIXEL_OPACITY;                                            // A value
                originalImageIndex += ClientConstants.NEXT_PIXEL_RGB;
                canvasIndex += ClientConstants.NEXT_PIXEL_RGBA;
            });
            if (ctx) {
            ctx.putImageData(imageData, 0, 0);
            }

        });
        }
    }
}
