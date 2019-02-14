import { inject, injectable } from "inversify";
import {ServerConstants} from "../../../common/communication/Constants";
import {IThreeObject} from "../../../common/communication/ThreeObject";
import Types from "../types";
import {ScenesParameterGeneratorService} from "./scenes-parameter-generator.service";

@injectable()
export class OriginalSceneBuilderService {

    public constructor(@inject(Types.ScenesParameterGeneratorService)
                       private scenesParameterGeneratorService: ScenesParameterGeneratorService) {/**/}

    public createObjects(): IThreeObject[] {
        const objects: IThreeObject[] = [];
        const numberOfObjects: number = Math.round(this.getRandomNumber() * (ServerConstants.MAX_OBJECTS_NB
                                        - ServerConstants.MIN_OBJECTS_NB)) + ServerConstants.MIN_OBJECTS_NB;

        for (let i: number = 0; i < numberOfObjects; i++) {
            let object: IThreeObject = this.scenesParameterGeneratorService.createObject();
            while (this.scenesParameterGeneratorService.checkCollisions(object, objects)) {
                object = this.scenesParameterGeneratorService.createObject();
            }
            objects.push(object);
        }

        return objects;
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
