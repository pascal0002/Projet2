import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { GameCard } from "../../../../common/communication/game-card";
import { TWO_DIMENSION_GAME_CARD_LIST } from "../../../../server/public/mock/2d-game-card-mock-list";
import { timer, Observable, Subscription } from "rxjs";
import { CircleProgressComponent } from "ng-circle-progress";

@Component({
  selector: "app-game-view-2d",
  templateUrl: "./game-view-2d.component.html",
  styleUrls: ["./game-view-2d.component.css"],
})

export class GameView2DComponent implements OnInit, AfterViewInit {
  public originalImage: GameCard;
  public diffFoundCount: number = 7;

  @ViewChild("timeProgressView")
  private timeProgressView: CircleProgressComponent;

  public bestScoreTimer: number = 0;
  public timer: number = 0;
  public timerOutput: string;
  public targetTime: number = 3;
  private cycle: number = 0;
  private bestScoreTimerLoopSub: Subscription;
  // private readonly coolStartTime: number = 2000;
  private readonly timerResolution: number = 100;
  private readonly SECONDTOMILLISECOND: number = 1000;
  private readonly PERCENTFACTOR: number = 100;

  private readonly goldColor: string = "#FFD700";
  private readonly silverColor: string = "#C0C0C0";
  private readonly bronzeColor: string = "#CD7F32";

  public constructor() {
    this.originalImage = TWO_DIMENSION_GAME_CARD_LIST[0];
  }

  public ngOnInit(): void {
    this.timeProgressView.startFromZero = false;
    this.timeProgressView.percent = 0;
    this.timeProgressView.animationDuration = 1000;
    this.timeProgressView.outerStrokeColor = this.silverColor;
    this.timeProgressView.backgroundColor = this.goldColor;
  }

  public ngAfterViewInit(): void {
    this.bestScoreTimerLoopSub = this.startBestScoreTimer();
    this.targetTime = this.miscStringToTime(this.originalImage.bestTimeSolo[0]);
    this.startTimer();
  }

  public startTimer(): void {
    const source: Observable<number> = timer(0, this.SECONDTOMILLISECOND / this.timerResolution);
    source.subscribe((val: number) => {
      this.timer = val / this.timerResolution;
      this.timerOutput = this.miscTimeToString(this.timer);
    });
  }

  public startBestScoreTimer(): Subscription {
    const source: Observable<number> = timer(0, this.SECONDTOMILLISECOND / this.timerResolution);

    return source.subscribe((val: number) => {
      this.bestScoreTimer = val / this.timerResolution;
      this.timeProgressView.percent = this.bestScoreTimer / this.targetTime * this.PERCENTFACTOR;

      if (this.timeProgressView.percent >= this.PERCENTFACTOR) {
        this.onCycle();
      }
      this.timeProgressView["applyOptions"]();
      this.timeProgressView.draw(this.timeProgressView.percent);
    });
  }

  private onCycle(): void {
    this.cycle++;
    this.bestScoreTimerLoopSub.unsubscribe();

    if (this.cycle === 1) {
      this.timeProgressView.backgroundColor = this.silverColor;
      this.timeProgressView.outerStrokeColor = this.bronzeColor;
      this.bestScoreTimer = 0;
    } else if (this.cycle == 2) {
      this.timeProgressView.outerStrokeColor = "white";
      this.timeProgressView.backgroundColor = this.bronzeColor;
      this.bestScoreTimer = 0;
    }
    else {
      this.timeProgressView.backgroundColor = "white";
      this.timeProgressView.outerStrokeColor = "white";

      return;
    }
    this.timeProgressView["applyOptions"]();
    this.targetTime = this.miscStringToTime(this.originalImage.bestTimeSolo[this.cycle]) - this.timer;
    this.bestScoreTimerLoopSub = this.startBestScoreTimer();
  }

  public miscGetArrayDiffFoundCount(): Array<number> {
    return new Array(this.diffFoundCount);
  }

  public miscTimeToString(time: number): string {
    const seconds: number = Math.floor(time % 60);
    const minutes: number = Math.floor(time / 60);

    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  public miscStringToTime(time: string): number {
    const i: number = time.indexOf(":");
    const seconds: number = parseInt(time.substring(i + 1, i + 3), 10);
    const minutes: number = parseInt(time.substring(0, i), 10);
    return seconds + minutes * 60;
  }

}
