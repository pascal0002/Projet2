import { injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IClickCoordinates } from "../../../common/communication/ClickCoordinates";
import { ServerConstants } from "../../../common/communication/Constants";
import { IPixel } from "../../../common/communication/Pixel";
import { ModifiedImg } from "../../mock/image-mock";

@injectable()
export class DifferenceIdentificator2DService {

    public differenceImgTest: IBitmapImage;
    public clickPosition: IClickCoordinates;

    public constructor() {/**/}

    public confirmDifference(clickPosition: IClickCoordinates, differenceImage: IBitmapImage, modifiedImage: IBitmapImage): boolean {

        // Where the pixels of the image of differences are
        const imgOfDifference: ModifiedImg = new ModifiedImg();

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
