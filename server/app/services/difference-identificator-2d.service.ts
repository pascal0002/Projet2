import { injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IClickInfo } from "../../../common/communication/ClickInfo";
import { ServerConstants } from "../../../common/communication/Constants";
import { IPixel } from "../../../common/communication/Pixel";
import { ModifiedImg } from "../../mock/image-mock";

@injectable()
export class DifferenceIdentificator2DService {

    public differenceImgTest: IBitmapImage;
    public clickPosition: IClickInfo;
    public imageOfDifferencePixels: number[];

    public constructor() {
                            const imgOfDifference: ModifiedImg = new ModifiedImg();
                            this.imageOfDifferencePixels = imgOfDifference.pixels;
                         }

    public confirmDifference(clickPosition: IClickInfo, imgOfDifferencePixels: number[]): boolean {
        const pixelAtPos: IPixel = this.getPixelAtPos(clickPosition, imgOfDifferencePixels);

        return (pixelAtPos.red === ServerConstants.BLACK_PIXEL_PARAMETER &&
                pixelAtPos.blue === ServerConstants.BLACK_PIXEL_PARAMETER &&
                pixelAtPos.green === ServerConstants.BLACK_PIXEL_PARAMETER);
    }

    public getPixelAtPos(clickPosition: IClickInfo, pixelArray: number[]): IPixel {
        const POS_IN_ARRAY: number = this.getPositionInArray(clickPosition);

        return {
            red: pixelArray[POS_IN_ARRAY],
            green: pixelArray[POS_IN_ARRAY + 1],
            blue: pixelArray[POS_IN_ARRAY + 1 + 1],
        };
    }

    public getPositionInArray(clickPosition: IClickInfo): number {
        return ((clickPosition.yPos * ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL)
            + clickPosition.xPos * ServerConstants.BYTES_PER_PIXEL);
    }

    public eraseDifference(currentPixelPos: number, pixels: number[], imageWidth: number): number[] {
        const pixelStack: number[] = [currentPixelPos];
        pixels[currentPixelPos] = ServerConstants.WHITE_PIXEL_PARAMETER;
        pixels[currentPixelPos + 1] = ServerConstants.WHITE_PIXEL_PARAMETER;
        pixels[currentPixelPos + 1 + 1] = ServerConstants.WHITE_PIXEL_PARAMETER;

        while (pixelStack.length > 0) {
            const pixelIndexNumber: number | undefined = pixelStack.shift();
            if (pixelIndexNumber !== undefined) {
                const neighbours: number[] = this.getBlackPixelNeighbours(pixelIndexNumber, imageWidth, pixels);
                neighbours.forEach((neighbour: number) => {
                    pixelStack.push(neighbour);
                    pixels[neighbour] = ServerConstants.WHITE_PIXEL_PARAMETER;
                    pixels[neighbour + 1] = ServerConstants.WHITE_PIXEL_PARAMETER;
                    pixels[neighbour + 1 + 1] = ServerConstants.WHITE_PIXEL_PARAMETER;
                });

            }
        }

        return pixels;
    }

    public getBlackPixelNeighbours(clickedPixelPos: number, imageWidth: number, pixels: number[]): number[] {
        const blackPixelNeighbours: number[] = [];
        const allPixelNeighbours: number[] = this.getPixelNeighbours(clickedPixelPos, imageWidth);
        allPixelNeighbours.forEach((pixelPosition: number) => {
            if (pixels[pixelPosition] === ServerConstants.BLACK_PIXEL_PARAMETER) {
                blackPixelNeighbours.push(pixelPosition);
            }
        });

        return blackPixelNeighbours;
    }

    public getPixelNeighbours(clickedPixelPos: number, imageWidth: number): number[] {
        const allPixelNeighbours: number[] = [];
        allPixelNeighbours.push(this.getBottomLeftPixelNeighbour(clickedPixelPos, imageWidth));
        allPixelNeighbours.push(this.getBottomPixelNeighbour(clickedPixelPos, imageWidth));
        allPixelNeighbours.push(this.getBottomRightPixelNeighbour(clickedPixelPos, imageWidth));
        allPixelNeighbours.push(this.getRightPixelNeighbour(clickedPixelPos));
        allPixelNeighbours.push(this.getLeftPixelNeighbour(clickedPixelPos));
        allPixelNeighbours.push(this.getTopLeftPixelNeighbour(clickedPixelPos, imageWidth));
        allPixelNeighbours.push(this.getTopRightPixelNeighbour(clickedPixelPos, imageWidth));
        allPixelNeighbours.push(this.getTopPixelNeighbour(clickedPixelPos, imageWidth));

        return allPixelNeighbours;
    }

    public getRightPixelNeighbour(clickedPixelPos: number): number {
        return clickedPixelPos + ServerConstants.BYTES_PER_PIXEL;
    }

    public getLeftPixelNeighbour(clickedPixelPos: number): number {
        return clickedPixelPos - ServerConstants.BYTES_PER_PIXEL;
    }

    public getTopPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos + (imageWidth * ServerConstants.BYTES_PER_PIXEL);
    }

    public getTopRightPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos + (imageWidth * ServerConstants.BYTES_PER_PIXEL) + ServerConstants.BYTES_PER_PIXEL;
    }

    public getTopLeftPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos + (imageWidth * ServerConstants.BYTES_PER_PIXEL) - ServerConstants.BYTES_PER_PIXEL;
    }

    public getBottomPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos - (imageWidth * ServerConstants.BYTES_PER_PIXEL);
    }

    public getBottomRightPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos - (imageWidth * ServerConstants.BYTES_PER_PIXEL) + ServerConstants.BYTES_PER_PIXEL;
    }

    public getBottomLeftPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos - (imageWidth * ServerConstants.BYTES_PER_PIXEL) - ServerConstants.BYTES_PER_PIXEL;
    }
}
