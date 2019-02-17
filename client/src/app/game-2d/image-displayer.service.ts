import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientConstants, ServerConstants } from "../../../../common/communication/Constants";
import { IImageLocation } from "../../../../common/communication/ImageLocation";

@Injectable({
    providedIn: "root",
})

export class ImageDisplayerService {

    public constructor(private http: HttpClient) {
    }

    public async getImagePixels(imageLocation: string): Promise<number[]> {
        const imgLocation: IImageLocation = { location: imageLocation};

        return new Promise<number[]>((resolve: Function, res: Function) =>
            resolve(this.http.post<number[]>(ClientConstants.SERVER_BASE_URL + "api/differences/bitmap_encoder", imgLocation)
                .toPromise()));
    }

    public drawPixelsInCanvas(ctx: CanvasRenderingContext2D, pixels: number[]): void {
        const imageData: ImageData = new ImageData(ClientConstants.VALID_BMP_WIDTH, ClientConstants.VALID_BMP_HEIGHT);
        let canvasIndex: number = 0;

        // Iterate through every pixel
        for (let imageIndex: number = 0; imageIndex < pixels.length;
            imageIndex += ClientConstants.NEXT_PIXEL_RGB) {
            // B value
            imageData.data[canvasIndex + ClientConstants.RED_COLOR] = pixels[imageIndex + ClientConstants.BLUE_COLOR];
            // G value
            imageData.data[canvasIndex + ClientConstants.GREEN_COLOR] = pixels[imageIndex + ClientConstants.GREEN_COLOR];
            // R value
            imageData.data[canvasIndex + ClientConstants.BLUE_COLOR] = pixels[imageIndex + ClientConstants.RED_COLOR];
            // A value
            imageData.data[canvasIndex + ClientConstants.OPACITY_INDEX] = ClientConstants.MAX_PIXEL_OPACITY;
            canvasIndex += ClientConstants.NEXT_PIXEL_RGBA;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    public getFolderLocation(path: string, isTheOriginalImage: boolean): string {
        return (isTheOriginalImage) ?
        ServerConstants.PUBLIC_OG_FOLDER_PATH + path.split("/").pop() as string
        : ServerConstants.PUBLIC_MODIF_FOLDER_PATH + path.split("/").pop() as string;
    }
}
