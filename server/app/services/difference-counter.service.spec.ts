// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { blackBitmap, diagonalDifferenceBitmap, fourCornerBlackBitmap, leftBottomBlackBitmap, leftTopBlackBitmap,
         rightBottomBlackBitmap, rightTopBlackBitmap, whiteBitmap } from "../../mock/bitmapImage-mock";
import { DifferenceCounterService } from "./difference-counter.service";

let differenceCounterService: DifferenceCounterService;

describe("difference-counter-service", () => {
    beforeEach(() => {
        differenceCounterService = new DifferenceCounterService();
    });

    it("getNumberOfDifferences, should return 0 when the difference image is white", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(whiteBitmap)).equal(0);
        done();
    });

    it("getNumberOfDifferences, should return 1 when the difference image is black", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(blackBitmap)).equal(1);
        done();
    });

    it("getNumberOfDifferences, should return 1 when the left bottom corner of the difference image is black", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(leftBottomBlackBitmap)).equal(1);
        done();
    });

    it("getNumberOfDifferences, should return 1 when the left top corner of the difference image is black", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(leftTopBlackBitmap)).equal(1);
        done();
    });

    it("getNumberOfDifferences, should return 1 when the right bottom corner of the difference image is black", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(rightBottomBlackBitmap)).equal(1);
        done();
    });

    it("getNumberOfDifferences, should return 1 when the right top corner of the difference image is black", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(rightTopBlackBitmap)).equal(1);
        done();
    });

    it("getNumberOfDifferences, should return 4 when the 4 corners of the difference image are black", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(fourCornerBlackBitmap)).equal(4);
        done();
    });

    it("getNumberOfDifferences, should return 1 when the difference image contain 1 difference with diagonal link ", (done: Function) => {
        expect(differenceCounterService.getNumberOfDifferences(diagonalDifferenceBitmap)).equal(1);
        done();
    });

});
