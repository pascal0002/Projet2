import { AfterViewInit, Component, ElementRef, NgZone, Renderer2, ViewChild } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-open-scene-constructor",
  templateUrl: "open-scene-constructor.component.html",
  styleUrls: ["open-scene-constructor.component.css"],
})

export class OpenSceneConstructorComponent implements AfterViewInit {

  public animationState: string;
  public object: THREE.Mesh;
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
    this.scene.background = new THREE.Color(0xe8ffff);
    this.camera = new THREE.PerspectiveCamera(70, this.canvas.clientWidth / this.canvas.clientHeight, 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 100;
    this.glRenderer = new THREE.WebGLRenderer({ canvas: this.canvas });
  }

  public makeCube(): void {

    const numberOfShapes: number = Math.round(this.getRandomNumber() * 190) + 10;

    for (let i: number = 0; i < numberOfShapes; i++) {
      const material: THREE.MeshStandardMaterial = this.makeRandomColors();
      this.createObject(material);
      this.translateObject();
      this.rotateObject();
      this.scene.add(this.object);
    }
    const light: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(light);
    const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    this.scene.add(directionalLight);
  }

  public createObject(material: THREE.MeshStandardMaterial): void {

    const referenceSize: number = 10;
    const objectSize: number = (this.getRandomNumber() + 0.5) * referenceSize;
    const objectToChoose: number = Math.floor(this.getRandomNumber() * 5);
    let geometry;

    switch (objectToChoose) {
        case 0:
        geometry = new THREE.SphereGeometry(objectSize, 15, 15);
        break;
        case 1:
        geometry = new THREE.BoxGeometry(objectSize, objectSize, objectSize);
        break;
        case 2:
        geometry = new THREE.ConeGeometry(objectSize, objectSize, 15);
        break;
        case 3:
        geometry = new THREE.CylinderGeometry(objectSize, objectSize, objectSize, 15);
        break;
        case 4:
        geometry = new THREE.ConeGeometry(objectSize, objectSize, 3);
        break;
        default:
        geometry = new THREE.ConeGeometry(objectSize, objectSize, 3);
    }
    this.object = new THREE.Mesh(geometry, material);
  }

  private makeRandomColors(): THREE.MeshStandardMaterial {

    const red: number = Math.round(this.getRandomNumber() * 255);
    const green: number = Math.round(this.getRandomNumber() * 255);
    const blue: number = Math.round(this.getRandomNumber() * 255);
    const colorsGenerated: string = "rgb(" + red + "," + green + "," + blue + ")";
    const color: THREE.Color = new THREE.Color(colorsGenerated);

    return new THREE.MeshStandardMaterial( {color: color, metalness: 0.5, roughness: 0.5} );
  }

  public translateObject(): void {
    const xPosition: number = Math.round(this.getRandomNumber() * 180) - 90;
    const yPosition: number = Math.round(this.getRandomNumber() * 80) - 40;
    const zPosition: number = Math.round(this.getRandomNumber() * 60) - 30;
    this.object.position.set(xPosition, yPosition, zPosition);
  }

  public rotateObject(): void {
    this.object.rotateX(this.getRandomNumber() * 360);
    this.object.rotateY(this.getRandomNumber() * 360);
    this.object.rotateZ(this.getRandomNumber() * 360);
  }

  public render(): void {
    this.glRenderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.glRenderer.render(this.scene, this.camera);
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
