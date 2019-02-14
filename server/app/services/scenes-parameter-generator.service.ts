import { injectable } from "inversify";
import { ServerConstants } from "../../../common/communication/Constants";
import { IThreeObject } from "../../../common/communication/ThreeObject";

@injectable()
export class ScenesParameterGeneratorService {

    public constructor() {/**/ }

    public createObject(): IThreeObject {
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

    public checkCollision(newObject: IThreeObject, existingObjects: IThreeObject[]): boolean {
        for (const obj of existingObjects) {
            const distance = Math.sqrt(Math.pow(newObject.position[0] - obj.position[0], 2) + Math.pow(newObject.position[1] - obj.position[1], 2) + Math.pow(newObject.position[2] - obj.position[2], 2));

            if (distance > (newObject.diameter / 2) - (obj.diameter / 2)) {
                return true;
            }
        }
        return false;
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
