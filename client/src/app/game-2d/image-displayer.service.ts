import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientConstants } from "../../../../common/communication/Constants";
import { IOriginalImage } from "../../../../common/communication/OriginalImage";

@Injectable({
  providedIn: "root",
})

export class ImageDisplayerService {

    public originalImagePixels: number[] = [];

    public constructor(private http: HttpClient) {
    }

    public async getOriginalImagePixels(imagePath: string): Promise<number[]> {

        const originalImage: IOriginalImage = {name: this.getImageName(imagePath)};

        return new Promise<number[]> ((resolve: Function, res: Function) =>
        resolve(this.http.post<number[]>(ClientConstants.SERVER_BASE_URL + "api/differences/bitmap_encoder", originalImage)
        .toPromise()));
      }

    public getImageName(path: string): string {
        return path.split("/").pop() as string;
    }

    public drawPixelsInCanvas(ctx: CanvasRenderingContext2D, imagePath: string): void {
        const imageData: ImageData = new ImageData(ClientConstants.VALID_BMP_WIDTH, ClientConstants.VALID_BMP_HEIGHT);

        if (ctx) {
            this.getOriginalImagePixels(imagePath)
            .then((res) => {
                this.originalImagePixels = res;
                let canvasIndex: number = 0;
                // Iterate through every pixel
                for (let originalImageIndex: number = 0; originalImageIndex < this.originalImagePixels.length;
                                                        originalImageIndex += ClientConstants.NEXT_PIXEL_RGB) {
                    imageData.data[canvasIndex + ClientConstants.RED_COLOR] =
                        this.originalImagePixels[originalImageIndex + ClientConstants.BLUE_COLOR];    // B value

                    imageData.data[canvasIndex + ClientConstants.GREEN_COLOR] =
                        this.originalImagePixels[originalImageIndex + ClientConstants.GREEN_COLOR];   // G value

                    imageData.data[canvasIndex + ClientConstants.BLUE_COLOR] =
                        this.originalImagePixels[originalImageIndex + ClientConstants.RED_COLOR];     // R value

                    imageData.data[canvasIndex + ClientConstants.OPACITY_INDEX] =
                        ClientConstants.MAX_PIXEL_OPACITY;                                            // A value
                    canvasIndex += ClientConstants.NEXT_PIXEL_RGBA;
                }

                if (ctx) {
                    ctx.putImageData(imageData, 0, 0);
                }
                });
        }
    }

}
