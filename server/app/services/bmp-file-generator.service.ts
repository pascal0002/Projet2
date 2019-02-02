import * as fs from "fs";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
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
}
