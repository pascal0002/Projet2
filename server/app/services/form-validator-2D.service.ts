import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import {Constants} from "../../../common/communication/Constants";
import { IFormInfo2D } from "../../../common/communication/FormInfo2D";

@injectable()
export class FormValidator2DService {
    public validateForm(formInfo: IFormInfo2D): boolean {
        return (
                   this.validateGameName(formInfo.gameName)   &&
                   this.validateImage(formInfo.originalImage) &&
                   this.validateImage(formInfo.modifiedImage)
               );
    }

    private validateGameName(gameName: string): boolean {

        return (gameName.length >= Constants.MINIMUM_NAME_LENGTH
                && gameName.length <= Constants.MAXIMUM_NAME_LENGTH);
    }

    private validateImage(image: IBitmapImage): boolean {

        return (
                   this.validateImageDimensions(image.height, image.width) &&
                   this.validateImageExtension(image.fileName) &&
                   this.validateBitDepth(image.bitDepth)
                );
    }

    private validateImageDimensions(height: number, width: number): boolean {

        return (height === Constants.VALID_BMP_HEIGHT && width === Constants.VALID_BMP_WIDTH);
    }

    private validateBitDepth(bitDepth: number): boolean {

        return (bitDepth === Constants.ACCEPTED_BIT_DEPTH);
    }

    private validateImageExtension(extension: string): boolean {

        return (extension.split(".").pop() === Constants.VALID_FILE_EXTENSION);
    }

}
