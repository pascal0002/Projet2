import { injectable } from "inversify";
import { INewScore } from "../../../common/communication/NewScore";
import { GameCard } from "../../../common/communication/game-card";

@injectable()
export class HighScoreService {
    public updateGameCard(newScore: INewScore): GameCard {
        return newScore.gameCard;
    }
}