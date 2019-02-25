// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as fs from "fs";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { firstLineBlackPixels } from "../../mock/bitmapImage-mock";
import { BitmapDecoder } from "./bitmap-decoder.service";
import { BitmapEncoder } from "./bitmap-encoder.service";
import { BmpFileGenerator } from "./bmp-file-generator.service";

let bitmapDecoder: BitmapDecoder;

describe("bit-map-encoder-service", () => {
    beforeEach(() => {
        bitmapDecoder = new BitmapDecoder();
    });

    it("should flip the image on the Y axis", (done: Function) => {
        const flippedImage: number[] = bitmapDecoder.flipPixelsOnYAxis(firstLineBlackPixels);
        // Expect last line to be black pixels
        for (let i: number = 919680; i < 921600; i++ ) {
            expect(flippedImage[i]).to.equal(0);
        }
        // Expect first line to be white pixels
        for (let i: number = 0; i < 1920; i++ ) {
            expect(flippedImage[i]).to.equal(255);
        }
        done();
    });

    it("should be equal to the original array if two flips on the Y axis are executed", (done: Function) => {
        const flippedImage: number[] = bitmapDecoder.flipPixelsOnYAxis(firstLineBlackPixels);
        const reFlippedImage: number[] = bitmapDecoder.flipPixelsOnYAxis(flippedImage);
        expect(firstLineBlackPixels).to.deep.equal(reFlippedImage);
        done();
    });

    it("should correctly transfer the data from a buffer to an array buffer", (done: Function) => {
        const buffer: Buffer = Buffer.alloc(5);
        buffer.writeInt8(-3, 0);
        buffer.writeInt8(1, 1);
        buffer.writeInt8(20, 2);
        const arrayBufferData: number[] = Array.from(new Int8Array(bitmapDecoder["toArrayBuffer"](buffer), 0));
        expect(arrayBufferData[0]).to.equal(buffer.readInt8(0));
        expect(arrayBufferData[1]).to.equal(buffer.readInt8(1));
        expect(arrayBufferData[2]).to.equal(buffer.readInt8(2));
        done();
    });

    it("should correctly get the pixels from a specified path", (done: Function) => {
        const bmpGeneratorService: BmpFileGenerator = new BmpFileGenerator(new BitmapEncoder());
        const bmpImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "test.bmp", pixels: firstLineBlackPixels };
        bmpGeneratorService["generateOriginalBMPFile"](bmpImg);
        expect(bitmapDecoder.getPixels("/public/originalImages/test.bmp")).to.deep.equal(firstLineBlackPixels);
        fs.unlinkSync(process.cwd() + "/public/originalImages/test.bmp");

        done();
    });
});
