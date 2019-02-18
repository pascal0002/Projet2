import { Dimension } from "./Constants";

export class GameCard {
    public title: string;
    public image: string;
    public imageModified: string;
    public bestTimeSolo: {user: string, time: number}[];
    public bestTime1v1: {user: string, time: number}[];
    public dimension: Dimension;
}
