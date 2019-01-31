import { expect } from "chai";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { DifferencesGeneratorService } from "./differences-generator.service";

const WHITE_PIXEL_PARAMETER: number = 255;
const BLACK_PIXEL_PARAMETER: number = 0;
const PIXEL_NB: number = 81;
const PIXEL_PARAMETERS_NB: number = 3;
const CENTER: number = 40;
const BOTTOM: number = 76;
const TOP: number = 4;
const LEFT: number = 36;
const RIGHT: number = 44;
const originalTestImg: IBitmapImage = {height: 9, width: 9, bitDepth: 24, fileName: "", pixels: []};
for (let i: number = 0; i < PIXEL_NB * PIXEL_PARAMETERS_NB; i++) {
    originalTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
}

let differencesGeneratorService: DifferencesGeneratorService;
let modifiedTestImg: IBitmapImage;
let differenceTestImg: IBitmapImage;
let verificationArray: number[] = [];

describe("DifferenceGeneratorService", () => {
    beforeEach(() => {
        differencesGeneratorService = new DifferencesGeneratorService();
        modifiedTestImg = {height: 9, width: 9, bitDepth: 24, fileName: "", pixels: []};
        for (let i: number = 0; i < (PIXEL_NB - 1) * PIXEL_PARAMETERS_NB; i++) {
            modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        }
        differenceTestImg = {height: 9, width: 9, bitDepth: 24, fileName: "", pixels: []};
        for (let i: number = 0; i < PIXEL_NB * PIXEL_PARAMETERS_NB; i ++) {
            differenceTestImg.pixels.push(WHITE_PIXEL_PARAMETER);
        }
        verificationArray = [];
    });

    it("des pixels identiques devraient créer des pixels blancs", (done: Mocha.Done) => {
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg).pixels[PIXEL_NB * PIXEL_PARAMETERS_NB - 1])
        .to.equal(WHITE_PIXEL_PARAMETER);
        done();
    });

    it("un pixel noir devrait être créé lorsque le paramètre rouge de deux pixels correspondants est différent", (done: Mocha.Done) => {
        modifiedTestImg.pixels.push(WHITE_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg).pixels[PIXEL_NB * PIXEL_PARAMETERS_NB - 1])
        .to.equal(BLACK_PIXEL_PARAMETER);
        done();
    });

    it("un pixel noir devrait être créé lorsque le paramètre vert de deux pixels correspondants est différent", (done: Mocha.Done) => {
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(WHITE_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg).pixels[PIXEL_NB * PIXEL_PARAMETERS_NB - 1])
        .to.equal(BLACK_PIXEL_PARAMETER);
        done();
    });

    it("un pixel noir devrait être créé lorsque le paramètre bleu de deux pixels correspondants est différent", (done: Mocha.Done) => {
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(BLACK_PIXEL_PARAMETER);
        modifiedTestImg.pixels.push(WHITE_PIXEL_PARAMETER);
        expect(differencesGeneratorService.fillDifferenceImage(originalTestImg, modifiedTestImg).pixels[PIXEL_NB * PIXEL_PARAMETERS_NB - 1])
        .to.equal(BLACK_PIXEL_PARAMETER);
        done();
    });

    it("Un pixel est élargis de 36 pixels autour de lui", (done: Mocha.Done) => {
        differenceTestImg.pixels[CENTER * PIXEL_PARAMETERS_NB] = BLACK_PIXEL_PARAMETER;
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
            verificationArray.push(BLACK_PIXEL_PARAMETER);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("Un pixel n'est pas élargis plus que la région de 36 pixels", (done: Mocha.Done) => {
        differenceTestImg.pixels[CENTER * PIXEL_PARAMETERS_NB] = BLACK_PIXEL_PARAMETER;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[9], pixelsArray[12], pixelsArray[15], pixelsArray[33], pixelsArray[45],
                                          pixelsArray[57], pixelsArray[75], pixelsArray[81], pixelsArray[105], pixelsArray[108],
                                          pixelsArray[132], pixelsArray[135], pixelsArray[159], pixelsArray[165], pixelsArray[183],
                                          pixelsArray[195], pixelsArray[207], pixelsArray[225], pixelsArray[228], pixelsArray[231]];
        for (let i: number = 0; i < 20; i++) {
            verificationArray.push(WHITE_PIXEL_PARAMETER);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("L'élargissement d'un pixel ne devrait pas dépasser la bordure inférieure de l'image bitmap (pas de bits noirs en haut)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[BOTTOM * PIXEL_PARAMETERS_NB] = BLACK_PIXEL_PARAMETER;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[0], pixelsArray[3], pixelsArray[6], pixelsArray[9], pixelsArray[12],
                                          pixelsArray[15], pixelsArray[18], pixelsArray[21], pixelsArray[24]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(WHITE_PIXEL_PARAMETER);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("L'élargissement d'un pixel ne devrait pas dépasser la bordure supérieure de l'image bitmap (pas de bits noirs en bas)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[TOP * PIXEL_PARAMETERS_NB] = BLACK_PIXEL_PARAMETER;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[216], pixelsArray[219], pixelsArray[222], pixelsArray[225], pixelsArray[228],
                                          pixelsArray[231], pixelsArray[234], pixelsArray[237], pixelsArray[240]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(WHITE_PIXEL_PARAMETER);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("L'élargissement d'un pixel ne devrait pas dépasser la bordure gauche de l'image bitmap (pas de bits noirs a droite)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[LEFT * PIXEL_PARAMETERS_NB] = BLACK_PIXEL_PARAMETER;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[24], pixelsArray[51], pixelsArray[78], pixelsArray[105], pixelsArray[132],
                                          pixelsArray[159], pixelsArray[186], pixelsArray[213], pixelsArray[240]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(WHITE_PIXEL_PARAMETER);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });

    it("L'élargissement d'un pixel ne devrait pas dépasser la bordure droite de l'image bitmap (pas de bits noirs a gauche)",
       (done: Mocha.Done) => {
        differenceTestImg.pixels[RIGHT * PIXEL_PARAMETERS_NB] = BLACK_PIXEL_PARAMETER;
        const pixelsArray: number[] = differencesGeneratorService.enlargeBlackPixels(differenceTestImg).pixels;
        const pixelsToVerify: number[] = [pixelsArray[0], pixelsArray[27], pixelsArray[54], pixelsArray[81], pixelsArray[108],
                                          pixelsArray[135], pixelsArray[162], pixelsArray[189], pixelsArray[216]];
        for (let i: number = 0; i < 9; i++) {
            verificationArray.push(WHITE_PIXEL_PARAMETER);
        }
        expect(pixelsToVerify).deep.equal(verificationArray);
        done();
    });
});
