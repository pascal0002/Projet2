import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientConstants, ServerConstants } from "../../../../common/communication/Constants";
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
        const imgLocation: IImageLocation = { location: imageLocation};

        return new Promise<number[]>((resolve: Function, res: Function) =>
            resolve(this.http.post<number[]>(ClientConstants.SERVER_BASE_URL + "api/differences/image_pixels", imgLocation)
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

    public eraseDifference(modifCtx: CanvasRenderingContext2D, pixelsToChange: number[]): void {
        const flippedModifiedPixels: number[] = this.flipPixelsOnYAxis(this.modifiedImagePixels);
        const flippedOriginalPixels: number[] = this.flipPixelsOnYAxis(this.originalImagePixels);
        pixelsToChange.forEach((pixelPos: number) => {
            flippedModifiedPixels[pixelPos + ClientConstants.RED_COLOR] = flippedOriginalPixels[pixelPos + ClientConstants.RED_COLOR];
            flippedModifiedPixels[pixelPos + ClientConstants.GREEN_COLOR] = flippedOriginalPixels[pixelPos + ClientConstants.GREEN_COLOR];
            flippedModifiedPixels[pixelPos + ClientConstants.BLUE_COLOR ] = flippedOriginalPixels[pixelPos + ClientConstants.BLUE_COLOR];
        });
        this.modifiedImagePixels = this.flipPixelsOnYAxis(flippedModifiedPixels);
        this.drawPixelsInCanvas(modifCtx, this.modifiedImagePixels);
    }

    private flipPixelsOnYAxis(pixels: number[]): number[] {
        const flippedPixels: number[] = [];
        for (let y: number = (ServerConstants.ACCEPTED_HEIGHT - 1); y >= 0; y--) {
            for (let x: number = 0; x < ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL; x++) {
                flippedPixels.push(pixels[y * ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL + x]);
            }
        }

        return flippedPixels;
    }

    // private getCorrectPosInPixels(posInPixels: number): number {
    //     const yPos: number = posInPixels % (ServerConstants.BYTES_PER_PIXEL * ServerConstants.ACCEPTED_WIDTH);
    //     const xPos: number = (posInPixels - (yPos * ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL))
    //                           / ServerConstants.BYTES_PER_PIXEL;
    //     const correctYPos: number =
    // }

}
