import { injectable } from "inversify";
import { IBestTime } from "../../../common/communication/BestTime";
import { Mode, Constants } from "../../../common/communication/Constants";
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
        if (newScore < highScore[Constants.FIRST].time) {
            highScore[Constants.THIRD] = highScore[Constants.SECOND];
            highScore[Constants.SECOND] = highScore[Constants.FIRST];
            highScore[Constants.FIRST] = {user: user, time: newScore};
        } else if (newScore < highScore[Constants.SECOND].time) {
            highScore[Constants.THIRD] = highScore[Constants.SECOND];
            highScore[Constants.SECOND] = {user: user, time: newScore};
        } else if (newScore < highScore[Constants.THIRD].time) {
            highScore[Constants.THIRD] = {user: user, time: newScore};
        }

        return highScore;
    }
}
