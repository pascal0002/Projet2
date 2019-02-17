import { inject, injectable } from "inversify";
import { ServerConstants } from "../../../common/communication/Constants";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import Types from "../types";
import { ScenesParameterGeneratorService } from "./scenes-parameter-generator.service";

@injectable()
export class ModifiedSceneBuilderService {

    public deletionNb: number;
    public colorChangeNb: number;
    public addNb: number;

    public constructor(@inject(Types.ScenesParameterGeneratorService)
    private scenesParameterGeneratorService: ScenesParameterGeneratorService) {
        this.deletionNb = 0;
        this.colorChangeNb = 0;
        this.addNb = 0;
    }

    public createModifications(scene: IThreeObject[]): IThreeObject[] {

        this.chooseModifications();

        for (let i: number = 0; i < this.deletionNb; i++) {
            this.deleteObject(scene);
        }

        const objectsChanged: number[] = [];
        for (let i: number = 0; i < this.colorChangeNb; i++) {
            this.changeColor(scene, objectsChanged);
        }

        for (let i: number = 0; i < this.addNb; i++) {
            this.addObject(scene);
        }

        return scene;
    }

    private chooseModifications(): void {
        for (let i: number = 0; i < ServerConstants.MODIFICATION_NB; i++) {
            const modificationCode: number = Math.floor(this.getRandomNumber() * ServerConstants.MODIFICATION_TYPE_NB);
            modificationCode === 0 ? this.deletionNb++ :
            modificationCode === 1 ? this.colorChangeNb++ :
            this.addNb++;
        }
    }

    private deleteObject(scene: IThreeObject[]): void {
        let positionToDelete: number = Math.floor(this.getRandomNumber() * scene.length);
        if (positionToDelete === scene.length) {
            positionToDelete--;
        }
        scene.splice(positionToDelete, 1);
    }

    private changeColor(scene: IThreeObject[], objectsChanged: number[]): void {
        let objectToChange: number = Math.floor(this.getRandomNumber() * scene.length);
        if (objectToChange === scene.length) {
            objectToChange--;
        }
        objectToChange = this.checkObjectsChanged(objectsChanged, objectToChange, scene.length);
        scene[objectToChange].color = this.scenesParameterGeneratorService.makeRandomColors();
        objectsChanged.push(objectToChange);
    }

    private checkObjectsChanged (objectsChanged: number[], objectToChange: number, length: number): number {
        while (objectsChanged.find((position: number): boolean => position === objectToChange) !== undefined) {
            objectToChange = Math.floor(this.getRandomNumber() * length);
            if (objectToChange === length) {
                objectToChange--;
            }
        }

        return objectToChange;
    }

    private addObject(scene: IThreeObject[]): void {
        let object: IThreeObject = this.scenesParameterGeneratorService.createObject();
        while (this.scenesParameterGeneratorService.checkCollisions(object, scene)) {
            object = this.scenesParameterGeneratorService.createObject();
        }
        scene.push(object);
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
