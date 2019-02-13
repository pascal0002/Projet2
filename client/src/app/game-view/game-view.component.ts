import { formatDate } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { timer, Observable, Subscription } from "rxjs";
import { ClientConstants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { TWO_DIMENSION_GAME_CARD_LIST } from "../../../../server/public/mock/2d-game-card-mock-list";

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})

export class GameViewComponent implements OnInit, AfterViewInit {
  public originalImage: GameCard;
  public diffFoundCount: number = 0;

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

  public constructor() {
    this.originalImage = TWO_DIMENSION_GAME_CARD_LIST[0];
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
    this.targetTime = this.miscStringToTime(this.originalImage.bestTimeSolo[0]);
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

    if (this.cycle < 3) {
      this.medalTimeProgressBar.backgroundColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle];
      this.medalTimeProgressBar.outerStrokeColor = ClientConstants.MEDAL_COLOR_SCALE[this.cycle + 1];

      /*On recommence un cycle et on ajuste le temps de la médaille suivante avec le tableau des meilleurs scores*/
      this.targetTime = this.miscStringToTime(this.originalImage.bestTimeSolo[this.cycle]) - this.timer;
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

  public logMessage(message: string): void {
    const now: number = Date.now();
    this.consoleEL.nativeElement.innerHTML += "<span style='color:yellow;'>[" + formatDate(now, "HH:mm", "en-US", "UTC-5") + "] </span>" + message + "<br/>";
  }

  /*Utilisé pour afficher le nombre de loupes avec ngFor*/
  public miscGetArrayDiffFoundCount(): Array<number> {
    return new Array(this.diffFoundCount);
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

    return seconds + minutes * 60;
  }

}
