import { injectable } from "inversify";
import "reflect-metadata";
import {IBitmapImage} from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";

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
      if (counter % ServerConstants.PIXEL_PARAMETERS_NB === 0 ) {
        pixelMap.push([pixel, false]);
      }
    });

    return pixelMap;
  }

  private travelAndCountDifference(pixelMap: PixelMap): number {
    let numberOfDifference: number = 0;
    let pixelIndex: number = 0;
    pixelMap.value.forEach((pixel: [number, boolean] ) => {
      if ( pixel[ServerConstants.COLOR] === ServerConstants.BLACK_PIXEL_PARAMETER
        && pixel[ServerConstants.IS_VISITED] === false ) {
        numberOfDifference++;
        pixel[ServerConstants.IS_VISITED] = true;
        this.findZone(pixelMap, pixelIndex);
      } else {
        pixel[ServerConstants.IS_VISITED] = true;
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
        if (pixelMap.value[neighbor][ServerConstants.COLOR] === ServerConstants.BLACK_PIXEL_PARAMETER
          && pixelMap.value[neighbor][ServerConstants.IS_VISITED] === false) {
          pixelMap.value[neighbor][ServerConstants.IS_VISITED] = true;
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

    neighbors = (pixelIndex % ServerConstants.ACCEPTED_WIDTH === 0)
      ? this.getRightSideNeighbor(pixelIndex)
      : (pixelIndex % ServerConstants.ACCEPTED_WIDTH === ServerConstants.ACCEPTED_WIDTH - 1)
        ? neighbors = this.getLeftSideNeighbor(pixelIndex)
        : this.getBothSideNeighbor(pixelIndex);

    neighbors = neighbors.filter((neighbor: number) => neighbor >= 0
    && neighbor < ServerConstants.ACCEPTED_HEIGHT * ServerConstants.ACCEPTED_WIDTH);

    return neighbors;
  }

  private getLeftSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, ServerConstants.TOP_LEFT),
            this.getNeighbor(pixelIndex, ServerConstants.TOP),
            this.getNeighbor(pixelIndex, ServerConstants.LEFT),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM_LEFT),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM)];
  }

  private getRightSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, ServerConstants.TOP),
            this.getNeighbor(pixelIndex, ServerConstants.TOP_RIGHT),
            this.getNeighbor(pixelIndex, ServerConstants.RIGHT),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM_RIGHT)];
  }

  private getBothSideNeighbor(pixelIndex: number): number[] {
    return [this.getNeighbor(pixelIndex, ServerConstants.TOP_LEFT),
            this.getNeighbor(pixelIndex, ServerConstants.TOP),
            this.getNeighbor(pixelIndex, ServerConstants.TOP_RIGHT),
            this.getNeighbor(pixelIndex, ServerConstants.LEFT),
            this.getNeighbor(pixelIndex, ServerConstants.RIGHT),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM_LEFT),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM),
            this.getNeighbor(pixelIndex, ServerConstants.BOTTOM_RIGHT)];
  }

  private getNeighbor(pixelIndex: number, position: number): number {
    return pixelIndex + position;
  }
}

interface PixelMap {
  value: [number, boolean][];
}
