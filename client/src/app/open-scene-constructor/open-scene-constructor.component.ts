import { AfterViewInit, Component, ElementRef, NgZone, Renderer2, ViewChild } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-open-scene-constructor",
  templateUrl: "open-scene-constructor.component.html",
  styleUrls: ["open-scene-constructor.component.css"],
})

export class OpenSceneConstructorComponent implements AfterViewInit {

  public animationState: string;
  public cube: THREE.Mesh;
  public glRenderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @ViewChild("canvas") public canvasRef: ElementRef;

  public constructor(public renderer: Renderer2,
                     private ngZone: NgZone) {
                 this.animationState = "active";
              }

  public makeScene(): void {

    this.scene = new THREE.Scene();
    // proximité du cube
    this.camera = new THREE.PerspectiveCamera(70, this.canvas.clientWidth / this.canvas.clientHeight, 1, 1000);
    this.camera.position.z = 40;

    this.glRenderer = new THREE.WebGLRenderer({ canvas: this.canvas });
  }

  public makeCube(): void {
    // forme du cube
    const geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(10, 10, 10);
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  public render(): void {

    // vitesses et sens de rotation
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y -= 0.01;

    this.glRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.glRenderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.render());
  }

  public ngAfterViewInit(): void {

    this.makeScene();
    this.makeCube();
    this.ngZone.runOutsideAngular(() => this.render());
  }
}
