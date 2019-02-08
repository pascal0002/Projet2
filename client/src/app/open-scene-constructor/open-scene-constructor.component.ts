import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import * as THREE from "three";
import { OpenSceneConstructorService } from "./open-scene-constructor.service";

@Component({
  selector: "app-open-scene-constructor",
  templateUrl: "open-scene-constructor.component.html",
  styleUrls: ["open-scene-constructor.component.css"],
})

export class OpenSceneConstructorComponent implements AfterViewInit {

  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public glRenderer: THREE.WebGLRenderer;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild("canvas") public canvasRef: ElementRef;

  public constructor(private ngZone: NgZone, private openSceneConstructorService: OpenSceneConstructorService) {/**/}

  public makeScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe8ffff);
    this.camera = new THREE.PerspectiveCamera(70, this.canvas.clientWidth / this.canvas.clientHeight, 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 100;
    this.glRenderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true});
  }

  public makeObjects(): void {
    this.openSceneConstructorService.makeObjects(this.scene);
  }

  public ngAfterViewInit(): void {
    this.makeScene();
    this.makeObjects();
    this.ngZone.runOutsideAngular(() => this.render());
  }

  public render(): void {
    this.glRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.glRenderer.render(this.scene, this.camera);
  }
}
