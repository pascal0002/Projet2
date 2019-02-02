import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";

const FOUR_BYTES: number = 4;
const TWO_BYTES: number = 2;
const BYTES_PER_PIXEL: number = 3;
const DUMMY_VALUE: number = 0;
const OFFSET_SIZE: number = 54;
const HEADER_SIZE: number = 40;
const FLAG: string = "BM";
const PLANES: number = 1;
const BITS_PER_PIXEL: number = 24;
const IMAGE_HEIGHT: number = 480;
const IMAGE_WIDTH: number = 640;
const EXTRA_BYTES: number = IMAGE_WIDTH % FOUR_BYTES;
const RGB_SIZE: number = IMAGE_HEIGHT * ((IMAGE_WIDTH * BYTES_PER_PIXEL) + EXTRA_BYTES);
const FILE_SIZE: number = RGB_SIZE + OFFSET_SIZE;

@injectable()
export class BitmapEncoder {
    public pos: number;

    public encodeBitmap(image: IBitmapImage): Buffer {
        this.pos = 0;
        const PIXELS: number[] = image.pixels;

        let tempBuffer: Buffer = Buffer.alloc(FILE_SIZE);

        tempBuffer = this.writeHeader(tempBuffer);
        tempBuffer = this.writePixels(tempBuffer, PIXELS);

        return tempBuffer;
    }

    public writeHeader(tempBuffer: Buffer): Buffer {
        tempBuffer.write(FLAG, this.pos, TWO_BYTES); this.pos += TWO_BYTES;
        tempBuffer.writeUInt32LE(FILE_SIZE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(DUMMY_VALUE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(OFFSET_SIZE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(HEADER_SIZE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(IMAGE_WIDTH, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeInt32LE(-IMAGE_HEIGHT, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt16LE(PLANES, this.pos); this.pos += TWO_BYTES;
        tempBuffer.writeUInt16LE(BITS_PER_PIXEL, this.pos); this.pos += TWO_BYTES;
        tempBuffer.writeUInt32LE(DUMMY_VALUE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(RGB_SIZE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(DUMMY_VALUE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(DUMMY_VALUE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(DUMMY_VALUE, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(DUMMY_VALUE, this.pos); this.pos += FOUR_BYTES;

        return tempBuffer;
    }

    public writePixels(tempBuffer: Buffer, pixels: number[]): Buffer {
        let i: number = 0;
        const ROW_BYTES: number = (IMAGE_WIDTH * BYTES_PER_PIXEL) + EXTRA_BYTES;

        for (let y: number = IMAGE_HEIGHT - 1; y >= 0; y--) {
            for (let x: number = 0; x < IMAGE_WIDTH; x++) {
                const PIXEL_POS: number = this.pos + y * ROW_BYTES + x * BYTES_PER_PIXEL;
                tempBuffer[PIXEL_POS] = pixels[i++];
                tempBuffer[PIXEL_POS + 1] = pixels[i++];
                tempBuffer[PIXEL_POS + 1 + 1] = pixels[i++];
            }
            const FILL_OFFSET: number = this.pos + y * ROW_BYTES + IMAGE_WIDTH * BYTES_PER_PIXEL;
            tempBuffer.fill(0, FILL_OFFSET, FILL_OFFSET + EXTRA_BYTES);
        }

        return tempBuffer;
    }

}
