import { inject, injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IClickCoordinates } from "../../../common/communication/ClickCoordinates";
import { ServerConstants } from "../../../common/communication/Constants";
import { IPixel } from "../../../common/communication/Pixel";
import { ModifiedImg } from "../../mock/image-mock";
import Types from "../types";
import { BmpFileGenerator } from "./bmp-file-generator.service";

@injectable()
export class DifferenceIdentificator2DService {

    public differenceImgTest: IBitmapImage;
    public clickPosition: IClickCoordinates;

    public constructor(@inject(Types.BmpFileGenerator) private bmpFileGeneratorService: BmpFileGenerator) {/**/}

    public confirmDifference(clickPosition: IClickCoordinates, differenceImage: IBitmapImage, modifiedImage: IBitmapImage): boolean {

        // Where the pixels of the image of differences are
        const imgOfDifference: ModifiedImg = new ModifiedImg();
        const test: IBitmapImage = {
            fileName: "MY_TEST_BMP_MODIF.bmp",
            height: 480,
            width: 640,
            bitDepth: 24,
            pixels: imgOfDifference.pixels,
        };

        this.bmpFileGeneratorService.generateModifedBMPFile(test);

        console.log("Pos X: " + clickPosition.xPos);
        console.log("Pos Y: " + clickPosition.yPos);

        console.log(this.getPixelAtPos(clickPosition, imgOfDifference.pixels));
        console.log(imgOfDifference.pixels[1919]);

        return true;
    }

    public getPixelAtPos(clickPosition: IClickCoordinates, pixelArray: number[]): IPixel {
        const POS_IN_ARRAY: number = this.getPositionInArray(clickPosition);
        console.log(POS_IN_ARRAY);
        return {
            red: pixelArray[POS_IN_ARRAY],
            green: pixelArray[POS_IN_ARRAY + 1],
            blue: pixelArray[POS_IN_ARRAY + 1 + 1],
        };
    }

    public getPositionInArray(clickPosition: IClickCoordinates): number {
        return ((clickPosition.yPos * ServerConstants.ACCEPTED_WIDTH * 3)
                + clickPosition.xPos * ServerConstants.BYTES_PER_PIXEL);
    }

}
