import { injectable } from "inversify";
import { IBitmapImage } from "../../../common/communication/BitmapImage";

@injectable()
export class DifferenceIdentificator2DService {

    public differenceImgTest: IBitmapImage;
    public clickPosition: number[];

    public confirmIdentification(clickPosition: number[], differenceImage: IBitmapImage, modifiedImage: IBitmapImage): boolean {
        console.log(clickPosition[0]);
        console.log(clickPosition[1]);

        return false;
    }
}
