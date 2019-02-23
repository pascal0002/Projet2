import { formatDate } from "@angular/common";
import { ElementRef, Injectable } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { Constants, Dimension, Mode } from "../../../../common/communication/Constants";
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

  public bestScoreTimer: number;
  public timer: number;
  public timerOutput: string;
  private targetTime: number;
  private cycle: number;
  private timerIntervalCache: number;
  private bestScoreIntervalCache: number;

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
    this.bestScoreTimer = 0;
    this.timer = 0;
    this.targetTime = 0;
    this.cycle = 0;
  }

  public init(): void {
    this.targetTime = this.gamecard.bestTimeSolo[this.cycle].time;
    this.startBestScoreTimer();
    this.startTimer();
    this.logMessage("Game started");
  }

  public reset(): void {
    clearInterval(this.bestScoreIntervalCache);
    clearInterval(this.timerIntervalCache);
    this.bestScoreTimer = 0;
    this.timer = 0;
    this.cycle = 0;
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
    this.appendElementInnerHTML(this.consoleEL, "<span style='color:yellow;'>["
      + formatDate(Date.now(), "HH:mm", "en-US", "UTC-5") + "] </span>" + message + "<br/>");
  }

  public startTimer(): void {
    const callback: Function = () => {
      this.timer += Constants.TIMER_INCREMENT;
      this.timerOutput = this.timeToString(this.timer / Constants.TIMER_RESOLUTION);
    };
    this.timerIntervalCache = setInterval(callback, Constants.TIMER_RESOLUTION);
  }

  public startBestScoreTimer(): void {
    const callback: Function = () => {
      this.bestScoreTimer += Constants.TIMER_INCREMENT;
      this.timerEL.percent = this.bestScoreTimer / Constants.TIMER_RESOLUTION / this.targetTime * Constants.PERCENT_FACTOR;

      if (this.timerEL.percent >= Constants.PERCENT_FACTOR) {
        this.onCycle();
      }
      this.timerEL["applyOptions"]();
      this.timerEL.draw(this.timerEL.percent);
    };

    this.bestScoreIntervalCache = setInterval(callback, Constants.TIMER_RESOLUTION);
  }

  private onCycle(): void {
    this.cycle++;

    /*Supprime le callback du timer de médaille*/
    clearInterval(this.bestScoreIntervalCache);

    if (this.cycle < Constants.NUMBER_MEDAL) {
      this.timerEL.backgroundColor = Constants.MEDAL_COLOR_SCALE[this.cycle];
      this.timerEL.outerStrokeColor = Constants.MEDAL_COLOR_SCALE[this.cycle + 1];

      /*On recommence un cycle et on ajuste le temps de la médaille suivante avec le tableau des meilleurs scores*/
      this.targetTime = this.gamecard.bestTimeSolo[this.cycle].time - this.timer;
      this.bestScoreTimer = 0;
      this.startBestScoreTimer();
    } else {
      /*Pas de médaille :( On arrête de suivre le temps*/
      this.timerEL.backgroundColor = Constants.MEDAL_COLOR_SCALE[this.cycle];
    }
  }

  public appendElementInnerHTML(el: ElementRef, html: string): void {
    el.nativeElement.innerHTML += html;
  }

  public timeToString(time: number): string {
    const seconds: number = Math.floor(time % Constants.MINUTE_TO_SECOND);
    const minutes: number = Math.floor(time / Constants.MINUTE_TO_SECOND);

    return (minutes < Constants.DIGIT_OVERFLOW ? "0" : "") +
      minutes + ":" + (seconds < Constants.DIGIT_OVERFLOW ? "0" : "") + seconds;
  }
}
