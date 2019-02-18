import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { SceneService } from "../scene-constructor/scene.service";
import { Game3dGeneratorService } from "./game-3d-generator.service";

@Component({
  selector: "app-game-3d",
  templateUrl: "./game-3d.component.html",
  styleUrls: ["./game-3d.component.css"],
})
export class Game3DComponent implements OnInit {

  public get leftCanvas(): HTMLCanvasElement {
    return this.leftCanvasRef.nativeElement;
  }

  public get rightCanvas(): HTMLCanvasElement {
    return this.rightCanvasRef.nativeElement;
  }

  @ViewChild("leftCanvas") public leftCanvasRef: ElementRef;
  @ViewChild("rightCanvas") public rightCanvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private sceneService: SceneService,
                     private game3dGeneratorService: Game3dGeneratorService) {/**/}

  public ngOnInit(): void {
    this.sceneService.createOriginalCanvas(this.leftCanvas);
    this.ngZone.runOutsideAngular(() => this.render());
    this.sceneService.createOriginalCanvas(this.rightCanvas);
    this.ngZone.runOutsideAngular(() => this.render());
  }

  public render(): void {
    this.sceneService.render(this.leftCanvas);
    this.sceneService.render(this.rightCanvas);
  }
}
