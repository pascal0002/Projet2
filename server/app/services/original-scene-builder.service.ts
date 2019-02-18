import { inject, injectable } from "inversify";
import {IThreeObject} from "../../../common/communication/ThreeObject";
import Types from "../types";
import {ScenesParameterGeneratorService} from "./scenes-parameter-generator.service";

@injectable()
export class OriginalSceneBuilderService {

    public constructor(@inject(Types.ScenesParameterGeneratorService)
                       private scenesParameterGeneratorService: ScenesParameterGeneratorService) {/**/}

    public createObjects(objectsNb: number): IThreeObject[] {
        const objects: IThreeObject[] = [];
        const numberOfObjects: number = objectsNb;

        for (let i: number = 0; i < numberOfObjects; i++) {
            this.scenesParameterGeneratorService.addObject(objects);
        }

        return objects;
    }
}
