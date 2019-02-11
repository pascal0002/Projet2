import { injectable } from "inversify";
import "reflect-metadata";
import {ClientConstants, ServerConstants, } from "../../../common/communication/Constants";
import { IFormInfo3D } from "../../../common/communication/FormInfo3D";

@injectable()
export class FormValidator3DService {
    public validateForm(formInfo: IFormInfo3D): boolean {
        return (
                   this.validateGameName(formInfo.gameName)   &&
                   this.validateObjectType(formInfo.objectType) &&
                   this.validateNumberOfObjects(formInfo.numberOfObjects) &&
                   this.validateNumberOfCheckboxesChecked(formInfo.addObjects, formInfo.modifyObjects, formInfo.deleteObjects)
               );
    }

    public validateGameName(gameName: string): boolean {

        return (gameName.length >= ServerConstants.MINIMUM_NAME_LENGTH
                && gameName.length <= ServerConstants.MAXIMUM_NAME_LENGTH);
    }

    public validateObjectType(objectType: string): boolean {
        return ClientConstants.OBJECT_TYPES.includes(objectType);
    }

    public validateNumberOfObjects(nObjects: number): boolean {
        return (nObjects >= ClientConstants.MIN_NUMBER_OF_OBJECTS && nObjects <= ClientConstants.MAX_NUMBER_OF_OBJECTS);
    }

    public validateNumberOfCheckboxesChecked(addCheckbox: boolean, deleteCheckbox: boolean, modifyCheckbox: boolean): boolean {
        return (addCheckbox || deleteCheckbox || modifyCheckbox);
    }

}
