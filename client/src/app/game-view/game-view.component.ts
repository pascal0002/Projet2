import { formatDate } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { timer, Observable, Subscription } from "rxjs";
import { ClientConstants, Dimension } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "./game-view.service";
@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})

export class GameViewComponent implements OnInit, AfterViewInit {
  public gameCard: GameCard;
  public isSolo: boolean = true;
  public diffFoundCount: number = 0;
  public opponentDiffFoundCount: number = 0;

  @ViewChild("console")
  private consoleEL: ElementRef;
  public consolePinned: boolean = false;

  @ViewChild("timeProgressView")
  private medalTimeProgressBar: CircleProgressComponent;

  public bestScoreTimer: number = 0;
  public timer: number = 0;
  public timerOutput: string;
  public targetTime: number = 0;
  private cycle: number = 0;
  private bestScoreTimerLoopSub: Subscription;

  private readonly timerResolution: number = 100;
  public readonly magnifierIconWidth: number = 35;
  public readonly magnifierProgressOffset: number = 40;
  public readonly magnifierProgress1V1Offset: number = 42;

  public constructor(public gameViewService: GameViewService) {
    this.gameCard = gameViewService.gamecard;
  }

  public ngOnInit(): void {
    /*
      Au début, le joueur commence avec un médaille d'or, puis au fil du temps,
      la barre de progression se remplit en argent, ensuite en bronze, etc...
      Cela donne un indicateur au joueur du temps approximatif qu'il lui reste pour
      obtenir une médaille
    */
    this.medalTimeProgressBar.percent = 0;
    this.medalTimeProgressBar.backgroundColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle];
    this.medalTimeProgressBar.outerStrokeColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle + 1];
  }

  public ngAfterViewInit(): void {
    this.bestScoreTimerLoopSub = this.startBestScoreTimer();
    this.targetTime = this.gameCard.bestTimeSolo[0].time;
    this.startTimer();
    this.logMessage("Game started");

  }

  public startTimer(): void {
    const source: Observable<number> = timer(0, ClientConstants.SECOND_TO_MILLISECOND / this.timerResolution);
    source.subscribe((val: number) => {
      this.timer = val / this.timerResolution;
      this.timerOutput = this.miscTimeToString(this.timer);
    });
  }

  public startBestScoreTimer(): Subscription {
    const source: Observable<number> = timer(0, ClientConstants.SECOND_TO_MILLISECOND / this.timerResolution);

    return source.subscribe((val: number) => {
      this.bestScoreTimer = val / this.timerResolution;
      this.medalTimeProgressBar.percent = this.bestScoreTimer / this.targetTime * ClientConstants.PERCENT_FACTOR;

      if (this.medalTimeProgressBar.percent >= ClientConstants.PERCENT_FACTOR) {
        this.onCycle();
      }
      this.medalTimeProgressBar["applyOptions"]();
      this.medalTimeProgressBar.draw(this.medalTimeProgressBar.percent);
    });
  }

  private onCycle(): void {
    this.cycle++;

    /*Supprime le callback du timer de médaille*/
    this.bestScoreTimerLoopSub.unsubscribe();

    if (this.cycle < ClientConstants.NUMBER_MEDAL) {
      this.medalTimeProgressBar.backgroundColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle];
      this.medalTimeProgressBar.outerStrokeColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle + 1];

      /*On recommence un cycle et on ajuste le temps de la médaille suivante avec le tableau des meilleurs scores*/
      this.targetTime = this.gameCard.bestTimeSolo[this.cycle].time - this.timer;
      this.bestScoreTimer = 0;
      this.bestScoreTimerLoopSub = this.startBestScoreTimer();
    } else {
      /*Pas de médaille :( On arrête de suivre le temps*/
      this.medalTimeProgressBar.backgroundColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle];
    }
  }

  public onDiffFound(): void {
    this.diffFoundCount++;
  }

  public onOpponentDiffFound(): void {
    this.opponentDiffFoundCount++;
  }

  public logMessage(message: string): void {
    const now: number = Date.now();
    this.consoleEL.nativeElement.innerHTML += "<span style='color:yellow;'>["
    + formatDate(now, "HH:mm", "en-US", "UTC-5") + "] </span>" + message + "<br/>";
  }

  /*Utilisé pour afficher le nombre de loupes avec ngFor*/
  public miscGetArrayDiffFoundCount(): Array<number> {
    return Array.apply(null, { length: ((this.gameCard.dimension === Dimension.TWO_DIMENSION)
           ? this.diffFoundCount : ClientConstants.DIFFERENCE_NB) }).map(Number.call, Number);
  }

  public miscGetDiffCounterWidth(): number {

    return this.magnifierProgressOffset + ((this.gameCard.dimension === Dimension.TWO_DIMENSION)
           ? 0 : this.magnifierProgress1V1Offset) + (this.magnifierIconWidth * ((this.gameCard.dimension === Dimension.TWO_DIMENSION)
           ? this.diffFoundCount : ClientConstants.DIFFERENCE_NB));
  }

  public miscTimeToString(time: number): string {
    const seconds: number = Math.floor(time % 60);
    const minutes: number = Math.floor(time / 60);

    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  /*Éventuallement à supprimer / déplacer*/
  public miscStringToTime(time: string): number {
    const i: number = time.indexOf(":");
    const seconds: number = parseInt(time.substring(i + 1, i + 3), 10);
    const minutes: number = parseInt(time.substring(0, i), 10);

    return seconds + minutes * ClientConstants.SECOND_PER_MINUTE;
  }

}
