import { injectable } from "inversify";
import {BitmapImage} from "../../../common/communication/BitmapImage";

const IMAGE_HEIGHT: number = 480;
const IMAGE_WIDTH: number = 640;
const NUMBER_PER_PIXEL: number = 3;
const BLACK: number = 0;
const IS_VISITED: number = 1;
const COLOR: number = 0;
const TOP_LEFT: number = IMAGE_WIDTH - 1;
const TOP: number = IMAGE_WIDTH ;
const TOP_RIGHT: number = IMAGE_WIDTH + 1;
const LEFT: number = -1;
const RIGHT: number = 1;
const BOTTOM_LEFT: number = -IMAGE_WIDTH - 1;
const BOTTOM: number = -IMAGE_WIDTH ;
const BOTTOM_RIGHT: number = -IMAGE_WIDTH + 1;

@injectable()
export class DifferenceCounterService {

  public getNumberOfDifferences(differencesImage: BitmapImage): number {
    const pixelMap: PixelMap = {value : this.getPixelMap(differencesImage)};

    return this.travelAndCountDifference(pixelMap);
  }

  private getPixelMap(differencesImage: BitmapImage): [number, boolean][] {
    const pixelMap: [number, boolean][] = [];
    let counter: number = 0;
    differencesImage.pixels.forEach((pixel: number) => {
      counter++;
      if (counter % NUMBER_PER_PIXEL === 0 ) {
        pixelMap.push([pixel, false]);
      }
    });

    return pixelMap;
  }

  private travelAndCountDifference(pixelMap: PixelMap): number {
    let numberOfDifference: number = 0;
    let pixelIndex: number = 0;
    pixelMap.value.forEach((pixel: [number, boolean] ) => {
      if ( pixel[COLOR] === BLACK && pixel[IS_VISITED] === false ) {
        numberOfDifference++;
        pixel[IS_VISITED] = true;
        this.findZone(pixelMap, pixelIndex);
      } else {
        pixel[IS_VISITED] = true;
      }
      pixelIndex ++;
    });
    console.log(numberOfDifference);

    return numberOfDifference;
  }

  private findZone(pixelMap: PixelMap, pixelIndex: number): void {
    const pixelStack: number[] = [pixelIndex];
    while (pixelStack.length > 0) {
      const neighbors: number[] = this.getNeighbors(pixelStack.shift());
      neighbors.forEach((neighbor: number) => {
        if (pixelMap.value[neighbor][COLOR] === BLACK && pixelMap.value[neighbor][IS_VISITED] === false) {
          pixelMap.value[neighbor][IS_VISITED] = true;
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

    neighbors = (pixelIndex % IMAGE_WIDTH === 0)
      ? this.getRightSideNeighbor(pixelIndex)
      : (pixelIndex % IMAGE_WIDTH === IMAGE_WIDTH - 1)
        ? neighbors = this.getLeftSideNeighbor(pixelIndex)
        : this.getBothSideNeighbor(pixelIndex);

    neighbors = neighbors.filter((neighbor: number) => neighbor >= 0 && neighbor < IMAGE_HEIGHT * IMAGE_WIDTH);

    return neighbors;
  }

  private getLeftSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, TOP_LEFT),
            this.getNeighbor(pixelIndex, TOP),
            this.getNeighbor(pixelIndex, LEFT),
            this.getNeighbor(pixelIndex, BOTTOM_LEFT),
            this.getNeighbor(pixelIndex, BOTTOM)];
  }

  private getRightSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, TOP),
            this.getNeighbor(pixelIndex, TOP_RIGHT),
            this.getNeighbor(pixelIndex, RIGHT),
            this.getNeighbor(pixelIndex, BOTTOM),
            this.getNeighbor(pixelIndex, BOTTOM_RIGHT)];
  }

  private getBothSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, TOP_LEFT),
            this.getNeighbor(pixelIndex, TOP),
            this.getNeighbor(pixelIndex, TOP_RIGHT),
            this.getNeighbor(pixelIndex, LEFT),
            this.getNeighbor(pixelIndex, RIGHT),
            this.getNeighbor(pixelIndex, BOTTOM_LEFT),
            this.getNeighbor(pixelIndex, BOTTOM),
            this.getNeighbor(pixelIndex, BOTTOM_RIGHT)];
  }

  private getNeighbor(pixelIndex: number, position: number): number {
    return pixelIndex + position;
  }
}

interface PixelMap {
  value: [number, boolean][];
}
