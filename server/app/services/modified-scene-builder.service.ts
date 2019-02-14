import { inject, injectable } from "inversify";
import {ServerConstants} from "../../../common/communication/Constants";
import {IThreeObject} from "../../../common/communication/ThreeObject";
import Types from "../types";
import {ScenesParameterGeneratorService} from "./scenes-parameter-generator.service";

@injectable()
export class ModifiedSceneBuilderService {

    public constructor(@inject(Types.ScenesParameterGeneratorService)
                       private scenesParameterGeneratorService: ScenesParameterGeneratorService) {/**/}

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
        scene[objectToChange].color = this.scenesParameterGeneratorService.makeRandomColors();
        objectsChanged.push(objectToChange);
    }

    private addObject(scene: IThreeObject[]): void {
        const object: IThreeObject = this.scenesParameterGeneratorService.createObject();
        scene.push(object);
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
