import { formatDate } from "@angular/common";
import { ElementRef, Injectable } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { timer, Observable, Subscription } from "rxjs";
import { ClientConstants, Dimension, Mode } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";

@Injectable({
  providedIn: "root",
})

export class GameViewService {

  public gamecard: GameCard;
  public mode: Mode = Mode.SOLO;
  public dimension: Dimension = Dimension.TWO_DIMENSION;

  public diffFoundCount: number = 0;
  public opponentDiffFoundCount: number = 0;

  public consoleEL: ElementRef;
  public timerEL: CircleProgressComponent;

  public bestScoreTimer: number = 0;
  public timer: number = 0;
  public timerOutput: string;
  private targetTime: number = 0;
  private cycle: number = 0;
  private bestScoreTimerLoopSub: Subscription;

  public readonly timerResolution: number = 100;

  public init(): void {
    this.bestScoreTimerLoopSub = this.startBestScoreTimer();
    this.targetTime = this.gamecard.bestTimeSolo[0].time;
    this.startTimer();
    this.logMessage("Game started");
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
    const source: Observable<number> = timer(0, ClientConstants.SECOND_TO_MILLISECOND / this.timerResolution);
    source.subscribe((val: number) => {
      this.timer = val / this.timerResolution;
      this.timerOutput = this.timeToString(this.timer);
    });
  }

  public startBestScoreTimer(): Subscription {
    const source: Observable<number> = timer(0, ClientConstants.SECOND_TO_MILLISECOND / this.timerResolution);

    return source.subscribe((val: number) => {
      this.bestScoreTimer = val / this.timerResolution;
      this.timerEL.percent = this.bestScoreTimer / this.targetTime * ClientConstants.PERCENT_FACTOR;

      if (this.timerEL.percent >= ClientConstants.PERCENT_FACTOR) {
        this.onCycle();
      }
      this.timerEL["applyOptions"]();
      this.timerEL.draw(this.timerEL.percent);
    });
  }

  private onCycle(): void {
    this.cycle++;

    /*Supprime le callback du timer de médaille*/
    this.bestScoreTimerLoopSub.unsubscribe();

    if (this.cycle < ClientConstants.NUMBER_MEDAL) {
      this.timerEL.backgroundColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle];
      this.timerEL.outerStrokeColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle + 1];

      /*On recommence un cycle et on ajuste le temps de la médaille suivante avec le tableau des meilleurs scores*/
      this.targetTime = this.gamecard.bestTimeSolo[this.cycle].time - this.timer;
      this.bestScoreTimer = 0;
      this.bestScoreTimerLoopSub = this.startBestScoreTimer();
    } else {
      /*Pas de médaille :( On arrête de suivre le temps*/
      this.timerEL.backgroundColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle];
    }
  }

  public appendElementInnerHTML(el: ElementRef, html: string): void {
    el.nativeElement.innerHTML += html;
  }

  public timeToString(time: number): string {
    const seconds: number = Math.floor(time % ClientConstants.MINUTE_TO_SECOND);
    const minutes: number = Math.floor(time / ClientConstants.MINUTE_TO_SECOND);

    return (minutes < ClientConstants.DIGIT_OVERFLOW ? "0" : "") +
      minutes + ":" + (seconds < ClientConstants.DIGIT_OVERFLOW ? "0" : "") + seconds;
  }
}
