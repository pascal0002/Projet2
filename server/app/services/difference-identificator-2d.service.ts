import { injectable } from "inversify";

import {IBitmapImage} from "../../../common/communication/BitmapImage";

@injectable()
export class DifferenceIdentificator2D {

    public confirmIdentification(clickArea: number[], differenceImage: IBitmapImage, modifiedImage: IBitmapImage): boolean {

        return false;
    }
}
