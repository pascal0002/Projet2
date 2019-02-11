export class GameCard {
    public title: string;
    public originalImagePath: string;
    public modifiedImagePath: string;
    public differenceImagePixel: number[];
    public bestTimeSolo: [string, number][];
    public bestTime1v1: [string, number][];
}
