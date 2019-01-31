//import Axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { FormInfo } from "../../../../common/communication/FormInfo";
import { BitmapImage } from "../../../../common/communication/BitmapImage";


@injectable()
export class FormValidatorService {
    public validateForm(formInfo: FormInfo): boolean{
        return (
                   this.validateGameName(formInfo.gameName)   &&
                   this.validateImage(formInfo.originalImage) &&
                   this.validateImage(formInfo.modifiedImage)
               );
    }

    public validateGameName(gameName: string): boolean{
        let result = (gameName.length >=3 && gameName.length <=15)
        console.log("Validate game name : " + result);

        return (gameName.length >=3 && gameName.length <=15);
    }

    public validateImage(image: BitmapImage): boolean{
        let result = (
            this.validateImageDimensions(image.height, image.width) &&
            this.validateImageExtenstion(image.fileName) &&
            this.validateBitDepth(image.bitDepth)
         );
         console.log("Validate image : " + result );

        return (
                   this.validateImageDimensions(image.height, image.width) &&
                   this.validateImageExtenstion(image.fileName) &&
                   this.validateBitDepth(image.bitDepth)
                );
    }

    public validateImageDimensions(height: number, width: number): boolean{
        let result = (height === 480 && width === 640);
        console.log("Validate image Dimensions : " + result);

        return (height === 480 && width === 640);
    }

    public validateBitDepth(bitDepth: number):boolean{
        let result = (bitDepth === 24);
        console.log("Validate image bit depth : " + result);

        return (bitDepth === 24); 
    }

    public validateImageExtenstion(extension: string):boolean{
        let result = (extension.split(".").pop() === "bmp");
        console.log("Validate image extension : " + result);

        return (extension.split(".").pop() === "bmp");

    }

}
