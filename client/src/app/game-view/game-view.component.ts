import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CircleProgressComponent } from "ng-circle-progress";
import { ClientConstants, Mode } from "../../../../common/communication/Constants";
import { GameViewService } from "./game-view.service";
@Component({
  selector: "app-game-view",
  templateUrl: "./game-view.component.html",
  styleUrls: ["./game-view.component.css"],
})

export class GameViewComponent implements OnInit, AfterViewInit {

  @ViewChild("console")
  private consoleView: ElementRef;
  public consolePinned: boolean = false;

  @ViewChild("timeProgressView")
  private medalTimeProgressBarView: CircleProgressComponent;

  public readonly magnifierIconWidth: number = 35;
  public readonly magnifierProgressOffset: number = 42;
  public readonly magnifierProgress1V1Offset: number = 42;

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
    this.changeTimeProgressBarBackgroundColor(ClientConstants.GOLD_COLOR);
    this.changeTimeProgressBarOuterColor(ClientConstants.SILVER_COLOR);
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
      length: ((this.gameViewService.mode === Mode.SOLO)
        ? this.gameViewService.diffFoundCount : ClientConstants.DIFFERENCE_NB)
    }).map(Number.call, Number);
  }

  public miscGetDiffCounterWidth(): number {

    return this.magnifierProgressOffset + ((this.gameViewService.mode === Mode.SOLO)
      ? 0 : this.magnifierProgress1V1Offset) + (this.magnifierIconWidth * ((this.gameViewService.mode === Mode.SOLO)
        ? this.gameViewService.diffFoundCount : ClientConstants.DIFFERENCE_NB));
  }
}
