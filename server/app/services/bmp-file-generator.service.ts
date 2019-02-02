import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import * as fs from "fs";
import { BitmapEncoder } from "./bitmap-encoder.service";
import Types from "../types";
import { IFormInfo } from "../../../common/communication/FormInfo";

@injectable()
export class BmpFileGenerator {
    constructor(@inject(Types.BitmapEncoder) private bitmapEncoderService: BitmapEncoder){}
    
    generateBMPFiles(form: IFormInfo, imageOfDifferences: IBitmapImage): void {
        this.generateOriginalBMPFile(form.originalImage);
        this.generateModifedBMPFile(form.modifiedImage);
        this.generateDifferenceBMPFile(imageOfDifferences);
    }

    generateOriginalBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + "/public/originalImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    generateModifedBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + "/public/modifiedImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }

    generateDifferenceBMPFile(image: IBitmapImage): void {
        fs.writeFileSync(process.cwd() + "/public/differenceImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }
}
