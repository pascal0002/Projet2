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

  public constructor(public renderer: Renderer2, private ngZone: NgZone) {
    this.animationState = "active";
  }

  public makeScene(): void {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, this.canvas.clientWidth / this.canvas.clientHeight, 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 100;
    this.glRenderer = new THREE.WebGLRenderer({ canvas: this.canvas });
  }

  public makeCube(): void {
    // const numberOfShapes: number = Math.round(this.getRandomNumber() * 200)
    for (let i: number = 0; i < 10; i++) {
      const red: number = Math.round(this.getRandomNumber() * 255);
      const green: number = Math.round(this.getRandomNumber() * 255);
      const blue: number = Math.round(this.getRandomNumber() * 255);
      const colorsGenerated: string = "rgb(" + red + "," + green + "," + blue + ")";
      const color: THREE.Color = new THREE.Color(colorsGenerated);
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );

      const cubeSide: number = (this.getRandomNumber() + 0.5) * 16;
      const geometry: THREE.BoxBufferGeometry = new THREE.BoxBufferGeometry(cubeSide, cubeSide, cubeSide);

      this.cube = new THREE.Mesh(geometry, material);
      const xPosition: number = Math.round(this.getRandomNumber() * 160) - 80;
      const yPosition: number = Math.round(this.getRandomNumber() * 70) - 35;
      const zPosition: number = Math.round(this.getRandomNumber() * 80) - 40;
      this.cube.position.set(xPosition, yPosition, zPosition);

      this.scene.add(this.cube);
    }
  }

  public render(): void {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y -= 0.01;

    this.glRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.glRenderer.render(this.scene, this.camera);

    requestAnimationFrame(() => this.render());
  }

  private getRandomNumber(): number {
    return Math.random();
  }

  public ngAfterViewInit(): void {
    this.makeScene();
    this.makeCube();
    this.ngZone.runOutsideAngular(() => this.render());
  }
}
