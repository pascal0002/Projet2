import * as fs from "fs";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { Constants } from "../../../common/communication/Constants";
import { IFormInfo2D } from "../../../common/communication/FormInfo2D";
import Types from "../types";
import { BitmapEncoder } from "./bitmap-encoder.service";

@injectable()
export class BmpFileGenerator {
    public constructor(@inject(Types.BitmapEncoder) private bitmapEncoderService: BitmapEncoder) {}

    public generateBMPFiles(form: IFormInfo2D, imageOfDifferences: IBitmapImage): void {
        this.generateOriginalBMPFile(form.originalImage);
        this.generateModifedBMPFile(form.modifiedImage);
        this.generateDifferenceBMPFile(imageOfDifferences);
    }

    private generateOriginalBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + Constants.PUBLIC_OG_FOLDER_PATH + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    private generateModifedBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + Constants.PUBLIC_MODIF_FOLDER_PATH + image.fileName,
                         this.bitmapEncoderService.encodeBitmap(image));
    }

    private generateDifferenceBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + Constants.PUBLIC_DIFF_FOLDER_PATH + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    public createTemporaryFile(imgPixels: number[], path: string, fileName: string): void {
            const tempImg: IBitmapImage = {
                fileName: fileName,
                height: Constants.VALID_BMP_HEIGHT,
                width: Constants.VALID_BMP_WIDTH,
                bitDepth: Constants.ACCEPTED_BIT_DEPTH,
                pixels: imgPixels,
            };

            fs.writeFileSync(process.cwd() + path, this.bitmapEncoderService.encodeBitmap(tempImg));
    }
}
