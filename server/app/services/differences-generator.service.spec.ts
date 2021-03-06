// tslint:disable:no-magic-numbers
import { expect } from "chai";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { DifferencesGeneratorService } from "./differences-generator.service";

const originalTestImg: IBitmapImage = {height: 9, width: 9, bitDepth: 24, fileName: "", pixels: []};
for (let i: number = 0; i < 81 * 3; i++) {
    originalTestImg.pixels.push(0);
}

let differencesGeneratorService: DifferencesGeneratorService;
let modifiedTestImg: IBitmapImage;
let differenceTestImg: IBitmapImage;
let verificationArray: number[] = [];

describe("DifferenceGeneratorService", () => {
    beforeEach(() => {
        differencesGeneratorService = new DifferencesGeneratorService();
        modifiedTestImg = {height: 9, width: 9, bitDepth: 24, fileName: "", pixels: []};
        for (let i: number = 0; i < 81 * 3; i++) {
            modifiedTestImg.pixels.push(0);
        }
        differenceTestImg = {height: 9, width: 9, bitDepth: 24, fileName: "", pixels: []};
        for (let i: number = 0; i < 81 * 3; i ++) {
            differenceTestImg.pixels.push(255);
        }
        verificationArray = [];
    });

    it("fillDifferenceImage, identical pixels should create white pixels", (done: Mocha.Done) => {
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg)
        .pixels[81 * 3 - 1]).to.equal(255);
        done();
    });

    it("fillDifferenceImage, a black pixel should be created when the red parameter of two corresponding pixels is different",
       (done: Mocha.Done) => {
        modifiedTestImg.pixels[81 * 3 - 3] = 255;
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg)
        .pixels[81 * 3 - 1])
        .to.equal(0);
        done();
    });

    it("fillDifferenceImage, a black pixel should be created when the green parameter of two corresponding pixels is different",
       (done: Mocha.Done) => {
        modifiedTestImg.pixels[81 * 3 - 2] = 255;
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg)
        .pixels[81 * 3 - 1])
        .to.equal(0);
        done();
    });

    it("fillDifferenceImage, a black pixel should be created when the blue parameter of two corresponding pixels is different",
       (done: Mocha.Done) => {
        modifiedTestImg.pixels[81 * 3 - 1] = 255;
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg)
        .pixels[81 * 3 - 1])
        .to.equal(0);
        done();
    });

    it("enlargeBlackPixels, a pixel should be widened by 36 pixels around him", (done: Mocha.Done) => {
        differenceTestImg.pixels[40 * 3] = 0;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[36], pixelsArray[39], pixelsArray[42], pixelsArray[60], pixelsArray[63],
                                          pixelsArray[66], pixelsArray[69], pixelsArray[72], pixelsArray[84], pixelsArray[87],
                                          pixelsArray[90], pixelsArray[93], pixelsArray[96], pixelsArray[99], pixelsArray[102],
                                          pixelsArray[111], pixelsArray[114], pixelsArray[117], pixelsArray[123],
                                          pixelsArray[126], pixelsArray[129], pixelsArray[138], pixelsArray[141], pixelsArray[144],
                                          pixelsArray[147], pixelsArray[150], pixelsArray[153], pixelsArray[156], pixelsArray[168],
                                          pixelsArray[171], pixelsArray[174], pixelsArray[177], pixelsArray[180], pixelsArray[198],
                                          pixelsArray[201], pixelsArray[204]];
        for (let i: number = 0; i < 36; i++) {
            verificationArray.push(0);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("enlargeBlackPixels, a pixel should not be widened by more than the region of 36 pixels", (done: Mocha.Done) => {
        differenceTestImg.pixels[40 * 3] = 0;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[9], pixelsArray[12], pixelsArray[15], pixelsArray[33], pixelsArray[45],
                                          pixelsArray[57], pixelsArray[75], pixelsArray[81], pixelsArray[105], pixelsArray[108],
                                          pixelsArray[132], pixelsArray[135], pixelsArray[159], pixelsArray[165], pixelsArray[183],
                                          pixelsArray[195], pixelsArray[207], pixelsArray[225], pixelsArray[228], pixelsArray[231]];
        for (let i: number = 0; i < 20; i++) {
            verificationArray.push(255);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("enlargeBlackPixels, The widening of a pixel should not exceed the bottom border of the bitmap (no black bits on the top)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[76 * 3] = 0;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[0], pixelsArray[3], pixelsArray[6], pixelsArray[9], pixelsArray[12],
                                          pixelsArray[15], pixelsArray[18], pixelsArray[21], pixelsArray[24]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(255);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("enlargeBlackPixels, The widening of a pixel should not exceed the top border of the bitmap (no black bits on the bottom)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[4 * 3] = 0;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[216], pixelsArray[219], pixelsArray[222], pixelsArray[225], pixelsArray[228],
                                          pixelsArray[231], pixelsArray[234], pixelsArray[237], pixelsArray[240]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(255);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("enlargeBlackPixels, the widening of a pixel should not exceed the left border of the bitmap (no black bits on the right)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[36 * 3] = 0;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[24], pixelsArray[51], pixelsArray[78], pixelsArray[105], pixelsArray[132],
                                          pixelsArray[159], pixelsArray[186], pixelsArray[213], pixelsArray[240]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(255);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("enlargeBlackPixels, The widening of a pixel should not exceed the right border of the bitmap (no black bits on the left)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[44 * 3] = 0;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[0], pixelsArray[27], pixelsArray[54], pixelsArray[81], pixelsArray[108],
                                          pixelsArray[135], pixelsArray[162], pixelsArray[189], pixelsArray[216]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(255);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("generateDifferences, Two images with only 1 different pixel should return an image with the expected pixel widened",
       (done: Mocha.Done) => {
        modifiedTestImg.pixels[40 * 3] = 255;
        const pixelsArray: number[] = differencesGeneratorService.generateDifferences(originalTestImg, modifiedTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[36], pixelsArray[39], pixelsArray[42], pixelsArray[60], pixelsArray[63],
                                          pixelsArray[66], pixelsArray[69], pixelsArray[72], pixelsArray[84], pixelsArray[87],
                                          pixelsArray[90], pixelsArray[93], pixelsArray[96], pixelsArray[99], pixelsArray[102],
                                          pixelsArray[111], pixelsArray[114], pixelsArray[117], pixelsArray[123],
                                          pixelsArray[126], pixelsArray[129], pixelsArray[138], pixelsArray[141], pixelsArray[144],
                                          pixelsArray[147], pixelsArray[150], pixelsArray[153], pixelsArray[156], pixelsArray[168],
                                          pixelsArray[171], pixelsArray[174], pixelsArray[177], pixelsArray[180], pixelsArray[198],
                                          pixelsArray[201], pixelsArray[204]];
        for (let i: number = 0; i < 36; i++) {
            verificationArray.push(0);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });
});
