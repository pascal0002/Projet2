import { injectable } from "inversify";
import { ServerConstants } from "../../../common/communication/Constants";
import { IThreeObject } from "../../../common/communication/ThreeObject";

@injectable()
export class ScenesParameterGeneratorService {

    public constructor() {/**/ }

    public addObject(scene: IThreeObject[]): void {
        let object: IThreeObject = this.createObject();
        while (this.checkCollisions(object, scene)) {
            object = this.createObject();
        }
        scene.push(object);
    }

    private createObject(): IThreeObject {
        const object: IThreeObject = { color: "", diameter: 0, height: 0, position: [], orientation: [], type: -1 };
        object.color = this.makeRandomColors();
        object.diameter = (this.getRandomNumber() + ServerConstants.HALF_VALUE) * ServerConstants.REFERENCE_SIZE;
        object.height = (this.getRandomNumber() + ServerConstants.HALF_VALUE) * ServerConstants.REFERENCE_SIZE;
        object.position = this.translateObject();
        object.orientation = this.rotateObject();
        object.type = Math.floor(this.getRandomNumber() * ServerConstants.OBJECT_TYPES_NB);

        return object;
    }

    public makeRandomColors(): string {

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

    private checkCollisions(newObject: IThreeObject, existingObjects: IThreeObject[]): boolean {
        for (const obj of existingObjects) {
            const distance: number = Math.sqrt(Math.pow(newObject.position[0] - obj.position[0], ServerConstants.SQUARE_FACTOR)
                                     + Math.pow(newObject.position[1] - obj.position[1], ServerConstants.SQUARE_FACTOR)
                                     + Math.pow(newObject.position[1 + 1] - obj.position[1 + 1], ServerConstants.SQUARE_FACTOR));

            const objRadius: number = this.createSphere(obj);
            const newObjectRadius: number = this.createSphere(newObject);

            if (objRadius + newObjectRadius > distance) {
                return true;
            }
        }

        return false;
    }

    private createSphere(object: IThreeObject): number {

        let radius: number;
        object.type === 0 ? radius = object.diameter * ServerConstants.HALF_VALUE :
        object.type === 1 ? radius = Math.sqrt(Math.pow(object.diameter * ServerConstants.HALF_VALUE, ServerConstants.SQUARE_FACTOR)
                                     * ServerConstants.DIMENSIONS_NB) :
        radius = Math.sqrt(Math.pow(object.diameter * ServerConstants.HALF_VALUE, ServerConstants.SQUARE_FACTOR)
                 + Math.pow(object.height * ServerConstants.HALF_VALUE, ServerConstants.SQUARE_FACTOR));

        return radius;
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
