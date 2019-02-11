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
                if ( i < 100 && j < 100 ) {
                    this.pixels.push(0);
                    this.pixels.push(0);
                    this.pixels.push(0);
                } else if ( i > 200 && i < 350 && j > 200 && j < 350) {
                    this.pixels.push(0);
                    this.pixels.push(0);
                    this.pixels.push(0);
                } else {
                    this.pixels.push(255);
                    this.pixels.push(255);
                    this.pixels.push(255);
                }
            }
        }
    }
}

// 5x5 array of pixel
export const testImage: number[] = [
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255,   1,   2,   3,   4,   5,   6,   7,   8,   9, 255, 255, 255,
    255, 255, 255,  10,  11,  12,   0,   0,   0,  13,  14,  15, 255, 255, 255,
    255, 255, 255,  16,  17,  18,  19,  20,  21,  22,  23,  24, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,

//  Gives:
//  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
//  255, 255, 255,  16,  17,  18,  19,  20,  21,  22,  23,  24, 255, 255, 255,
//  255, 255, 255,  10,  11,  12,   0,   0,   0,  13,  14,  15, 255, 255, 255,
//  255, 255, 255,   1,   2,   3,   4,   5,   6,   7,   8,   9, 255, 255, 255,
//  255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,

//  If pixel clicked is [0,0,0], then TL = [16,17,18], T = [19,20,21], TR = [22,23,24]
//                                    L  = [10,11,12],               , R  = [13,14,15]
//                                    BL = [1,2,3]   , B = [4,5,6]   , BR = [7,8,9]

];
