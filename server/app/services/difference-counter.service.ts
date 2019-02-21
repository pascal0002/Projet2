import { injectable } from "inversify";
import "reflect-metadata";
import {IBitmapImage} from "../../../common/communication/BitmapImage";
import {Constants} from "../../../common/communication/Constants";

@injectable()
export class DifferenceCounterService {

  public getNumberOfDifferences(differencesImage: IBitmapImage): number {
    const pixelMap: PixelMap = {value : this.getPixelMap(differencesImage)};

    return this.travelAndCountDifference(pixelMap);
  }

  private getPixelMap(differencesImage: IBitmapImage): [number, boolean][] {
    const pixelMap: [number, boolean][] = [];
    let counter: number = 0;
    differencesImage.pixels.forEach((pixel: number) => {
      counter++;
      if (counter % Constants.PIXEL_PARAMETERS_NB === 0 ) {
        pixelMap.push([pixel, false]);
      }
    });

    return pixelMap;
  }

  private pixelIsBlackAndNotVisited(pixel: [number, boolean]): boolean {
    return pixel[Constants.COLOR] === Constants.BLACK_PIXEL_PARAMETER && !pixel[Constants.IS_VISITED];
  }

  private travelAndCountDifference(pixelMap: PixelMap): number {
    let numberOfDifference: number = 0;
    let pixelIndex: number = 0;
    pixelMap.value.forEach((pixel: [number, boolean] ) => {
      if (this.pixelIsBlackAndNotVisited(pixel)) {
        numberOfDifference++;
        pixel[Constants.IS_VISITED] = true;
        this.findZone(pixelMap, pixelIndex);
      } else {
        pixel[Constants.IS_VISITED] = true;
      }
      pixelIndex ++;
    });

    return numberOfDifference;
  }

  private findZone(pixelMap: PixelMap, pixelIndex: number): void {
    const pixelStack: number[] = [pixelIndex];
    while (pixelStack.length > 0) {
      const neighbors: number[] = this.getNeighbors(pixelStack.shift());
      neighbors.forEach((neighbor: number) => {
        if ( this.pixelIsBlackAndNotVisited(pixelMap.value[neighbor])) {
          pixelMap.value[neighbor][Constants.IS_VISITED] = true;
          pixelStack.push(neighbor);
        }
      });
    }
  }

  private getNeighbors(pixelIndex: number | undefined): number[] {
    let neighbors: number[] = [];
    if (pixelIndex === undefined) {
      return [];
    }

    // Dylan approuve ce disable de TSLint
    // tslint:disable-next-line:prefer-conditional-expression
    if (this.checkPixelSide(pixelIndex, Constants.LEFT_SIDE)) {
      neighbors = this.getRightSideNeighbor(pixelIndex);
    } else if (this.checkPixelSide(pixelIndex, Constants.RIGHT_SIDE)) {
      neighbors = this.getLeftSideNeighbor(pixelIndex);
    } else {
      neighbors = this.getBothSideNeighbor(pixelIndex);
    }

    neighbors = neighbors.filter((neighbor: number) => neighbor >= 0
    && neighbor < Constants.ACCEPTED_HEIGHT * Constants.ACCEPTED_WIDTH);

    return neighbors;
  }

  private checkPixelSide(pixelIndex: number, side: number): boolean {
    return pixelIndex % Constants.ACCEPTED_WIDTH === side;
  }

  private getLeftSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, Constants.TOP_LEFT),
            this.getNeighbor(pixelIndex, Constants.TOP),
            this.getNeighbor(pixelIndex, Constants.LEFT),
            this.getNeighbor(pixelIndex, Constants.BOTTOM_LEFT),
            this.getNeighbor(pixelIndex, Constants.BOTTOM)];
  }

  private getRightSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, Constants.TOP),
            this.getNeighbor(pixelIndex, Constants.TOP_RIGHT),
            this.getNeighbor(pixelIndex, Constants.RIGHT),
            this.getNeighbor(pixelIndex, Constants.BOTTOM),
            this.getNeighbor(pixelIndex, Constants.BOTTOM_RIGHT)];
  }

  private getBothSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, Constants.TOP_LEFT),
            this.getNeighbor(pixelIndex, Constants.TOP),
            this.getNeighbor(pixelIndex, Constants.TOP_RIGHT),
            this.getNeighbor(pixelIndex, Constants.LEFT),
            this.getNeighbor(pixelIndex, Constants.RIGHT),
            this.getNeighbor(pixelIndex, Constants.BOTTOM_LEFT),
            this.getNeighbor(pixelIndex, Constants.BOTTOM),
            this.getNeighbor(pixelIndex, Constants.BOTTOM_RIGHT)];
  }

  private getNeighbor(pixelIndex: number, position: number): number {
    return pixelIndex + position;
  }
}

interface PixelMap {
  value: [number, boolean][];
}
