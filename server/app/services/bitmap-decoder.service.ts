// Ryan a dit que c'est ok de disable lint pour ca
// tslint:disable-next-line:variable-name typedef
const DataView = require("buffer-dataview");
import * as fs from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { ClientConstants, ServerConstants } from "../../../common/communication/Constants";

@injectable()
export class BitmapDecoder {
    public getPixels(path: string): number[] {
        let buffer: Buffer = Buffer.alloc(ServerConstants.FILE_SIZE);
        buffer = fs.readFileSync(process.cwd() + path);
        const dataView: DataView = new DataView(buffer);
        const pixelsPosition: number = dataView.getUint32(ClientConstants.PIXEL_OFFSET, true);
        const inversedPixels: number[] = Array.from(new Uint8Array(this.toArrayBuffer(buffer), pixelsPosition));

        return this.flipPixelsOnYAxis(inversedPixels);
    }

    public flipPixelsOnYAxis(pixels: number[]): number[] {
        const flippedPixels: number[] = [];
        for (let y: number = (ServerConstants.ACCEPTED_HEIGHT - 1); y >= 0; y--) {
            for (let x: number = 0; x < ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL; x++) {
                flippedPixels.push(pixels[y * ServerConstants.ACCEPTED_WIDTH * ServerConstants.BYTES_PER_PIXEL + x]);
            }
        }

        return flippedPixels;
    }

    public toArrayBuffer(buffer: Buffer): ArrayBuffer {
        const ab: ArrayBuffer = new ArrayBuffer(buffer.length);
        const view: Uint8Array = new Uint8Array(ab);
        for (let i: number = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }

        return ab;
    }
}
