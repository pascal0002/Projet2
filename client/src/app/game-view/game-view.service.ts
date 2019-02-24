import { formatDate } from "@angular/common";
import { ElementRef, Injectable } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { Constants, Dimension, Mode } from "../../../../common/communication/Constants";
import { ITimerProps } from "../../../../common/communication/TimerProps";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class GameViewService {

  public gamecard: GameCard;
  public mode: Mode;

  public diffFoundCount: number;
  public opponentDiffFoundCount: number;

  public consoleEL: ElementRef;
  public timerEL: CircleProgressComponent;

  public timerModel: ITimerProps;

  public constructor() {
    this.gamecard = {
      title: "", image: "", imageModified: "",
      bestTimeSolo: [{ user: "", time: 0 }, { user: "", time: 0 }, { user: "", time: 0 }],
      bestTime1v1: [{ user: "", time: 0 }, { user: "", time: 0 }, { user: "", time: 0 }],
      dimension: Dimension.TWO_DIMENSION,
    };
    this.mode = Mode.SOLO;
    this.diffFoundCount = 0;
    this.opponentDiffFoundCount = 0;
    this.timerModel = { bestScoreTime: 0, time: 0, targetTime: 0, cycle: 0, output: "0", intervalCache: 0, bestScoreIntervalCache: 0 };
  }

  public init(): void {
    this.timerModel.targetTime = this.gamecard.bestTimeSolo[this.timerModel.cycle].time;
    this.startBestScoreTimer();
    this.startTimer();
    this.logMessage("Game started");
  }

  public reset(): void {
    clearInterval(this.timerModel.bestScoreIntervalCache);
    clearInterval(this.timerModel.intervalCache);
    this.timerModel = { bestScoreTime: 0, time: 0, targetTime: 0, cycle: 0, output: "0", intervalCache: 0, bestScoreIntervalCache: 0 };
    this.diffFoundCount = 0;
    this.opponentDiffFoundCount = 0;
  }

  public onDiffFound(): void {
    this.diffFoundCount++;
  }

  public onOpponentDiffFound(): void {
    this.opponentDiffFoundCount++;
  }

  public logMessage(message: string): void {
    this.consoleEL.nativeElement.innerHTML = "<span style='color:yellow;'>["
      + formatDate(Date.now(), "HH:mm", "en-US", "UTC-5") + "] </span>" + message + "<br/>";
  }

  public startTimer(): void {
    const callback: Function = () => {
      this.timerModel.time += Constants.TIMER_INCREMENT;
      this.timerModel.output = this.timeToString(this.timerModel.time / Constants.TIMER_RESOLUTION);
    };
    this.timerModel.intervalCache = setInterval(callback, Constants.TIMER_RESOLUTION);
  }

  public startBestScoreTimer(): void {
    const callback: Function = () => {
      this.timerModel.bestScoreTime += Constants.TIMER_INCREMENT;
      this.timerEL.percent = this.timerModel.bestScoreTime / Constants.TIMER_RESOLUTION /
                             this.timerModel.targetTime * Constants.PERCENT_FACTOR;

      if (this.timerEL.percent >= Constants.PERCENT_FACTOR) {
        this.onCycle();
      }
      this.timerEL["applyOptions"]();
      this.timerEL.draw(this.timerEL.percent);
    };

    this.timerModel.bestScoreIntervalCache = setInterval(callback, Constants.TIMER_RESOLUTION);
  }

  public onCycle(): void {
    this.timerModel.cycle++;

    /*Supprime le callback du timer de médaille*/
    clearInterval(this.timerModel.bestScoreIntervalCache);

    if (this.timerModel.cycle < Constants.NUMBER_MEDAL) {
      this.timerEL.backgroundColor = Constants.MEDAL_COLOR_SCALE[this.timerModel.cycle];
      this.timerEL.outerStrokeColor = Constants.MEDAL_COLOR_SCALE[this.timerModel.cycle + 1];

      /*On recommence un cycle et on ajuste le temps de la médaille suivante avec le tableau des meilleurs scores*/
      this.timerModel.targetTime = this.gamecard.bestTimeSolo[this.timerModel.cycle].time - this.timerModel.time;
      this.timerModel.bestScoreTime = 0;
      this.startBestScoreTimer();
    } else {
      /*Pas de médaille :( On arrête de suivre le temps*/
      this.timerEL.backgroundColor = Constants.MEDAL_COLOR_SCALE[this.timerModel.cycle];
    }
  }

  public timeToString(time: number): string {
    const seconds: number = Math.floor(time % Constants.MINUTE_TO_SECOND);
    const minutes: number = Math.floor(time / Constants.MINUTE_TO_SECOND);

    return (minutes < Constants.DIGIT_OVERFLOW ? "0" : "") +
      minutes + ":" + (seconds < Constants.DIGIT_OVERFLOW ? "0" : "") + seconds;
  }
}
