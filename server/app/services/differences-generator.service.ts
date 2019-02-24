import { injectable } from "inversify";
import {IBitmapImage} from "../../../common/communication/BitmapImage";
import {Constants} from "../../../common/communication/Constants";

@injectable()
export class DifferencesGeneratorService {

  public generateDifferences(originalImg: IBitmapImage, modifiedImg: IBitmapImage): IBitmapImage {

    let differenceImg: IBitmapImage = this.fillDifferenceImage(originalImg, modifiedImg);
    differenceImg = this.enlargeBlackPixels(differenceImg);

    return differenceImg;
  }

  private pixelAreDifferent(originalImg: IBitmapImage, modifiedImg: IBitmapImage, pixel: number): boolean {
    return originalImg.pixels[pixel] !== modifiedImg.pixels[pixel]
           || originalImg.pixels[pixel + 1] !== modifiedImg.pixels[pixel + 1]
           || originalImg.pixels[pixel + 1 + 1] !== modifiedImg.pixels[pixel + 1 + 1];
  }
  public fillDifferenceImage(originalImg: IBitmapImage, modifiedImg: IBitmapImage): IBitmapImage {
    const fileName: string = originalImg.fileName
    .substr(0, (originalImg.fileName.length - Constants.EXTENSION_LENGTH)) + Constants.DIFFERENCE_EXTENSION;
    const differenceImg: IBitmapImage = {height: originalImg.height, width: originalImg.width, bitDepth: 24,
                                         fileName: fileName, pixels: []};

    for (let i: number = 0; i < originalImg.pixels.length; i += Constants.PIXEL_PARAMETERS_NB) {
      if (this.pixelAreDifferent(originalImg, modifiedImg, i)) {
        for (let j: number = 0; j < Constants.PIXEL_PARAMETERS_NB; j++) {
          differenceImg.pixels.push(Constants.BLACK_PIXEL_PARAMETER);
        }
      } else {
        for (let j: number = 0; j < Constants.PIXEL_PARAMETERS_NB; j++) {
          differenceImg.pixels.push(Constants.WHITE_PIXEL_PARAMETER);
        }
      }
    }

    return differenceImg;
  }

  public enlargeBlackPixels(differenceImg: IBitmapImage): IBitmapImage {
    let newDifferenceImg: IBitmapImage = {height: differenceImg.height, width: differenceImg.width,
                                          bitDepth: 24, fileName: differenceImg.fileName, pixels: []};

    for (const {} of differenceImg.pixels) {
      newDifferenceImg.pixels.push(Constants.WHITE_PIXEL_PARAMETER);
    }

    for (let i: number = 0; i < differenceImg.pixels.length; i += Constants.PIXEL_PARAMETERS_NB) {
      if (differenceImg.pixels[i] === Constants.BLACK_PIXEL_PARAMETER) {
        newDifferenceImg = this.makeNeighborsBlack(newDifferenceImg, i);
      }
    }

    return newDifferenceImg;
  }

  public makeNeighborsBlack(newDifferenceImg: IBitmapImage, index: number): IBitmapImage {
    const neighbors: number[] = this.getNeighbors(index, newDifferenceImg.height, newDifferenceImg.width);
    for (const neighbor of neighbors) {
      newDifferenceImg.pixels[neighbor * Constants.PIXEL_PARAMETERS_NB]
      = newDifferenceImg.pixels[neighbor * Constants.PIXEL_PARAMETERS_NB + 1]
      = newDifferenceImg.pixels[neighbor * Constants.PIXEL_PARAMETERS_NB + 1 + 1]
      = Constants.BLACK_PIXEL_PARAMETER;
    }

    return newDifferenceImg;
  }

  private isNeighbor(positionX: number, positionY: number, index: number, height: number, width: number): boolean {
    return (Math.abs(positionX) + Math.abs(positionY) <= Constants.MAX_PIXEL_REACH)
            && (index / Constants.PIXEL_PARAMETERS_NB + positionY * width >= 0)
            && (index / Constants.PIXEL_PARAMETERS_NB + positionY * width < height * width)
            && (((index / Constants.PIXEL_PARAMETERS_NB) % width) + positionX < width)
            && (((index / Constants.PIXEL_PARAMETERS_NB) % width) + positionX >= 0);
  }

  public getNeighbors(index: number, height: number, width: number): number[] {
    const neighbors: number[] = [];
    for (let positionX: number = -Constants.ENLARGING_SURFACE_RADIUS; positionX <= Constants.ENLARGING_SURFACE_RADIUS; positionX++) {
      for (let positionY: number = -Constants.ENLARGING_SURFACE_RADIUS; positionY <= Constants.ENLARGING_SURFACE_RADIUS; positionY++) {
        if (this.isNeighbor(positionX, positionY, index, height, width)) {
          neighbors.push(index / Constants.PIXEL_PARAMETERS_NB + positionX + positionY * width);
        }
      }
    }

    return neighbors;
  }
}
