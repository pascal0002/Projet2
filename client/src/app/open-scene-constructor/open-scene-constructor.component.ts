import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import * as THREE from "three";
import {ClientConstants} from "../../../../common/communication/Constants";
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
    this.scene.background = new THREE.Color(ClientConstants.BACKGROUND_COLOR);
    this.camera = new THREE.PerspectiveCamera(ClientConstants.CAMERA_FIELD_OF_VIEW, this.canvas.clientWidth / this.canvas.clientHeight,
                                              1, ClientConstants.CAMERA_RENDER_DISTANCE);
    this.camera.position.z = ClientConstants.Z_CAMERA_POSITION;
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
