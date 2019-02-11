import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IClickCoordinates } from "../../../common/communication/ClickCoordinates";
import { ServerConstants } from "../../../common/communication/Constants";
import { IPixel } from "../../../common/communication/Pixel";
import { ModifiedImg } from "../../mock/image-mock";
import Types from "../types";
//import { BmpFileGenerator } from "./bmp-file-generator.service";
import { DifferenceCounterService } from "./difference-counter.service";

@injectable()
export class DifferenceIdentificator2DService {

    public differenceImgTest: IBitmapImage;
    public clickPosition: IClickCoordinates;


    public constructor(/*@inject(Types.BmpFileGenerator) private bmpFileGeneratorService: BmpFileGenerator*/
                         @inject(Types.DifferenceCounterService) private diffCounterService: DifferenceCounterService) {/**/}

    public confirmDifference(clickPosition: IClickCoordinates, differenceImage: IBitmapImage, modifiedImage: IBitmapImage): boolean {

        // Where the pixels of the image of differences are
        const imgOfDifference: ModifiedImg = new ModifiedImg();
        /*const test: IBitmapImage = {
            fileName: "MY_TEST_BMP_MODIF.bmp",
            height: 480,
            width: 640,
            bitDepth: 24,
            pixels: imgOfDifference.pixels,
        };*/

       // this.bmpFileGeneratorService.generateModifedBMPFile(test);

        console.log("Pos X: " + clickPosition.xPos);
        console.log("Pos Y: " + clickPosition.yPos);

        console.log(this.getPixelAtPos(clickPosition, imgOfDifference.pixels));

        console.log("Neighbours PS: " + this.diffCounterService.getNeighbors(this.getPositionInArray(clickPosition)));
        console.log("Neighbours PAM: " + this.getBlackPixelNeighbours(this.getPositionInArray(clickPosition), 640, 3));


        return true;
    }

    public getPixelAtPos(clickPosition: IClickCoordinates, pixelArray: number[]): IPixel {
        const POS_IN_ARRAY: number = this.getPositionInArray(clickPosition);
        console.log("Pos of pixel clicked : " + POS_IN_ARRAY);

        return {
            red: pixelArray[POS_IN_ARRAY],
            green: pixelArray[POS_IN_ARRAY + 1],
            blue: pixelArray[POS_IN_ARRAY + 1 + 1],
        };
    }

    public getPositionInArray(clickPosition: IClickCoordinates): number {
        return ((clickPosition.yPos * ServerConstants.ACCEPTED_WIDTH * 3)
                + clickPosition.xPos * ServerConstants.BYTES_PER_PIXEL);
    }

    public getPixelsToTurnWhite(listOfPixelsPos: number[], currentPixelPos: number): void {
        if (!listOfPixelsPos.includes(currentPixelPos)) {
            listOfPixelsPos.push(currentPixelPos);
        }
    }

    public getBlackPixelNeighbours(clickedPixelPos: number, imageWidth: number, pixels: number[]): number[] {
        const blackPixelNeighbours: number[] = [];
        const allPixelNeighbours: number [] = this.getPixelNeighbours(clickedPixelPos, imageWidth);
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


    private findZone(pixelMap: PixelMap, pixelIndex: number): void {
        const pixelStack: number[] = [pixelIndex];
        while (pixelStack.length > 0) {
          const neighbors: number[] = this.getNeighbors(pixelStack.shift());
          neighbors.forEach((neighbor: number) => {
            if (pixelMap.value[neighbor][ServerConstants.COLOR] === ServerConstants.BLACK_PIXEL_PARAMETER
              && pixelMap.value[neighbor][ServerConstants.IS_VISITED] === false) {
              pixelMap.value[neighbor][ServerConstants.IS_VISITED] = true;
              pixelStack.push(neighbor);
            }
          });
        }
      }
}
