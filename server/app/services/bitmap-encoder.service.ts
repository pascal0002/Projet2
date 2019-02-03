import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";

@injectable()
export class BitmapEncoder {
    public pos: number = 0;

    public encodeBitmap(image: IBitmapImage): Buffer {
        this.pos = 0;
        const PIXELS: number[] = image.pixels;

        let tempBuffer: Buffer = Buffer.alloc(ServerConstants.FILE_SIZE);

        tempBuffer = this.writeHeader(tempBuffer);
        tempBuffer = this.writePixels(tempBuffer, PIXELS);

        return tempBuffer;
    }

    public writeHeader(tempBuffer: Buffer): Buffer {
        tempBuffer.write(ServerConstants.FLAG, this.pos, ServerConstants.TWO_BYTES); this.pos += ServerConstants.TWO_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.FILE_SIZE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.OFFSET_SIZE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.HEADER_SIZE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.ACCEPTED_WIDTH, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeInt32LE(-ServerConstants.ACCEPTED_HEIGHT, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt16LE(ServerConstants.PLANES, this.pos); this.pos += ServerConstants.TWO_BYTES;
        tempBuffer.writeUInt16LE(ServerConstants.ACCEPTED_BIT_DEPTH, this.pos); this.pos += ServerConstants.TWO_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.RGB_SIZE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.pos); this.pos += ServerConstants.FOUR_BYTES;
        tempBuffer.writeUInt32LE(ServerConstants.DUMMY_VALUE, this.pos); this.pos += ServerConstants.FOUR_BYTES;

        return tempBuffer;
    }

    public writePixels(tempBuffer: Buffer, pixels: number[]): Buffer {
        let i: number = 0;
        const ROW_BYTES: number = (ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL) + ServerConstants.EXTRA_BYTES;

        for (let y: number = ServerConstants.ACCEPTED_HEIGHT - 1; y >= 0; y--) {
            for (let x: number = 0; x < ServerConstants.ACCEPTED_WIDTH; x++) {
                const PIXEL_POS: number = this.pos + y * ROW_BYTES + x * ServerConstants.BYTES_PER_PIXEL;
                tempBuffer[PIXEL_POS] = pixels[i++];
                tempBuffer[PIXEL_POS + 1] = pixels[i++];
                tempBuffer[PIXEL_POS + 1 + 1] = pixels[i++];
            }
            const FILL_OFFSET: number = this.pos + y * ROW_BYTES + ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL;
            tempBuffer.fill(0, FILL_OFFSET, FILL_OFFSET + ServerConstants.EXTRA_BYTES);
        }

        return tempBuffer;
    }

}
