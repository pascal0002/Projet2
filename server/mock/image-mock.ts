// tslint:disable:no-magic-numbers
import { injectable } from "inversify";

@injectable()
export class OriginalImg {
    public pixels: number[] = [];
    public constructor() {

        // fois 3 car 3 bits par pixel
        for (let i: number = 0; i < (640 * 3); i++) {
            for (let j: number = 0; j < (480); j++) {
                this.pixels.push(255);
            }
        }
    }
}

@injectable()
export class ModifiedImg {
    public pixels: number[] = [];

    public constructor() {
        for (let i: number = 0; i < (480); i++) {
            for (let j: number = 0; j < 640; j++) {
                if (i < 100 && j < 100 ) {
                    this.pixels.push(0);
                    this.pixels.push(0);
                    this.pixels.push(0);
                }  else {
                    this.pixels.push(255);
                    this.pixels.push(255);
                    this.pixels.push(255);
                }
            }
        }
    }
}
