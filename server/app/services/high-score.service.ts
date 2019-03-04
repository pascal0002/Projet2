import { injectable } from "inversify";
import { IBestTime } from "../../../common/communication/BestTime";
import { Mode } from "../../../common/communication/Constants";
import { INewScore } from "../../../common/communication/NewScore";
import { GameCard } from "../../../common/communication/game-card";

@injectable()
export class HighScoreService {
    public updateGameCard(newScore: INewScore): GameCard {
        newScore.mode === Mode.ONE_VS_ONE ?
        this.updateTime(newScore.gameCard.bestTime1v1, newScore.time, newScore.user) :
        this.updateTime(newScore.gameCard.bestTimeSolo, newScore.time, newScore.user);

        return newScore.gameCard;
    }

    private updateTime(highScore: IBestTime[], newScore: number, user: string): IBestTime[] {
        return highScore;
    }
}
