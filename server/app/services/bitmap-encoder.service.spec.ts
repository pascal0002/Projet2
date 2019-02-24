// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { Constants } from "../../../common/communication/Constants";
import { BitmapEncoder } from "./bitmap-encoder.service";

let bitmapEncoder: BitmapEncoder;

describe("bit-map-encoder-service", () => {
    beforeEach(() => {
        bitmapEncoder = new BitmapEncoder();
    });

    it("should write at the right position the correct BMP header info.", (done: Function) => {
        let tempBuffer: Buffer = Buffer.alloc(Constants.FILE_SIZE);
        let position: number = 0;
        tempBuffer = bitmapEncoder["writeHeader"](tempBuffer);
        position += Constants.TWO_BYTES;

        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.FILE_SIZE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.DUMMY_VALUE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.OFFSET_SIZE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.HEADER_SIZE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.VALID_BMP_WIDTH); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readInt32LE(position)).to.equal(-Constants.VALID_BMP_HEIGHT); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readInt16LE(position)).to.equal(Constants.PLANES); position += Constants.TWO_BYTES;
        expect(tempBuffer.readInt16LE(position)).to.equal(Constants.ACCEPTED_BIT_DEPTH); position += Constants.TWO_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.DUMMY_VALUE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.RGB_SIZE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.DUMMY_VALUE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.DUMMY_VALUE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.DUMMY_VALUE); position += Constants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(Constants.DUMMY_VALUE); position += Constants.FOUR_BYTES;

        done();
    });
});
