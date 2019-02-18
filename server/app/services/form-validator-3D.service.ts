import { injectable } from "inversify";
import "reflect-metadata";
import { Constants, } from "../../../common/communication/Constants";
import { IFormInfo3D } from "../../../common/communication/FormInfo3D";

@injectable()
export class FormValidator3DService {
    public validateForm(formInfo: IFormInfo3D): boolean {
        return (
            this.validateGameName(formInfo.gameName) &&
            this.validateObjectType(formInfo.objectType) &&
            this.validateNumberOfObjects(formInfo.numberOfObjects) &&
            this.validateNumberOfCheckboxesChecked(formInfo.addObjects, formInfo.modifyObjects, formInfo.deleteObjects)
        );
    }

    private validateGameName(gameName: string): boolean {

        return (gameName.length >= Constants.MINIMUM_NAME_LENGTH
            && gameName.length <= Constants.MAXIMUM_NAME_LENGTH);
    }

    private validateObjectType(objectType: string): boolean {
        return Constants.OBJECT_TYPES.includes(objectType);
    }

    private validateNumberOfObjects(nObjects: number): boolean {
        return (nObjects >= Constants.MIN_NUMBER_OF_OBJECTS && nObjects <= Constants.MAX_NUMBER_OF_OBJECTS);
    }

    private validateNumberOfCheckboxesChecked(addCheckbox: boolean, deleteCheckbox: boolean, modifyCheckbox: boolean): boolean {
        return (addCheckbox || deleteCheckbox || modifyCheckbox);
    }

}
