import { injectable, inject } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import * as fs from "fs";
import { BitmapEncoder } from "./bitmap-encoder.service";
import Types from "../types";
//import { } from "../../public/originalImages/"



@injectable()
export class BmpFileGenerator {
    constructor(@inject(Types.BitmapEncoder) private bitmapEncoderService: BitmapEncoder){}
    
    generateBMPFile(image:IBitmapImage){
        console.log(process.cwd())
        fs.writeFileSync(process.cwd() + "/public/originalImages/" + image.fileName, this.bitmapEncoderService.encodeBitmap(image));
    }
}
