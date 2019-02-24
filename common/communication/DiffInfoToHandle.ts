import { IDifferenceImage } from "./DifferenceImage";
import { IClickInfo } from "./ClickInfo";

export interface IDiffInfoToHandle {
    clickInfo: IClickInfo;
    differenceImage: IDifferenceImage;
}