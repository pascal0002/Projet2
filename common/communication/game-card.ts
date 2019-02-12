export class GameCard {
    public title: string;
    public originalImagePath: string;
    public modifiedImagePath: string;
    public bestTimeSolo: {user: string, time: number}[];
    public bestTime1v1: {user: string, time: number}[];
}
