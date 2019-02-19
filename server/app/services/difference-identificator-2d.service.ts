import { injectable } from "inversify";
import { IClickInfo } from "../../../common/communication/ClickInfo";
import { Constants } from "../../../common/communication/Constants";
import { IPixel } from "../../../common/communication/Pixel";

@injectable()
export class DifferenceIdentificator2DService {

    public posOfDifferencePixels: number[];

    public constructor() {
        this.posOfDifferencePixels = [];
    }

    public confirmDifference(clickPosition: IClickInfo, imgOfDifferencePixels: number[]): boolean {
        const pixelAtPos: IPixel = this.getPixelAtPos(clickPosition, imgOfDifferencePixels);

        return (pixelAtPos.red === Constants.BLACK_PIXEL_PARAMETER &&
                pixelAtPos.blue === Constants.BLACK_PIXEL_PARAMETER &&
                pixelAtPos.green === Constants.BLACK_PIXEL_PARAMETER);
    }

    private getPixelAtPos(clickPosition: IClickInfo, pixelArray: number[]): IPixel {
        const POS_IN_ARRAY: number = this.getPositionInArray(clickPosition);

        return {
            red: pixelArray[POS_IN_ARRAY],
            green: pixelArray[POS_IN_ARRAY + 1],
            blue: pixelArray[POS_IN_ARRAY + 1 + 1],
        };
    }

    private resetPosOfDifferencePixels(): void {
        this.posOfDifferencePixels = [];
    }

    public getPositionInArray(clickPosition: IClickInfo): number {
        return ((clickPosition.yPos * Constants.ACCEPTED_WIDTH * Constants.BYTES_PER_PIXEL)
            + clickPosition.xPos * Constants.BYTES_PER_PIXEL);
    }

    public eraseDifference(currentPixelPos: number, pixels: number[], imageWidth: number): number[] {
        this.resetPosOfDifferencePixels();
        const pixelStack: number[] = [currentPixelPos];
        pixels[currentPixelPos] = Constants.WHITE_PIXEL_PARAMETER;
        pixels[currentPixelPos + 1] = Constants.WHITE_PIXEL_PARAMETER;
        pixels[currentPixelPos + 1 + 1] = Constants.WHITE_PIXEL_PARAMETER;

        while (pixelStack.length > 0) {
            const pixelIndexNumber: number | undefined = pixelStack.shift();
            if (pixelIndexNumber !== undefined) {
                const neighbours: number[] = this.getBlackPixelNeighbours(pixelIndexNumber, imageWidth, pixels);
                neighbours.forEach((blackNeighbour: number) => {
                    this.posOfDifferencePixels.push(blackNeighbour);
                    pixelStack.push(blackNeighbour);
                    pixels[blackNeighbour] = Constants.WHITE_PIXEL_PARAMETER;
                    pixels[blackNeighbour + 1] = Constants.WHITE_PIXEL_PARAMETER;
                    pixels[blackNeighbour + 1 + 1] = Constants.WHITE_PIXEL_PARAMETER;
                });
            }
        }

        return pixels;
    }

    private getBlackPixelNeighbours(clickedPixelPos: number, imageWidth: number, pixels: number[]): number[] {
        const blackPixelNeighbours: number[] = [];
        const allPixelNeighbours: number[] = this.getPixelNeighbours(clickedPixelPos, imageWidth);
        allPixelNeighbours.forEach((pixelPosition: number) => {
            if (pixels[pixelPosition] === Constants.BLACK_PIXEL_PARAMETER) {
                blackPixelNeighbours.push(pixelPosition);
            }
        });

        return blackPixelNeighbours;
    }

    private getPixelNeighbours(clickedPixelPos: number, imageWidth: number): number[] {
        let correctPixelNeighbours: number[] = [];
        // Dylan approuve ce disable de TSLint
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.checkPixelSide(clickedPixelPos, Constants.LEFT_SIDE)) {
            correctPixelNeighbours = this.getRightSideNeighbours(clickedPixelPos, imageWidth);
        } else if (this.checkPixelSide(clickedPixelPos, ((Constants.ACCEPTED_WIDTH * Constants.BYTES_PER_PIXEL)
                                                           -  Constants.BYTES_PER_PIXEL))) {
            correctPixelNeighbours = this.getLeftSideNeighbours(clickedPixelPos, imageWidth);
        } else {
            correctPixelNeighbours = this.getBothSideNeighbours(clickedPixelPos, imageWidth);
        }

        return correctPixelNeighbours;
    }

    private getBothSideNeighbours(clickedPixelPos: number, imageWidth: number): number[] {
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

    private getLeftSideNeighbours(clickedPixelPos: number, imageWidth: number): number[] {
        const leftPixelNeighbours: number[] = [];

        leftPixelNeighbours.push(this.getBottomLeftPixelNeighbour(clickedPixelPos, imageWidth));
        leftPixelNeighbours.push(this.getBottomPixelNeighbour(clickedPixelPos, imageWidth));
        leftPixelNeighbours.push(this.getLeftPixelNeighbour(clickedPixelPos));
        leftPixelNeighbours.push(this.getTopLeftPixelNeighbour(clickedPixelPos, imageWidth));
        leftPixelNeighbours.push(this.getTopPixelNeighbour(clickedPixelPos, imageWidth));

        return leftPixelNeighbours;
    }

    private getRightSideNeighbours(clickedPixelPos: number, imageWidth: number): number[] {
        const rightPixelNeighbours: number[] = [];

        rightPixelNeighbours.push(this.getBottomPixelNeighbour(clickedPixelPos, imageWidth));
        rightPixelNeighbours.push(this.getBottomRightPixelNeighbour(clickedPixelPos, imageWidth));
        rightPixelNeighbours.push(this.getRightPixelNeighbour(clickedPixelPos));
        rightPixelNeighbours.push(this.getTopRightPixelNeighbour(clickedPixelPos, imageWidth));
        rightPixelNeighbours.push(this.getTopPixelNeighbour(clickedPixelPos, imageWidth));

        return rightPixelNeighbours;
    }

    private checkPixelSide(pixelIndex: number, side: number): boolean {
        return pixelIndex % (Constants.ACCEPTED_WIDTH * Constants.BYTES_PER_PIXEL) === side;
    }

    private getRightPixelNeighbour(clickedPixelPos: number): number {
        return clickedPixelPos + Constants.BYTES_PER_PIXEL;
    }

    private getLeftPixelNeighbour(clickedPixelPos: number): number {
        return clickedPixelPos - Constants.BYTES_PER_PIXEL;
    }

    private getTopPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos + (imageWidth * Constants.BYTES_PER_PIXEL);
    }

    private getTopRightPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos + (imageWidth * Constants.BYTES_PER_PIXEL) + Constants.BYTES_PER_PIXEL;
    }

    private getTopLeftPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos + (imageWidth * Constants.BYTES_PER_PIXEL) - Constants.BYTES_PER_PIXEL;
    }

    private getBottomPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos - (imageWidth * Constants.BYTES_PER_PIXEL);
    }

    private getBottomRightPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos - (imageWidth * Constants.BYTES_PER_PIXEL) + Constants.BYTES_PER_PIXEL;
    }

    private getBottomLeftPixelNeighbour(clickedPixelPos: number, imageWidth: number): number {
        return clickedPixelPos - (imageWidth * Constants.BYTES_PER_PIXEL) - Constants.BYTES_PER_PIXEL;
    }
}
