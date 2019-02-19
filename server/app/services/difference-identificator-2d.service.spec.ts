// tslint:disable:no-magic-numbers
import { expect } from "chai";
import "reflect-metadata";
import { IClickInfo } from "../../../common/communication/ClickInfo";
import { IPixel } from "../../../common/communication/Pixel";
import { firstLineBlackPixels } from "../../mock/bitmapImage-mock";
import { testImage } from "../../mock/image-mock";
import { DifferenceIdentificator2DService } from "./difference-identificator-2d.service";

const differenceIdentificatorService: DifferenceIdentificator2DService = new DifferenceIdentificator2DService();
const clickedPixelPos: number = 36;

describe("DifferenceIdentificator2DService", () => {

    it("should return the correct bottom pixel position in the test array", (done: Mocha.Done) => {
        const bottomPixel: number = differenceIdentificatorService["getBottomPixelNeighbour"](clickedPixelPos, 5);
        expect(testImage[bottomPixel]).to.equal(4);
        expect(testImage[bottomPixel + 1]).to.equal(5);
        expect(testImage[bottomPixel + 2]).to.equal(6);
        done();
    });

    it("should return the correct bottom-right pixel position in the test array", (done: Mocha.Done) => {
        const bottomRightPixel: number = differenceIdentificatorService["getBottomRightPixelNeighbour"](clickedPixelPos, 5);
        expect(testImage[bottomRightPixel]).to.equal(7);
        expect(testImage[bottomRightPixel + 1]).to.equal(8);
        expect(testImage[bottomRightPixel + 2]).to.equal(9);
        done();
    });

    it("should return the correct bottom-left pixel position in the test array", (done: Mocha.Done) => {
        const bottomLeftPixel: number = differenceIdentificatorService["getBottomLeftPixelNeighbour"](clickedPixelPos, 5);
        expect(testImage[bottomLeftPixel]).to.equal(1);
        expect(testImage[bottomLeftPixel + 1]).to.equal(2);
        expect(testImage[bottomLeftPixel + 2]).to.equal(3);
        done();
    });

    it("should return the correct left pixel position in the test array", (done: Mocha.Done) => {
        const leftPixel: number = differenceIdentificatorService["getLeftPixelNeighbour"](clickedPixelPos);
        expect(testImage[leftPixel]).to.equal(10);
        expect(testImage[leftPixel + 1]).to.equal(11);
        expect(testImage[leftPixel + 2]).to.equal(12);
        done();
    });

    it("should return the correct right pixel position in the test array", (done: Mocha.Done) => {
        const rightPixel: number = differenceIdentificatorService["getRightPixelNeighbour"](clickedPixelPos);
        expect(testImage[rightPixel]).to.equal(13);
        expect(testImage[rightPixel + 1]).to.equal(14);
        expect(testImage[rightPixel + 2]).to.equal(15);
        done();
    });

    it("should return the correct top right pixel position in the test array", (done: Mocha.Done) => {
        const topRightPixel: number = differenceIdentificatorService["getTopRightPixelNeighbour"](clickedPixelPos, 5);
        expect(testImage[topRightPixel]).to.equal(22);
        expect(testImage[topRightPixel + 1]).to.equal(23);
        expect(testImage[topRightPixel + 2]).to.equal(24);
        done();
    });

    it("should return the correct top pixel position in the test array", (done: Mocha.Done) => {
        const topPixel: number = differenceIdentificatorService["getTopPixelNeighbour"](clickedPixelPos, 5);
        expect(testImage[topPixel]).to.equal(19);
        expect(testImage[topPixel + 1]).to.equal(20);
        expect(testImage[topPixel + 2]).to.equal(21);
        done();
    });

    it("should return the correct top left pixel position in the test array", (done: Mocha.Done) => {
        const topLeftPixel: number = differenceIdentificatorService["getTopLeftPixelNeighbour"](clickedPixelPos, 5);
        expect(testImage[topLeftPixel]).to.equal(16);
        expect(testImage[topLeftPixel + 1]).to.equal(17);
        expect(testImage[topLeftPixel + 2]).to.equal(18);
        done();
    });

    it("should return true if a black pixel is clicked", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 2,
            yPos: 0,
            differenceImageName: "test.bmp",
        };
        expect(differenceIdentificatorService.confirmDifference(mockClickInfo, firstLineBlackPixels)).equal(true);
        done();
    });

    it("should return false if a white pixel is clicked", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 2,
            yPos: 10,
            differenceImageName: "test.bmp",
        };
        expect(differenceIdentificatorService.confirmDifference(mockClickInfo, firstLineBlackPixels)).equal(false);
        done();
    });

    it("should return the right position in the pixel array if the pixels clicked are [2,2]", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 2,
            yPos: 2,
            differenceImageName: "test.bmp",
        };
        expect(differenceIdentificatorService["getPositionInArray"](mockClickInfo)).equal(3846);
        done();
    });

    it("should return the right position in the pixel array if the pixels clicked are [300,234]", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 300,
            yPos: 234,
            differenceImageName: "test.bmp",
        };
        expect(differenceIdentificatorService["getPositionInArray"](mockClickInfo)).equal(450180);
        done();
    });

    it("should return a white pixel if the pixel clicked is at [300,234] px", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 300,
            yPos: 234,
            differenceImageName: "test.bmp",
        };
        const WHITE_PIXEL: IPixel = { red: 255, green: 255, blue: 255};
        expect(differenceIdentificatorService["getPixelAtPos"](mockClickInfo, firstLineBlackPixels)).to.deep.equal(WHITE_PIXEL);
        done();
    });

    it("should return a black pixel if the pixel clicked is at [0,234] px", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 234,
            yPos: 0,
            differenceImageName: "test.bmp",
        };
        const BLACK_PIXEL: IPixel = { red: 0, green: 0, blue: 0};
        expect(differenceIdentificatorService["getPixelAtPos"](mockClickInfo, firstLineBlackPixels)).to.deep.equal(BLACK_PIXEL);
        done();
    });

    it("should return 2 black neigbours if a line of black pixels with an height of 1 px is clicked", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 234,
            yPos: 0,
            differenceImageName: "test.bmp",
        };
        const clickPos: number = differenceIdentificatorService["getPositionInArray"](mockClickInfo);
        const blackNeighbours: number[] = differenceIdentificatorService["getBlackPixelNeighbours"](clickPos,
                                                                                                    640,
                                                                                                    firstLineBlackPixels);
        expect(blackNeighbours.length).equal(2);
        done();
    });

    it("should return 0 black neigbours if a square of white pixels is clicked", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 234,
            yPos: 2,
            differenceImageName: "test.bmp",
        };
        const clickPos: number = differenceIdentificatorService["getPositionInArray"](mockClickInfo);
        const blackNeighbours: number[] = differenceIdentificatorService["getBlackPixelNeighbours"](clickPos,
                                                                                                    640,
                                                                                                    firstLineBlackPixels);
        expect(blackNeighbours.length).equal(0);
        done();
    });

    it("should return 8 neigbours when we get the neighbours of a pixel", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 0,
            yPos: 2,
            differenceImageName: "test.bmp",
        };
        const clickPos: number = differenceIdentificatorService["getPositionInArray"](mockClickInfo);
        const neighbours: number[] = differenceIdentificatorService["getPixelNeighbours"](clickPos, 5);
        expect(neighbours.length).equal(8);
        done();
    });

    it("should erase the black line clicked at height 0px of the pixel array", (done: Mocha.Done) => {
        const mockClickInfo: IClickInfo = {
            xPos: 234,
            yPos: 0,
            differenceImageName: "test.bmp",
        };
        const clickPos: number = differenceIdentificatorService["getPositionInArray"](mockClickInfo);
        const newPixels: number[] = differenceIdentificatorService.eraseDifference(clickPos, firstLineBlackPixels, 640);

        for (let i: number = 0; i < 1920; i++) {
            expect(newPixels[i]).equal(255);
        }

        done();
    });
});
