// tslint:disable:no-magic-numbers
import { expect } from "chai";
import { ServerConstants } from "../../../common/communication/Constants";
import { BitmapEncoder } from "./bitmap-encoder.service";

let bitmapEncoder: BitmapEncoder;

describe("bit-map-encoder-service", () => {
    beforeEach(() => {
        bitmapEncoder = new BitmapEncoder();
    });

    it("should write at the right position the correct BMP header info.", (done: Function) => {
        let tempBuffer: Buffer = Buffer.alloc(ServerConstants.FILE_SIZE);
        let position: number = 0;
        tempBuffer = bitmapEncoder["writeHeader"](tempBuffer);
        position += ServerConstants.TWO_BYTES;

        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.FILE_SIZE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.DUMMY_VALUE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.OFFSET_SIZE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.HEADER_SIZE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.ACCEPTED_WIDTH); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readInt32LE(position)).to.equal(-ServerConstants.ACCEPTED_HEIGHT); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readInt16LE(position)).to.equal(ServerConstants.PLANES); position += ServerConstants.TWO_BYTES;
        expect(tempBuffer.readInt16LE(position)).to.equal(ServerConstants.ACCEPTED_BIT_DEPTH); position += ServerConstants.TWO_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.DUMMY_VALUE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.RGB_SIZE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.DUMMY_VALUE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.DUMMY_VALUE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.DUMMY_VALUE); position += ServerConstants.FOUR_BYTES;
        expect(tempBuffer.readUInt32LE(position)).to.equal(ServerConstants.DUMMY_VALUE); position += ServerConstants.FOUR_BYTES;

        done();
    });
});
