import { injectable } from "inversify";
import { ServerConstants } from "../../../common/communication/Constants";
import { IThreeObject } from "../../../common/communication/ThreeObject";

@injectable()
export class ModifiedSceneBuilderService {

    public createModifications(scene: IThreeObject[]): IThreeObject[] {
        let deletionNb: number = 0, colorChangeNb: number = 0, addNb: number = 0;

        for (let i: number = 0; i < ServerConstants.MODIFICATION_NB; i++) {
            const modificationCode: number = Math.floor(this.getRandomNumber() * ServerConstants.MODIFICATION_TYPE_NB);
            modificationCode === 0 ? deletionNb++ :
            modificationCode === 1 ? colorChangeNb++ :
            addNb++;
        }

        for (let i: number = 0; i < deletionNb; i++) {
            this.deleteObject(scene);
        }

        const objectsChanged: number[] = [];
        for (let i: number = 0; i < colorChangeNb; i++) {
            this.changeColor(scene, objectsChanged);
        }

        for (let i: number = 0; i < addNb; i++) {
            this.addObject(scene);
        }

        return scene;
    }

    private deleteObject(scene: IThreeObject[]): void {
        let objectToDelete: number = Math.floor(this.getRandomNumber() * scene.length);
        if (objectToDelete === scene.length) {
            objectToDelete--;
        }
        scene.splice(objectToDelete, 1);
    }

    private changeColor(scene: IThreeObject[], objectsChanged: number[]): void {
        let objectToChange: number = Math.floor(this.getRandomNumber() * scene.length);
        if (objectToChange === scene.length) {
            objectToChange--;
        }
        while (objectsChanged.find((position: number): boolean => position === objectToChange) !== undefined) {
            objectToChange = Math.floor(this.getRandomNumber() * scene.length);
            if (objectToChange === scene.length) {
                objectToChange--;
            }
        }
        scene[objectToChange].color = this.makeRandomColors();
        objectsChanged.push(objectToChange);
    }

    private addObject(scene: IThreeObject[]): void {
        const object: IThreeObject = {color: "", diameter: 0, height: 0, position: [], orientation: [], type: -1};
        object.color = this.makeRandomColors();
        object.diameter = (this.getRandomNumber() + ServerConstants.HALF_VALUE) * ServerConstants.REFERENCE_SIZE;
        object.height = (this.getRandomNumber() + ServerConstants.HALF_VALUE) * ServerConstants.REFERENCE_SIZE;
        object.position = this.translateObject();
        object.orientation = this.rotateObject();
        object.type = Math.floor(this.getRandomNumber() * ServerConstants.OBJECT_TYPES_NB);
        scene.push(object);
    }

    private makeRandomColors(): string {

        const red: number = Math.round(this.getRandomNumber() * ServerConstants.COLOR_PARAMETER_MAX_VALUE);
        const green: number = Math.round(this.getRandomNumber() * ServerConstants.COLOR_PARAMETER_MAX_VALUE);
        const blue: number = Math.round(this.getRandomNumber() * ServerConstants.COLOR_PARAMETER_MAX_VALUE);

        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    private translateObject(): number[] {
        const xPosition: number = Math.round(this.getRandomNumber() * ServerConstants.X_OBJECT_DISPERSION)
                                  - ServerConstants.X_OBJECT_DISPERSION * ServerConstants.HALF_VALUE;
        const yPosition: number = Math.round(this.getRandomNumber() * ServerConstants.Y_OBJECT_DISPERSION)
                                  - ServerConstants.Y_OBJECT_DISPERSION * ServerConstants.HALF_VALUE;
        const zPosition: number = Math.round(this.getRandomNumber() * ServerConstants.Z_OBJECT_DISPERSION)
                                  - ServerConstants.Z_OBJECT_DISPERSION * ServerConstants.HALF_VALUE;

        return [xPosition, yPosition, zPosition];
    }

    private rotateObject(): number[] {
        const xOrientation: number = this.getRandomNumber() * ServerConstants.CIRCLE_DEGREES_NB;
        const yOrientation: number = this.getRandomNumber() * ServerConstants.CIRCLE_DEGREES_NB;
        const zOrientation: number = this.getRandomNumber() * ServerConstants.CIRCLE_DEGREES_NB;

        return [xOrientation, yOrientation, zOrientation];
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
