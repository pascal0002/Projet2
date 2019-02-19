import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { ISnapshot } from "../../../../common/communication/Snapshot";
import { IThreeObject } from "../../../../common/communication/ThreeObject";
import { GameCard } from "../../../../common/communication/game-card";
import { Game3dGeneratorService } from "../game-3d/game-3d-generator.service";
@Injectable({
  providedIn: "root",
})
export class SceneService {

  public originalScene: THREE.Scene;
  public modifiedScene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public glRenderer: THREE.WebGLRenderer;

  public constructor(private http: HttpClient, private game3dGeneratorService: Game3dGeneratorService) {}

  public createOriginalCanvas(canvas: HTMLCanvasElement): void {
    this.makeOriginalScene(canvas);
    this.game3dGeneratorService.generateObjectsLeft();
    this.addLighting(this.originalScene);
  }

  private makeOriginalScene(canvas: HTMLCanvasElement): void {
    this.originalScene = new THREE.Scene();
    this.originalScene.background = new THREE.Color("skyblue");
    this.camera = new THREE.PerspectiveCamera(Constants.CAMERA_FIELD_OF_VIEW, canvas.clientWidth / canvas.clientHeight,
                                              1, Constants.CAMERA_RENDER_DISTANCE);
    this.camera.position.z = Constants.Z_CAMERA_POSITION;
    this.glRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, preserveDrawingBuffer: true });
  }

  public createModifiedCanvas(rightCanvas: HTMLCanvasElement): void {
    this.makeModifiedScene(rightCanvas);
    this.game3dGeneratorService.generateObjectsRight();
    this.addLighting(this.modifiedScene);
  }

  private makeModifiedScene(rightCanvas: HTMLCanvasElement): void {
    this.modifiedScene = new THREE.Scene();
    this.modifiedScene.background = new THREE.Color("skyblue");
    this.glRenderer = new THREE.WebGLRenderer({ canvas: rightCanvas, antialias: true});
  }

  private addLighting(scene: THREE.Scene): void {
    const light: THREE.AmbientLight
      = new THREE.AmbientLight(Constants.AMBIENT_LIGHT_COLOR, Constants.AMBIENT_LIGHT_INTENSITY);
    const directionalLight: THREE.DirectionalLight
      = new THREE.DirectionalLight(Constants.DIRECTIONAL_LIGHT_COLOR, Constants.DIRECTIONAL_LIGHT_INTENSITY);

    scene.add(light);
    scene.add(directionalLight);
  }

  public renderLeft(canvas: HTMLCanvasElement): void {
    this.glRenderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => {
      this.renderLeft(canvas);
    });
    this.glRenderer.render(this.originalScene, this.camera);
  }

  public renderRight(canvas: HTMLCanvasElement): void {
    this.glRenderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => {
      this.renderRight(canvas);
    });
    this.glRenderer.render(this.modifiedScene, this.camera.clone());
  }

  public async createObjects(formInfo: IFormInfo3D): Promise<IThreeObject[]> {
    return this.http.post<IThreeObject[]>(`${Constants.SERVER_BASE_URL}api/scene/objects`, formInfo).toPromise();
  }

  public async generateObjects(objects: IThreeObject[], gameName: string): Promise<GameCard> {

    for (const object of objects) {
      const threeObject: THREE.Mesh = this.createBasicObject(object);
      this.translateObject(threeObject, object);
      this.rotateObject(threeObject, object);
      this.originalScene.add(threeObject);
    }
    await this.delay(1);

    return this.saveAsImage(gameName);
  }

  private createBasicObject(object: IThreeObject): THREE.Mesh {
    const material: THREE.MeshStandardMaterial = this.makeRandomColors(object);
    const geometry: THREE.Geometry = this.chooseObject(object.diameter, object.height, object.type);

    return new THREE.Mesh(geometry, material);
  }

  private makeRandomColors(object: IThreeObject): THREE.MeshStandardMaterial {
    const color: THREE.Color = new THREE.Color(object.color);

    return new THREE.MeshStandardMaterial({ color: color, metalness: 0.1 });
  }

  private chooseObject(diameter: number, height: number, choice: number): THREE.Geometry {
    let geometry: THREE.Geometry;
    switch (choice) {
      case Constants.SPHERE:
        geometry = new THREE.SphereGeometry(diameter * Constants.HALF_VALUE,
                                            Constants.RADIAL_PRECISION, Constants.RADIAL_PRECISION);
        break;
      case Constants.CUBE:
        geometry = new THREE.BoxGeometry(diameter, diameter, diameter);
        break;
      case Constants.CYLINDER:
        geometry = new THREE.CylinderGeometry(diameter * Constants.HALF_VALUE, diameter * Constants.HALF_VALUE,
                                              height, Constants.RADIAL_PRECISION);
        break;
      case Constants.CONE:
        geometry = new THREE.ConeGeometry(diameter * Constants.HALF_VALUE, height, Constants.RADIAL_PRECISION);
        break;
      case Constants.PYRAMID:
        geometry = new THREE.ConeGeometry(diameter * Constants.HALF_VALUE, height, Constants.PYRAMID_BASE_SIDES_NB);
        break;
      default:
        geometry = new THREE.ConeGeometry(diameter * Constants.HALF_VALUE, height, Constants.PYRAMID_BASE_SIDES_NB);
    }

    return geometry;
  }

  private translateObject(threeObject: THREE.Mesh, object: IThreeObject): void {
    threeObject.position.set(object.position[0], object.position[1], object.position[1 + 1]);
  }

  private rotateObject(threeObject: THREE.Mesh, object: IThreeObject): void {
    threeObject.rotateX(object.orientation[0]);
    threeObject.rotateY(object.orientation[1]);
    threeObject.rotateZ(object.orientation[1 + 1]);
  }

  private async delay(ms: number): Promise<{}> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async saveAsImage(gameName: string): Promise<GameCard> {
    const imageData: string = this.glRenderer.domElement.toDataURL("image/jpeg");
    const snapshot: ISnapshot = {
      gameName: gameName,
      imageData: imageData,
    };
    for (let i: number = this.originalScene.children.length - 1; i >= 0; i--) {
      this.originalScene.remove(this.originalScene.children[i]);
    }
    this.addLighting(this.originalScene);

    return this.http.post<GameCard>(`${Constants.SERVER_BASE_URL}api/scene/gameCard3D/imageData`, snapshot)
      .toPromise();
  }
}
