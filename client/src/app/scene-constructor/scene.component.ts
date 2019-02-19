import { Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { SceneService } from "./scene.service";

@Component({
  selector: "app-scene",
  templateUrl: "scene.component.html",
  styleUrls: ["scene.component.css"],
})

export class SceneComponent implements OnInit {

  public get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild("canvas") public canvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private sceneService: SceneService) {/**/}

  public ngOnInit(): void {
    this.sceneService.createOriginalCanvas(this.canvas);
    this.ngZone.runOutsideAngular(() => this.render());
  }

  public render(): void {
    this.sceneService.renderLeft(this.canvas);
  }
}
