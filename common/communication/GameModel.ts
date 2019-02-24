import { GameCard } from "./game-card";
import { Mode } from "./Constants"

export interface GameModel {
    gamecard: GameCard;
    mode: Mode;
}