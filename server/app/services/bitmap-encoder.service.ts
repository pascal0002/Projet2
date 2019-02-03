/***************************************************************************************
*    Code qui référence un encodeur en ligne.
*    Title: encoder.js
*    Author: Shaozilee
*    Date: 23 avril 2018
*    Code version: 0.1.0
*    Availability: https://github.com/shaozilee/bmp-js/blob/master/lib/encoder.js
*
***************************************************************************************/

import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";

@injectable()
export class BitmapEncoder {
    public position: number;

    public constructor(/**/) {
        this.position = 0;
    }

    public encodeBitmap(image: IBitmapImage): Buffer {
        this.position = 0;
        const PIXELS: number[] = image.pixels;

        let tempBuffer: Buffer = Buffer.alloc(ServerConstants.FILE_SIZE);

        tempBuffer = this.writeHeader(tempBuffer);
        tempBuffer = this.writePixels(tempBuffer, PIXELS);

        return tempBuffer;
    }

    public writeHeader(tempBuffer: Buffer): Buffer {
        tempBuffer.write(ServerConstants.FLAG, this.position, ServerConstants.TWO_BYTES); this.position += ServerConstants.TWO_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.FILE_SIZE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.OFFSET_SIZE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.HEADER_SIZE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.ACCEPTED_WIDTH, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeInt32LE(-ServerConstants.ACCEPTED_HEIGHT, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt16LE(ServerConstants.PLANES, this.position); this.position += ServerConstants.TWO_BYTES;
        tempBuffer.writeUInt16LE(ServerConstants.ACCEPTED_BIT_DEPTH, this.position); this.position += ServerConstants.TWO_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.RGB_SIZE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.position); this.position += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.position); this.position += ServerConstants.FOUR_BYTES;

        return tempBuffer;
    }

    public writePixels(tempBuffer: Buffer, pixels: number[]): Buffer {
        let i: number = 0;
        const ROW_BYTES: number = (ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL) + ServerConstants.EXTRA_BYTES;

        for (let y: number = ServerConstants.ACCEPTED_HEIGHT - 1; y >= 0; y--) {
            for (let x: number = 0; x < ServerConstants.ACCEPTED_WIDTH; x++) {
                const PIXEL_POS: number = this.position + y * ROW_BYTES + x * ServerConstants.BYTES_PER_PIXEL;
                tempBuffer[PIXEL_POS] = pixels[i++];
                tempBuffer[PIXEL_POS + 1] = pixels[i++];
                tempBuffer[PIXEL_POS + 1 + 1] = pixels[i++];
            }
            const FILL_OFFSET: number = this.position + y * ROW_BYTES + ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL;
            tempBuffer.fill(0, FILL_OFFSET, FILL_OFFSET + ServerConstants.EXTRA_BYTES);
        }

        return tempBuffer;
    }

}
