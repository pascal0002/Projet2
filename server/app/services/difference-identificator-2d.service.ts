import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { /*ModifiedImg,*/ OriginalImg, ModifiedImg } from "../../mock/image-mock";
import Types from "../types";
import { BmpFileGenerator } from "./bmp-file-generator.service";

@injectable()
export class DifferenceIdentificator2DService {

    public differenceImgTest: IBitmapImage;
    public clickPosition: number[];

    public constructor( @inject(Types.BmpFileGenerator) private bmpFileGeneratorService: BmpFileGenerator ) {/**/}

    public confirmIdentification(clickPosition: number[], differenceImage: IBitmapImage, modifiedImage: IBitmapImage): boolean {
        const ogPix: OriginalImg = new OriginalImg();
        const modifPix: ModifiedImg = new ModifiedImg();

        console.log("Pos 0: " + clickPosition[0]);
        console.log("Pos 1: " + clickPosition[1]);

        const MY_TEST_BMP_OG: IBitmapImage = {
            height: 640,
            width: 480,
            bitDepth: 24,
            fileName: "MY_TEST_BMP_OG.bmp",
            pixels: ogPix.pixels,
        };

        const MY_TEST_BMP_MODIF: IBitmapImage = {
            height: 640,
            width: 480,
            bitDepth: 24,
            fileName: "MY_TEST_BMP_MODIF.bmp",
            pixels: modifPix.pixels,
        };

        this.bmpFileGeneratorService.generateOriginalBMPFile(MY_TEST_BMP_OG);
        this.bmpFileGeneratorService.generateModifedBMPFile(MY_TEST_BMP_MODIF);

        return true;
    }
}
