import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "../game-view/game-view.service";
import { SceneService } from "../scene-constructor/scene.service";
@Component({
  selector: "app-game-3d",
  templateUrl: "./game-3d.component.html",
  styleUrls: ["./game-3d.component.css"],
})
export class Game3DComponent implements OnInit {
  private gameCard: GameCard;

  public get leftCanvas(): HTMLCanvasElement {
    return this.leftCanvasRef.nativeElement;
  }

  public get rightCanvas(): HTMLCanvasElement {
    return this.rightCanvasRef.nativeElement;
  }

  @ViewChild("leftCanvas") public leftCanvasRef: ElementRef;
  @ViewChild("rightCanvas") public rightCanvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private sceneService: SceneService,
                     private gameViewService: GameViewService) {
    this.gameCard = this.gameViewService.gamecard;
  }

  public ngOnInit(): void {
    this.sceneService.createOriginalCanvas(this.leftCanvas);
    this.ngZone.runOutsideAngular(() => this.renderLeft());
    this.sceneService.createModifiedCanvas(this.rightCanvas);
    this.ngZone.runOutsideAngular(() => this.renderRight());
    this.sceneService.generateAllObjects(this.gameCard.title);
  }

  public renderLeft(): void {
    this.sceneService.renderLeft(this.leftCanvas);
  }

  public renderRight(): void {
    this.sceneService.renderRight(this.rightCanvas);
  }
}
