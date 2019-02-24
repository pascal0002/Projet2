import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { Constants, Mode } from "../../../../common/communication/Constants";
import { GameViewService } from "./game-view.service";

@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})

export class GameViewComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild("console")
  private consoleView: ElementRef;
  public consolePinned: boolean = false;

  @ViewChild("timeProgressView")
  private medalTimeProgressBarView: CircleProgressComponent;

  public constructor(public gameViewService: GameViewService) {
  }

  public ngOnInit(): void {
    /*
      Au début, le joueur commence avec un médaille d'or, puis au fil du temps,
      la barre de progression se remplit en argent, ensuite en bronze, etc...
      Cela donne un indicateur au joueur du temps approximatif qu'il lui reste pour
      obtenir une médaille
    */
    this.medalTimeProgressBarView.percent = 0;
    this.changeTimeProgressBarBackgroundColor(Constants.GOLD_COLOR);
    this.changeTimeProgressBarOuterColor(Constants.SILVER_COLOR);
  }

  public ngOnDestroy(): void {
    this.gameViewService.reset();
  }

  public ngAfterViewInit(): void {
    this.gameViewService.consoleEL = this.consoleView;
    this.gameViewService.timerEL = this.medalTimeProgressBarView;
    this.gameViewService.init();
  }

  public changeTimeProgressBarOuterColor(color: string): void {
    this.medalTimeProgressBarView.outerStrokeColor = color;
  }
  public changeTimeProgressBarBackgroundColor(color: string): void {
    this.medalTimeProgressBarView.backgroundColor = color;
  }

  /*Utilisé pour afficher le nombre de loupes avec ngFor*/
  public miscGetArrayDiffFoundCount(): Array<number> {
    return Array.apply(null, {
      length: ((this.gameViewService.model.mode === Mode.SOLO)
        ? this.gameViewService.diffFoundCount : Constants.VALID_NUMBER_OF_DIFFERENCES),
    }).map(Number.call, Number);
  }

  public miscGetDiffCounterWidth(): number {

    return Constants.MAGNIFIER_PROGRESS_OFFSET + ((this.gameViewService.model.mode === Mode.SOLO)
      ? 0 : Constants.MAGNIFIER_PROGRESS_1V1_OFFSET) + (Constants.MAGNIFIER_ICON_WIDTH * ((this.gameViewService.model.mode === Mode.SOLO)
        ? this.gameViewService.diffFoundCount : Constants.VALID_NUMBER_OF_DIFFERENCES));
  }
}
