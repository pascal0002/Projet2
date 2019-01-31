// import Axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { IBitmapImage } from "../../../../common/communication/BitmapImage";
import { FormInfo } from "../../../../common/communication/FormInfo";

const MINIMUM_NAME_LENGTH: number = 3;
const MAXIMUM_NAME_LENGTH: number = 15;
const ACCEPTED_HEIGHT: number = 480;
const ACCEPTED_WIDTH: number = 640;
const ACCEPTED_DEPTH: number = 24;

@injectable()
export class FormValidatorService {
    public validateForm(formInfo: FormInfo): boolean {
        return (
                   this.validateGameName(formInfo.gameName)   &&
                   this.validateImage(formInfo.originalImage) &&
                   this.validateImage(formInfo.modifiedImage)
               );
    }

    public validateGameName(gameName: string): boolean {

        return (gameName.length >= MINIMUM_NAME_LENGTH && gameName.length <= MAXIMUM_NAME_LENGTH);
    }

    public validateImage(image: IBitmapImage): boolean {

        return (
                   this.validateImageDimensions(image.height, image.width) &&
                   this.validateImageExtenstion(image.fileName) &&
                   this.validateBitDepth(image.bitDepth)
                );
    }

    public validateImageDimensions(height: number, width: number): boolean {

        return (height === ACCEPTED_HEIGHT && width === ACCEPTED_WIDTH);
    }

    public validateBitDepth(bitDepth: number): boolean {

        return (bitDepth === ACCEPTED_DEPTH);
    }

    public validateImageExtenstion(extension: string): boolean {

        return (extension.split(".").pop() === "bmp");
    }

}
