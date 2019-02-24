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
import {Constants} from "../../../common/communication/Constants";

@injectable()
export class BitmapEncoder {
    public position: number;

    public constructor(/**/) {
        this.position = 0;
    }

    public encodeBitmap(image: IBitmapImage): Buffer {
        this.position = 0;
        const PIXELS: number[] = image.pixels;

        let tempBuffer: Buffer = Buffer.alloc(Constants.FILE_SIZE);

        tempBuffer = this.writeHeader(tempBuffer);
        tempBuffer = this.writePixels(tempBuffer, PIXELS);

        return tempBuffer;
    }

    private writeHeader(tempBuffer: Buffer): Buffer {
        tempBuffer.write(Constants.FLAG, this.position, Constants.TWO_BYTES); this.position += Constants.TWO_BYTES;
        tempBuffer.writeUInt32LE(Constants.FILE_SIZE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.DUMMY_VALUE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.OFFSET_SIZE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.HEADER_SIZE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.VALID_BMP_WIDTH, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeInt32LE(-Constants.VALID_BMP_HEIGHT, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt16LE(Constants.PLANES, this.position); this.position += Constants.TWO_BYTES;
        tempBuffer.writeUInt16LE(Constants.ACCEPTED_BIT_DEPTH, this.position); this.position += Constants.TWO_BYTES;
        tempBuffer.writeUInt32LE(Constants.DUMMY_VALUE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.RGB_SIZE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.DUMMY_VALUE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.DUMMY_VALUE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.DUMMY_VALUE, this.position); this.position += Constants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(Constants.DUMMY_VALUE, this.position); this.position += Constants.FOUR_BYTES;

        return tempBuffer;
    }

    private writePixels(tempBuffer: Buffer, pixels: number[]): Buffer {
        let i: number = 0;
        const ROW_BYTES: number = (Constants.VALID_BMP_WIDTH * Constants.BYTES_PER_PIXEL) + Constants.EXTRA_BYTES;

        for (let y: number = Constants.VALID_BMP_HEIGHT - 1; y >= 0; y--) {
            for (let x: number = 0; x < Constants.VALID_BMP_WIDTH; x++) {
                const PIXEL_POS: number = this.position + y * ROW_BYTES + x * Constants.BYTES_PER_PIXEL;
                tempBuffer[PIXEL_POS] = pixels[i++];
                tempBuffer[PIXEL_POS + 1] = pixels[i++];
                tempBuffer[PIXEL_POS + 1 + 1] = pixels[i++];
            }
            const FILL_OFFSET: number = this.position + y * ROW_BYTES + Constants.VALID_BMP_WIDTH * Constants.BYTES_PER_PIXEL;
            tempBuffer.fill(0, FILL_OFFSET, FILL_OFFSET + Constants.EXTRA_BYTES);
        }

        return tempBuffer;
    }

}
