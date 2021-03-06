import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as THREE from "three";
require("three-first-person-controls")(THREE);
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
  public controls: THREE.FirstPersonControls;
  public clock: THREE.Clock = new THREE.Clock();

  public constructor(private http: HttpClient, private game3dGeneratorService: Game3dGeneratorService) {
    this.originalScene = new THREE.Scene();
    this.modifiedScene = new THREE.Scene();
    // l'initialisation des renderer est faite dans le constructeur sans le canvas en paramètre pour que
    // les tests fonctionnent puisqu'ils n'appelent pas le component qui contient le canvas
    this.originalGlRenderer = new THREE.WebGLRenderer();
    this.modifiedGlRenderer = new THREE.WebGLRenderer();
  }

  public createOriginalCanvas(canvas: HTMLCanvasElement): void {
    this.makeOriginalScene(canvas);
    this.initializeMovements(canvas);
    this.addLighting(this.originalScene);
  }

  private makeOriginalScene(canvas: HTMLCanvasElement): void {
    this.originalScene.background = new THREE.Color(Constants.SKYBLUE_COLOR);
    this.camera = new THREE.PerspectiveCamera(Constants.CAMERA_FIELD_OF_VIEW, canvas.clientWidth / canvas.clientHeight,
                                              Constants.CAMERA_MINIMAL_DISTANCE, Constants.CAMERA_RENDER_DISTANCE);
    this.camera.position.z = Constants.Z_CAMERA_POSITION;
    this.originalGlRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, preserveDrawingBuffer: true });
  }

  public createModifiedCanvas(canvas: HTMLCanvasElement): void {
    this.makeModifiedScene(canvas);
    this.addLighting(this.modifiedScene);
  }

  private makeModifiedScene(canvas: HTMLCanvasElement): void {
    this.modifiedScene.background = new THREE.Color(Constants.SKYBLUE_COLOR);
    this.modifiedGlRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });
  }

  public generateAllObjects(title: string): void {
    this.clearObjects();
    this.game3dGeneratorService.generateGame(this.originalScene, this.modifiedScene, title);
  }

  private initializeMovements(canvas: HTMLCanvasElement): void {
    this.controls = new THREE.FirstPersonControls(this.camera, canvas);
    this.controls.movementSpeed = 100;
    this.controls.lookSpeed = 0.25;
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
    this.controls.update(this.clock.getDelta());
    this.originalGlRenderer.render(this.originalScene, this.camera);
  }

  public renderRight(canvas: HTMLCanvasElement): void {
    this.modifiedGlRenderer.setSize(window.innerWidth, window.innerHeight);
    requestAnimationFrame(() => {
      this.renderRight(canvas);
    });
    this.modifiedGlRenderer.render(this.modifiedScene, this.camera);
  }

  public async createObjects(formInfo: IFormInfo3D): Promise<IThreeObject[]> {
    return this.http.post<IThreeObject[]>(Constants.SERVER_BASE_URL + Constants.API + Constants.SCENE_OBJECTS_URL, formInfo).toPromise();
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
    const imageData: string = this.originalGlRenderer.domElement.toDataURL(Constants.FILE_WANTED);
    const snapshot: ISnapshot = {
      gameName: gameName,
      imageData: imageData,
    };
    this.clearObjects();

    return this.http.post<GameCard>(Constants.SERVER_BASE_URL + Constants.API + Constants.GAME_3D_CARD_DATA_URL, snapshot)
      .toPromise();
  }

  private clearObjects(): void {
    for (let i: number = this.originalScene.children.length - 1; i >= 0; i--) {
      this.originalScene.remove(this.originalScene.children[i]);
    }
    for (let i: number = this.modifiedScene.children.length - 1; i >= 0; i--) {
      this.modifiedScene.remove(this.modifiedScene.children[i]);
    }
    this.addLighting(this.originalScene);
    this.addLighting(this.modifiedScene);
  }
}
