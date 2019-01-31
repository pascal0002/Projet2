import { injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";

const WHITE_PIXEL_PARAMETER: number = 255;
const BLACK_PIXEL_PARAMETER: number = 0;
const WIDTH: number = 640;
const HEIGHT: number = 480;
const PIXEL_PARAMETERS_NB: number = 3;

@injectable()
export class DifferencesGeneratorService {

  public constructor() {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): BitmapImage {

    let differenceImg: BitmapImage = this.fillDifferenceImage(originalImg, modifiedImg);
    differenceImg = this.enlargeBlackPixels(differenceImg);

    return differenceImg;
  }

  public fillDifferenceImage(originalImg: BitmapImage, modifiedImg: BitmapImage): BitmapImage {
    const fileName: string = originalImg.fileName.substr(0, (originalImg.fileName.length - 4)) + "Differences.bmp";
    const differenceImg: BitmapImage = {height: HEIGHT, width: WIDTH, bitDepth: 24,
                                        fileName: fileName, pixels: []};

    for (let i: number = 0; i < originalImg.pixels.length; i += PIXEL_PARAMETERS_NB) {
      if (originalImg.pixels[i] !== modifiedImg.pixels[i]
        || originalImg.pixels[i + 1] !== modifiedImg.pixels[i + 1]
        || originalImg.pixels[i + 2] !== modifiedImg.pixels[i + 2]) {
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

  public enlargeBlackPixels(differenceImg: BitmapImage): BitmapImage {
    let newDifferenceImg: BitmapImage = {height: differenceImg.height, width: differenceImg.width,
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

  public makeNeighborsBlack(newDifferenceImg: BitmapImage, index: number): BitmapImage {
    const neighbors: number[] = this.getNeighbors(index, newDifferenceImg.height, newDifferenceImg.width);
    for (const neighbor of neighbors) {
      newDifferenceImg.pixels[neighbor * PIXEL_PARAMETERS_NB]
      = newDifferenceImg.pixels[neighbor * PIXEL_PARAMETERS_NB + 1]
      = newDifferenceImg.pixels[neighbor * PIXEL_PARAMETERS_NB + 2] = BLACK_PIXEL_PARAMETER;
    }

    return newDifferenceImg;
  }

  public getNeighbors(index: number, height: number, width: number): number[] {
    const neighbors: number[] = [];
    for (let i: number = -3; i <= 3; i++) {
      for (let j: number = -3; j <= 3; j++) {
        if ((Math.abs(i) + Math.abs(j) < 5)
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
