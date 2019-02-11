// tslint:disable:no-magic-numbers
import { expect } from "chai";
import "reflect-metadata";
import { testImage } from "../../mock/image-mock";
import { DifferenceIdentificator2DService } from "./difference-identificator-2d.service";

let differenceIdentificatorService: DifferenceIdentificator2DService;

//  Test image gives:
//  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
//  255, 255, 255,  16,  17,  18,  19,  20,  21,  22,  23,  24, 255, 255, 255,
//  255, 255, 255,  10,  11,  12,   0,   0,   0,  13,  14,  15, 255, 255, 255,
//  255, 255, 255,   1,   2,   3,   4,   5,   6,   7,   8,   9, 255, 255, 255,
//  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,

//  If pixel clicked is [0,0,0], then TL = [16,17,18], T = [19,20,21], TR = [22,23,24]
//                                    L  = [10,11,12],               , R  = [13,14,15]
//                                    BL = [1,2,3]   , B = [4,5,6]   , BR = [7,8,9]

// [2,2] -> middle of 5px by 5px image, gives pos 36 in array.
const clickedPixelPos: number = 36;

describe("DifferenceIdentificator2DService", () => {
    beforeEach(() => {
        differenceIdentificatorService = new DifferenceIdentificator2DService();
    });

    it("should return the correct bottom pixel position in the test array", (done: Mocha.Done) => {
        const bottomPixel: number = differenceIdentificatorService.getBottomPixelNeighbour(clickedPixelPos, 5);
        expect(testImage[bottomPixel]).to.equal(4);
        expect(testImage[bottomPixel + 1]).to.equal(5);
        expect(testImage[bottomPixel + 2]).to.equal(6);
        done();
    });

    it("should return the correct bottom-right pixel position in the test array", (done: Mocha.Done) => {
        const bottomRightPixel: number = differenceIdentificatorService.getBottomRightPixelNeighbour(clickedPixelPos, 5);
        expect(testImage[bottomRightPixel]).to.equal(7);
        expect(testImage[bottomRightPixel + 1]).to.equal(8);
        expect(testImage[bottomRightPixel + 2]).to.equal(9);
        done();
    });

    it("should return the correct bottom-left pixel position in the test array", (done: Mocha.Done) => {
        const bottomLeftPixel: number = differenceIdentificatorService.getBottomLeftPixelNeighbour(clickedPixelPos, 5);
        expect(testImage[bottomLeftPixel]).to.equal(1);
        expect(testImage[bottomLeftPixel + 1]).to.equal(2);
        expect(testImage[bottomLeftPixel + 2]).to.equal(3);
        done();
    });

    it("should return the correct left pixel position in the test array", (done: Mocha.Done) => {
        const leftPixel: number = differenceIdentificatorService.getLeftPixelNeighbour(clickedPixelPos);
        expect(testImage[leftPixel]).to.equal(10);
        expect(testImage[leftPixel + 1]).to.equal(11);
        expect(testImage[leftPixel + 2]).to.equal(12);
        done();
    });

    it("should return the correct right pixel position in the test array", (done: Mocha.Done) => {
        const rightPixel: number = differenceIdentificatorService.getRightPixelNeighbour(clickedPixelPos);
        expect(testImage[rightPixel]).to.equal(13);
        expect(testImage[rightPixel + 1]).to.equal(14);
        expect(testImage[rightPixel + 2]).to.equal(15);
        done();
    });
});
