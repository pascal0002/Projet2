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
  public originalGlRenderer: THREE.WebGLRenderer;
  public modifiedGlRenderer: THREE.WebGLRenderer;

  public constructor(private http: HttpClient, private game3dGeneratorService: Game3dGeneratorService) {
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
  }

  public createOriginalCanvas(canvas: HTMLCanvasElement): void {
    this.makeOriginalScene(canvas);
    this.addLighting(this.originalScene);
  }

  private makeOriginalScene(canvas: HTMLCanvasElement): void {
    this.originalScene.background = new THREE.Color("skyblue");
    this.camera = new THREE.PerspectiveCamera(Constants.CAMERA_FIELD_OF_VIEW, canvas.clientWidth / canvas.clientHeight,
      1, Constants.CAMERA_RENDER_DISTANCE);
    this.camera.position.z = Constants.Z_CAMERA_POSITION;
    this.originalGlRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, preserveDrawingBuffer: true });
  }

  public createModifiedCanvas(rightCanvas: HTMLCanvasElement): void {
    this.makeModifiedScene(rightCanvas);
    this.addLighting(this.modifiedScene);
  }

  private makeModifiedScene(rightCanvas: HTMLCanvasElement): void {
    this.modifiedScene.background = new THREE.Color("skyblue");
    this.modifiedGlRenderer = new THREE.WebGLRenderer({ canvas: rightCanvas, antialias: false });
  }

  public generateAllObjects(title: string): void {
    this.game3dGeneratorService.generateGame(this.originalScene, this.modifiedScene, title);
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
    this.originalGlRenderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => {
      this.renderLeft(canvas);
    });
    this.originalGlRenderer.render(this.originalScene, this.camera);
  }

  public renderRight(canvas: HTMLCanvasElement): void {
    this.modifiedGlRenderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => {
      this.renderRight(canvas);
    });
    this.modifiedGlRenderer.render(this.modifiedScene, this.camera.clone());
  }

  public async createObjects(formInfo: IFormInfo3D): Promise<IThreeObject[]> {
    return this.http.post<IThreeObject[]>(`${Constants.SERVER_BASE_URL}api/scene/objects`, formInfo).toPromise();
  }

  public async generateObjects(objects: IThreeObject[], gameName: string): Promise<GameCard> {

    this.game3dGeneratorService.generateObjects(objects, this.originalScene);
    await this.delay(1);

    return this.saveImageData(gameName);
  }

  private async delay(ms: number): Promise<{}> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async saveImageData(gameName: string): Promise<GameCard> {
    const imageData: string = this.originalGlRenderer.domElement.toDataURL("image/jpeg");
    const snapshot: ISnapshot = {
      gameName: gameName,
      imageData: imageData,
    };
    this.clearObjects();
    this.addLighting(this.originalScene);

    return this.http.post<GameCard>(`${Constants.SERVER_BASE_URL}api/scene/gameCard3D/imageData`, snapshot)
      .toPromise();
  }

  public clearObjects(): void {
    // Future méthode servant à libérer la mémoire de la scène
  }
}
