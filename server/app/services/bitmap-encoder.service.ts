import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";

const FOUR_BYTES: number = 4;
const TWO_BYTES: number = 2;
const BYTES_PER_PIXEL: number = 3;
const DUMMY_VALUE: number = 0;

@injectable()
export class BitmapEncoder {
    public pixels: number[];
    public width: number;
    public height: number;
    public extraBytes: number;
    public rgbSize: number;
    public headerInfoSize: number = 40;
    public flag: string = "BM";
    public reserved: number = DUMMY_VALUE;
    public offset: number = 54;
    public fileSize: number;
    public planes: number = 1;
    public bitPerPixel: number = 24;
    public compress: number = DUMMY_VALUE;
    public horizontalResolution: number = DUMMY_VALUE;
    public verticalResolution: number = DUMMY_VALUE;
    public colors: number = DUMMY_VALUE;
    public importantColors: number = DUMMY_VALUE;
    public pos: number;

    public encodeBitmap(image: IBitmapImage): Buffer {
        this.pos = 0;
        this.pixels = image.pixels;
        this.width = image.width;
        this.height = image.height;
        this.extraBytes = this.width % FOUR_BYTES;
        this.rgbSize = this.height * ((this.width * BYTES_PER_PIXEL) + this.extraBytes);
        this.fileSize = this.rgbSize + this.offset;

        let tempBuffer: Buffer = Buffer.alloc(this.offset + this.rgbSize);

        tempBuffer = this.writeHeader(tempBuffer);
        tempBuffer = this.writePixels(tempBuffer);

        return tempBuffer;
    }

    public setEncoderInfo(image: IBitmapImage): void {
        this.pixels = image.pixels;
        this.width = image.width;
        this.height = image.height;
    }

    public writeHeader(tempBuffer: Buffer): Buffer {

        tempBuffer.write(this.flag, this.pos, TWO_BYTES); this.pos += TWO_BYTES;
        tempBuffer.writeUInt32LE(this.fileSize, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.reserved, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.offset, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.headerInfoSize, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.width, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeInt32LE(-this.height, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt16LE(this.planes, this.pos); this.pos += TWO_BYTES;
        tempBuffer.writeUInt16LE(this.bitPerPixel, this.pos); this.pos += TWO_BYTES;
        tempBuffer.writeUInt32LE(this.compress, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.rgbSize, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.horizontalResolution, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.verticalResolution, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.colors, this.pos); this.pos += FOUR_BYTES;
        tempBuffer.writeUInt32LE(this.importantColors, this.pos); this.pos += FOUR_BYTES;

        return tempBuffer;
    }

    public writePixels(tempBuffer: Buffer): Buffer {
        let i: number = 0;
        const ROW_BYTES: number = (this.width * BYTES_PER_PIXEL) + this.extraBytes;

        for (let y: number = this.height - 1; y >= 0; y--) {
            for (let x: number = 0; x < this.width; x++) {
                const PIXEL_POS: number = this.pos + y * ROW_BYTES + x * BYTES_PER_PIXEL;
                tempBuffer[PIXEL_POS] = this.pixels[i++];
                tempBuffer[PIXEL_POS + 1] = this.pixels[i++];
                tempBuffer[PIXEL_POS + 1 + 1] = this.pixels[i++];
            }
            if (this.extraBytes > 0) {
                const FILL_OFFSET: number = this.pos + y * ROW_BYTES + this.width * BYTES_PER_PIXEL;
                tempBuffer.fill(0, FILL_OFFSET, FILL_OFFSET + this.extraBytes);
            }
        }

        return tempBuffer;
    }

}
