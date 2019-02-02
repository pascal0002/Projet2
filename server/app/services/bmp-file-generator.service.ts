import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IFormInfo } from "../../../common/communication/FormInfo";
import * as fs from "fs";
import { BitmapEncoder } from "./bitmap-encoder.service";
import Types from "../types";
//import { } from "../../public/originalImages/"



@injectable()
export class BmpFileGenerator {
    constructor(@inject(Types.BitmapEncoder) private bitmapEncoderService: BitmapEncoder){} 
    generateBMPFiles(form :IFormInfo, imageOfDifferences: IBitmapImage){
        this.generateOriginalBMPFile(form.originalImage);
        this.generateModifiedBMPFile(form.modifiedImage);
        this.generateDifferencesBMPFile(imageOfDifferences);   
    }

    generateOriginalBMPFile(image: IBitmapImage){
        fs.writeFileSync(process.cwd() + "/public/originalImages/" + image.fileName, (this.bitmapEncoderService.encodeBitmap(image)));
    }

    generateModifiedBMPFile(image: IBitmapImage){
        fs.writeFileSync(process.cwd() + "/public/modifiedImages/" + image.fileName, (this.bitmapEncoderService.encodeBitmap(image)));
    }


    generateDifferencesBMPFile(image: IBitmapImage){
        fs.writeFileSync(process.cwd() + "/public/differenceImages/" + image.fileName, (this.bitmapEncoderService.encodeBitmap(image)));
    }



}
