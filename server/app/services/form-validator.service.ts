import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {ServerConstants} from "../../../common/communication/Constants";
import { IFormInfo } from "../../../common/communication/FormInfo";

@injectable()
export class FormValidatorService {
    public validateForm(formInfo: IFormInfo): boolean {
        return (
                   this.validateGameName(formInfo.gameName)   &&
                   this.validateImage(formInfo.originalImage) &&
                   this.validateImage(formInfo.modifiedImage)
               );
    }

    public validateGameName(gameName: string): boolean {

        return (gameName.length >= ServerConstants.MINIMUM_NAME_LENGTH
                && gameName.length <= ServerConstants.MAXIMUM_NAME_LENGTH);
    }

    public validateImage(image: IBitmapImage): boolean {

        return (
                   this.validateImageDimensions(image.height, image.width) &&
                   this.validateImageExtension(image.fileName) &&
                   this.validateBitDepth(image.bitDepth)
                );
    }

    public validateImageDimensions(height: number, width: number): boolean {

        return (height === ServerConstants.ACCEPTED_HEIGHT && width === ServerConstants.ACCEPTED_WIDTH);
    }

    public validateBitDepth(bitDepth: number): boolean {

        return (bitDepth === ServerConstants.ACCEPTED_BIT_DEPTH);
    }

    public validateImageExtension(extension: string): boolean {

        return (extension.split(".").pop() === "bmp");
    }

}
