// tslint:disable:no-magic-numbers
import { IBitmapImage } from "../../common/communication/BitmapImage";

const whiteArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    whiteArray.push(255);
}

export const whiteBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "whiteBitmap.bmp",
    pixels: whiteArray,
};

const blackArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    blackArray.push(0);
}

export const blackBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "blackBitmap.bmp",
    pixels: blackArray,
};

const leftTopBlackArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    leftTopBlackArray.push(255);
}
leftTopBlackArray[919680] = 0;
leftTopBlackArray[919681] = 0;
leftTopBlackArray[919682] = 0;

export const leftTopBlackBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "leftTopBlackBitmap.bmp",
    pixels: leftTopBlackArray,
};

const rightTopBlackArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    rightTopBlackArray.push(255);
}
rightTopBlackArray[921597] = 0;
rightTopBlackArray[921598] = 0;
rightTopBlackArray[921599] = 0;

export const rightTopBlackBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "rightTopBlackBitmap.bmp",
    pixels: rightTopBlackArray,
};

const leftBottomBlackArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    leftBottomBlackArray.push(255);
}
leftBottomBlackArray[0] = 0;
leftBottomBlackArray[1] = 0;
leftBottomBlackArray[2] = 0;

export const leftBottomBlackBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "leftBottomBlackBitmap.bmp",
    pixels: leftBottomBlackArray,
};

const rightBottomBlackArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    rightBottomBlackArray.push(255);
}
rightBottomBlackArray[1917] = 0;
rightBottomBlackArray[1918] = 0;
rightBottomBlackArray[1919] = 0;

export const rightBottomBlackBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "rightBottomBlackBitmap.bmp",
    pixels: rightBottomBlackArray,
};

const fourCornerBlackArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    fourCornerBlackArray.push(255);
}
fourCornerBlackArray[0] = 0;
fourCornerBlackArray[1] = 0;
fourCornerBlackArray[2] = 0;
fourCornerBlackArray[1917] = 0;
fourCornerBlackArray[1918] = 0;
fourCornerBlackArray[1919] = 0;
fourCornerBlackArray[919680] = 0;
fourCornerBlackArray[919681] = 0;
fourCornerBlackArray[919682] = 0;
fourCornerBlackArray[921597] = 0;
fourCornerBlackArray[921598] = 0;
fourCornerBlackArray[921599] = 0;

export const fourCornerBlackBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "fourCornerBlackBitmap.bmp",
    pixels: fourCornerBlackArray,
};

const diagonalDifferenceArray: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    diagonalDifferenceArray.push(255);
}
diagonalDifferenceArray[0] = 0;
diagonalDifferenceArray[1] = 0;
diagonalDifferenceArray[2] = 0;
diagonalDifferenceArray[1920] = 0;
diagonalDifferenceArray[1921] = 0;
diagonalDifferenceArray[1922] = 0;
diagonalDifferenceArray[1923] = 0;
diagonalDifferenceArray[1924] = 0;
diagonalDifferenceArray[1925] = 0;

export const diagonalDifferenceBitmap: IBitmapImage  = {
    height : 640,
    width : 480,
    bitDepth: 24,
    fileName: "diagonalDifferenceBitmap.bmp",
    pixels: diagonalDifferenceArray,
};

export const firstLineBlackPixels: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    (i < 1920) ? firstLineBlackPixels.push(0) : firstLineBlackPixels.push(255);
}

export const twoLineBlackPixels: number[] = [];
for (let i: number = 0; i < 921600; i++) {
    (i < 1920) ? twoLineBlackPixels.push(0) : twoLineBlackPixels.push(255);
}
// Separate the single black line
twoLineBlackPixels[300] = 255;
