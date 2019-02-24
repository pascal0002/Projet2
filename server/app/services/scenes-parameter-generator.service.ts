import { injectable } from "inversify";
import { Constants } from "../../../common/communication/Constants";
import { IThreeObject } from "../../../common/communication/ThreeObject";

@injectable()
export class ScenesParameterGeneratorService {

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
        object.diameter = (this.getRandomNumber() + Constants.HALF_VALUE) * Constants.REFERENCE_SIZE;
        object.height = (this.getRandomNumber() + Constants.HALF_VALUE) * Constants.REFERENCE_SIZE;
        object.position = this.translateObject();
        object.orientation = this.rotateObject();
        object.type = Math.floor(this.getRandomNumber() * Constants.OBJECT_TYPES_NB);

        return object;
    }

    public makeRandomColors(): string {

        const red: number = Math.round(this.getRandomNumber() * Constants.COLOR_PARAMETER_MAX_VALUE);
        const green: number = Math.round(this.getRandomNumber() * Constants.COLOR_PARAMETER_MAX_VALUE);
        const blue: number = Math.round(this.getRandomNumber() * Constants.COLOR_PARAMETER_MAX_VALUE);

        return "rgb(" + red + "," + green + "," + blue + ")";
    }

    private translateObject(): number[] {
        const xPosition: number = Math.round(this.getRandomNumber() * Constants.X_OBJECT_DISPERSION)
            - Constants.X_OBJECT_DISPERSION * Constants.HALF_VALUE;
        const yPosition: number = Math.round(this.getRandomNumber() * Constants.Y_OBJECT_DISPERSION)
            - Constants.Y_OBJECT_DISPERSION * Constants.HALF_VALUE;
        const zPosition: number = Math.round(this.getRandomNumber() * Constants.Z_OBJECT_DISPERSION)
            - Constants.Z_OBJECT_DISPERSION * Constants.HALF_VALUE;

        return [xPosition, yPosition, zPosition];
    }

    private rotateObject(): number[] {
        const xOrientation: number = this.getRandomNumber() * Constants.CIRCLE_DEGREES_NB;
        const yOrientation: number = this.getRandomNumber() * Constants.CIRCLE_DEGREES_NB;
        const zOrientation: number = this.getRandomNumber() * Constants.CIRCLE_DEGREES_NB;

        return [xOrientation, yOrientation, zOrientation];
    }

    private checkCollisions(newObject: IThreeObject, existingObjects: IThreeObject[]): boolean {
        for (const obj of existingObjects) {
            const distance: number = Math.sqrt(Math.pow(newObject.position[0] - obj.position[0], Constants.SQUARE_FACTOR)
                                     + Math.pow(newObject.position[1] - obj.position[1], Constants.SQUARE_FACTOR)
                                     + Math.pow(newObject.position[1 + 1] - obj.position[1 + 1], Constants.SQUARE_FACTOR));

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
        if (object.type === Constants.SPHERE) {
            radius = object.diameter * Constants.HALF_VALUE;
        } else if (object.type === Constants.CUBE) {
            radius = Math.sqrt(Math.pow(object.diameter * Constants.HALF_VALUE, Constants.SQUARE_FACTOR) * Constants.DIMENSIONS_NB);
        } else {
            radius = Math.sqrt(Math.pow(object.diameter * Constants.HALF_VALUE, Constants.SQUARE_FACTOR) +
                     Math.pow(object.height * Constants.HALF_VALUE, Constants.SQUARE_FACTOR));
        }

        return radius;
    }

    private getRandomNumber(): number {
        return Math.random();
    }
}
