import { injectable } from "inversify";
import {IBitmapImage} from "../../../common/communication/BitmapImage";

const WHITE_PIXEL_PARAMETER: number = 255;
const BLACK_PIXEL_PARAMETER: number = 0;
const WIDTH: number = 640;
const HEIGHT: number = 480;
const PIXEL_PARAMETERS_NB: number = 3;
const MAX_PIXEL_REACH: number = 4;
const EXTENSION_LENGTH: number = 4;
const SURFACE_RADIUS: number = 3;

@injectable()
export class DifferencesGeneratorService {

  public generateDifferences(originalImg: IBitmapImage, modifiedImg: IBitmapImage): IBitmapImage {

    let differenceImg: IBitmapImage = this.fillDifferenceImage(originalImg, modifiedImg);
    differenceImg = this.enlargeBlackPixels(differenceImg);

    return differenceImg;
  }

  public fillDifferenceImage(originalImg: IBitmapImage, modifiedImg: IBitmapImage): IBitmapImage {
    const fileName: string = originalImg.fileName.substr(0, (originalImg.fileName.length - EXTENSION_LENGTH)) + "Differences.bmp";
    const differenceImg: IBitmapImage = {height: HEIGHT, width: WIDTH, bitDepth: 24,
                                         fileName: fileName, pixels: []};

    for (let i: number = 0; i < originalImg.pixels.length; i += PIXEL_PARAMETERS_NB) {
      if (originalImg.pixels[i] !== modifiedImg.pixels[i]
        || originalImg.pixels[i + 1] !== modifiedImg.pixels[i + 1]
        || originalImg.pixels[i + 1 + 1] !== modifiedImg.pixels[i + 1 + 1]) {
        for (let j: number = 0; j < PIXEL_PARAMETERS_NB; j++) {
          differenceImg.pixels.push(BLACK_PIXEL_PARAMETER);
        }
      } else {
        for (let j: number = 0; j < PIXEL_PARAMETERS_NB; j++) {
          differenceImg.pixels.push(WHITE_PIXEL_PARAMETER);
        }
      }
    }

    return differenceImg;
  }

  public enlargeBlackPixels(differenceImg: IBitmapImage): IBitmapImage {
    let newDifferenceImg: IBitmapImage = {height: differenceImg.height, width: differenceImg.width,
                                          bitDepth: 24, fileName: differenceImg.fileName, pixels: []};

    for (const {} of differenceImg.pixels) {
      newDifferenceImg.pixels.push(WHITE_PIXEL_PARAMETER);
    }

    for (let i: number = 0; i < differenceImg.pixels.length; i += PIXEL_PARAMETERS_NB) {
      if (differenceImg.pixels[i] === BLACK_PIXEL_PARAMETER) {
        newDifferenceImg = this.makeNeighborsBlack(newDifferenceImg, i);
      }
    }

    return newDifferenceImg;
  }

  public makeNeighborsBlack(newDifferenceImg: IBitmapImage, index: number): IBitmapImage {
    const neighbors: number[] = this.getNeighbors(index, newDifferenceImg.height, newDifferenceImg.width);
    for (const neighbor of neighbors) {
      newDifferenceImg.pixels[neighbor * PIXEL_PARAMETERS_NB]
      = newDifferenceImg.pixels[neighbor * PIXEL_PARAMETERS_NB + 1]
      = newDifferenceImg.pixels[neighbor * PIXEL_PARAMETERS_NB + 1 + 1] = BLACK_PIXEL_PARAMETER;
    }

    return newDifferenceImg;
  }

  public getNeighbors(index: number, height: number, width: number): number[] {
    const neighbors: number[] = [];
    for (let i: number = -3; i <= SURFACE_RADIUS; i++) {
      for (let j: number = -3; j <= SURFACE_RADIUS; j++) {
        if ((Math.abs(i) + Math.abs(j) <= MAX_PIXEL_REACH)
            && (index / PIXEL_PARAMETERS_NB + j * width >= 0)
            && (index / PIXEL_PARAMETERS_NB + j * width < height * width)
            && (((index / PIXEL_PARAMETERS_NB) % width) + i < width)
            && (((index / PIXEL_PARAMETERS_NB) % width) + i >= 0)) {
          neighbors.push(index / PIXEL_PARAMETERS_NB + i + j * width);
        }
      }
    }

    return neighbors;
  }
}
