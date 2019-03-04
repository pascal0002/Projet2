import { inject, injectable } from "inversify";
import { Constants } from "../../../common/communication/Constants";
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

    public createModifications(scene: IThreeObject[], allowedModifications: boolean[]): IThreeObject[] {
        this.deletionNb = 0;
        this.colorChangeNb = 0;
        this.addNb = 0;
        this.chooseModifications(allowedModifications);

        for (let i: number = 0; i < this.deletionNb; i++) {
            this.deleteObject(scene);
        }

        const positionsChanged: number[] = [];
        for (let i: number = 0; i < this.colorChangeNb; i++) {
            this.changeColor(scene, positionsChanged);
        }

        for (let i: number = 0; i < this.addNb; i++) {
            this.scenesParameterGeneratorService.addObject(scene);
        }

        return scene;
    }

    private chooseModifications(allowedModifications: boolean[]): void {
        if (JSON.stringify(allowedModifications) === Constants.DELETE_ONLY) {
            this.deletionNb += Constants.MODIFICATION_NB;
        } else if (JSON.stringify(allowedModifications) === Constants.COLOR_ONLY) {
            this.colorChangeNb += Constants.MODIFICATION_NB;
        } else if (JSON.stringify(allowedModifications) === Constants.ADD_ONLY) {
            this.addNb += Constants.MODIFICATION_NB;
        } else {
            this.generateRandomModifications(allowedModifications);
        }
    }

    private generateRandomModifications(allowedModifications: boolean[]): void {
        for (let i: number = 0; i < Constants.MODIFICATION_NB; i++) {
            const modificationChoice: number = Math.floor(this.getRandomNumber() * Constants.MODIFICATION_TYPE_NB);
            if (this.modificationChoiceIsValid(allowedModifications, modificationChoice)) {
                modificationChoice === Constants.DELETE_ELEMENT ? this.deletionNb++ :
                modificationChoice === Constants.CHANGE_COLOR ? this.colorChangeNb++ :
                this.addNb++;
            } else {
                i--;
            }
        }
    }

    private modificationChoiceIsValid(allowedModifications: boolean[], modificationChoice: number): boolean {
        return (allowedModifications[modificationChoice] ||
               (modificationChoice === Constants.MODIFICATION_TYPE_NB && allowedModifications[Constants.MODIFICATION_TYPE_NB - 1]));
    }

    private deleteObject(scene: IThreeObject[]): void {
        let positionToDelete: number = Math.floor(this.getRandomNumber() * scene.length);
        if (positionToDelete === scene.length) {
            positionToDelete--;
        }
        scene.splice(positionToDelete, 1);
    }

    private changeColor(scene: IThreeObject[], positionsChanged: number[]): void {
        let positionToChange: number = Math.floor(this.getRandomNumber() * scene.length);
        if (positionToChange === scene.length) {
            positionToChange--;
        }
        positionToChange = this.checkPositionsChanged(positionsChanged, positionToChange, scene.length);
        scene[positionToChange].color = this.scenesParameterGeneratorService.makeRandomColors();
        positionsChanged.push(positionToChange);
    }

    private checkPositionsChanged (positionsChanged: number[], positionToChange: number, length: number): number {
        while (positionsChanged.find((position: number): boolean => position === positionToChange) !== undefined) {
            positionToChange = Math.floor(this.getRandomNumber() * length);
            if (positionToChange === length) {
                positionToChange--;
            }
        }

        return positionToChange;
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
