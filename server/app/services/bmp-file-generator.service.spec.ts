// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as fs from "fs";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IFormInfo } from "../../../common/communication/FormInfo";
import { BitmapEncoder } from "./bitmap-encoder.service";
import { BmpFileGenerator } from "./bmp-file-generator.service";

let bmpFileGenerator: BmpFileGenerator;

const TEST_IMAGE: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "blank.bmp", pixels: []};
for (let i: number = 0; i < ((TEST_IMAGE.height * TEST_IMAGE.width) * 3); i++) {
    TEST_IMAGE.pixels.push(0);
}

const TEST_FORM: IFormInfo = {
    originalImage: TEST_IMAGE,
    modifiedImage: TEST_IMAGE,
    gameName: "",
};

describe("bit-map-file-generator-service", () => {
    beforeEach(() => {
        bmpFileGenerator = new BmpFileGenerator(new BitmapEncoder());
    });

    it("should create a file in the originalImages directory if we call a generateOriginalBMP.", (done: Function) => {
        const FILE_PATH: string = process.cwd() + "/public/originalImages/blank.bmp";
        bmpFileGenerator.generateOriginalBMPFile(TEST_IMAGE);

        expect(fs.existsSync(FILE_PATH)).to.equal(true);

        fs.unlinkSync(FILE_PATH);

        done();
    });

    it("should create a file in the modifiedImages directory if we call a generateModifiedBMP.", (done: Function) => {
        const FILE_PATH: string = process.cwd() + "/public/modifiedImages/blank.bmp";
        bmpFileGenerator.generateModifedBMPFile(TEST_IMAGE);

        expect(fs.existsSync(FILE_PATH)).to.equal(true);

        fs.unlinkSync(FILE_PATH);

        done();
    });

    it("should create a file in the differenceImages directory if we call a generateDifferenceBMP.", (done: Function) => {
        const FILE_PATH: string = process.cwd() + "/public/differenceImages/blank.bmp";
        bmpFileGenerator.generateDifferenceBMPFile(TEST_IMAGE);

        expect(fs.existsSync(FILE_PATH)).to.equal(true);

        fs.unlinkSync(FILE_PATH);

        done();
    });

    it("should create files in all three images directory if we call a generateBMPFiles.", (done: Function) => {
        const FILE_PATH_DIFF_IMG: string = process.cwd() + "/public/differenceImages/blank.bmp";
        const FILE_PATH_ORIGINAL_IMG: string = process.cwd() + "/public/originalImages/blank.bmp";
        const FILE_PATH_MODIFIED_IMG: string = process.cwd() + "/public/modifiedImages/blank.bmp";

        bmpFileGenerator.generateBMPFiles(TEST_FORM, TEST_IMAGE);

        expect(fs.existsSync(FILE_PATH_ORIGINAL_IMG)).to.equal(true);
        expect(fs.existsSync(FILE_PATH_MODIFIED_IMG)).to.equal(true);
        expect(fs.existsSync(FILE_PATH_DIFF_IMG)).to.equal(true);

        fs.unlinkSync(FILE_PATH_ORIGINAL_IMG);
        fs.unlinkSync(FILE_PATH_MODIFIED_IMG);
        fs.unlinkSync(FILE_PATH_DIFF_IMG);

        done();
    });
});
