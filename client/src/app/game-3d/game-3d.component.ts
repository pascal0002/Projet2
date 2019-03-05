import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { Constants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "../game-view/game-view.service";
import { SceneService } from "../scene/scene.service";
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

  @ViewChild(Constants.ORIGINAL_CANVAS_3D) public leftCanvasRef: ElementRef;
  @ViewChild(Constants.MODIFIED_CANVAS_3D) public rightCanvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private sceneService: SceneService, private gameViewService: GameViewService) {
    this.gameCard = this.gameViewService.model.gamecard;
  }

  public ngOnInit(): void {
    // this.gameViewService.startChrono();
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
