import { injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";

const WHITE_PIXEL_COLOR: number = 255;
const BLACK_PIXEL_COLOR: number = 0;
const WIDTH: number = 640;
const HEIGHT: number = 480;

@injectable()
export class DifferencesGeneratorService {

  public constructor() {/**/}

  public generateDifferences(originalImg: BitmapImage, modifiedImg: BitmapImage): BitmapImage {

    const fileName: string = originalImg.fileName.substr(0, (originalImg.fileName.length - 4)) + "Differences.bmp";
    let differenceImg: BitmapImage = {height: HEIGHT, width: WIDTH, bitDepth: 24,
                                      fileName: fileName, pixels: []};

    differenceImg = this.fillDifferenceImage(originalImg, modifiedImg, differenceImg);
    differenceImg = this.enlargeBlackPixels(differenceImg);
    // pour tests console
    /*let sequence: string = "";
    for (let i: number = 0; i < differenceImg.pixels.length; i += 3) {
      sequence += differenceImg.pixels[i];
    }
    console.log(sequence);*/

    return differenceImg;
  }

  public fillDifferenceImage(originalImg: BitmapImage, modifiedImg: BitmapImage, differenceImg: BitmapImage): BitmapImage {
    for (let i: number = 0; i < originalImg.pixels.length; i += 3) {
      if (originalImg.pixels[i] !== modifiedImg.pixels[i]
        || originalImg.pixels[i + 1] !== modifiedImg.pixels[i + 1]
        || originalImg.pixels[i + 2] !== modifiedImg.pixels[i + 2]) {
        differenceImg.pixels.push(BLACK_PIXEL_COLOR);
        differenceImg.pixels.push(BLACK_PIXEL_COLOR);
        differenceImg.pixels.push(BLACK_PIXEL_COLOR);
      } else {
        differenceImg.pixels.push(WHITE_PIXEL_COLOR);
        differenceImg.pixels.push(WHITE_PIXEL_COLOR);
        differenceImg.pixels.push(WHITE_PIXEL_COLOR);
      }
    }

    return differenceImg;
  }

  public enlargeBlackPixels(differenceImg: BitmapImage): BitmapImage {
    let newDifferenceImg: BitmapImage = {height: HEIGHT, width: WIDTH, bitDepth: 24,
                                         fileName: differenceImg.fileName, pixels: []};

    for (const {} of differenceImg.pixels) {
      newDifferenceImg.pixels.push(WHITE_PIXEL_COLOR);
    }

    for (let i: number = 0; i < differenceImg.pixels.length; i += 3) {
      if (differenceImg.pixels[i] === BLACK_PIXEL_COLOR) {
        newDifferenceImg = this.makeNeighborsBlack(newDifferenceImg, i);
      }
    }

    return newDifferenceImg;
  }

  public makeNeighborsBlack(newDifferenceImg: BitmapImage, index: number): BitmapImage {
    const neighbors: number[] = this.getNeighbors(index);
    for (const neighbor of neighbors) {
      newDifferenceImg.pixels[neighbor * 3] = BLACK_PIXEL_COLOR;
      newDifferenceImg.pixels[neighbor * 3 + 1] = BLACK_PIXEL_COLOR;
      newDifferenceImg.pixels[neighbor * 3 + 2] = BLACK_PIXEL_COLOR;
    }

    return newDifferenceImg;
  }

  public getNeighbors(index: number): number[] {
    const neighbors: number[] = [];
    for (let i: number = -3; i <= 3; i++) {
      for (let j: number = -3; j <= 3; j++) {
        if ((Math.abs(i) + Math.abs(j) < 5)
            && (index / 3 + j * WIDTH >= 0)
            && (index / 3 + j * WIDTH < HEIGHT * WIDTH)
            && (((index / 3) % WIDTH) + i < WIDTH)
            && (((index / 3) % WIDTH) + i >= 0)) {
          neighbors.push(index / 3 + i + j * WIDTH);
        }
      }
    }

    return neighbors;
  }
}
