import * as fs from "fs";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { ServerConstants } from "../../../common/communication/Constants";
import { IFormInfo } from "../../../common/communication/FormInfo";
import Types from "../types";
import { BitmapEncoder } from "./bitmap-encoder.service";

@injectable()
export class BmpFileGenerator {
    public constructor(@inject(Types.BitmapEncoder) private bitmapEncoderService: BitmapEncoder) {}

    public generateBMPFiles(form: IFormInfo, imageOfDifferences: IBitmapImage): void {
        this.generateOriginalBMPFile(form.originalImage);
        this.generateModifedBMPFile(form.modifiedImage);
        this.generateDifferenceBMPFile(imageOfDifferences);
    }

    public generateOriginalBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + "/public/originalImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    public generateModifedBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + "/public/modifiedImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    public generateDifferenceBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + "/public/differenceImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    public fileExists(path: string): boolean {
        return (fs.existsSync(process.cwd() + path));
    }

    public createTemporaryFile(imgPixels: number[], path: string, fileName: string): void {
            const tempImg: IBitmapImage = {
                fileName: fileName,
                height: ServerConstants.ACCEPTED_HEIGHT,
                width: ServerConstants.ACCEPTED_WIDTH,
                bitDepth: ServerConstants.ACCEPTED_BIT_DEPTH,
                pixels: imgPixels,
            };

            fs.writeFileSync(process.cwd() + path, this.bitmapEncoderService.encodeBitmap(tempImg));
    }
}
