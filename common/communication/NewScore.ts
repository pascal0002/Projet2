import { GameCard } from "./game-card";
import { Mode } from "./Constants";

export interface INewScore {
    gameCard: GameCard,
    mode: Mode,
    user: string, 
    time: number,
}

