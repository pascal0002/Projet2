// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { Constants } from "../../../../common/communication/Constants";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { IThreeObject } from "../../../../common/communication/ThreeObject";
import { GameCard } from "../../../../common/communication/game-card";
import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { Game3dGeneratorService } from "../game-3d/game-3d-generator.service";
import { SceneService } from "./scene.service";

const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
let game3dGeneratorService: Game3dGeneratorService;
let sceneService: SceneService;
let mockObjects: IThreeObject[];
let testObject: IThreeObject;

describe("SceneService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    });
    game3dGeneratorService = new Game3dGeneratorService(httpClientSpy);
    sceneService = new SceneService(httpClientSpy, game3dGeneratorService);
    mockObjects = [];
    testObject = {color: "rgb(102,102,102)", diameter: 102, height: 102, position: [102, 102, 102], orientation: [102, 102, 102], type: 0};
  });

  describe("createObjects", () => {
    it("should call the http request only once", () => {
      const mockFormInfo3D: IFormInfo3D = { gameName: "Nom", objectType: "", numberOfObjects: 40, addObjects: true,
                                            modifyObjects: true, deleteObjects: false };
      mockObjects.push(testObject);

      httpClientSpy.post.and.returnValue(TestHelper.asyncData(mockObjects));
      sceneService.createObjects(mockFormInfo3D)
      .catch((err: any) => new ErrorHandler());

      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });

  describe("generateObjects", () => {
    it("should call the http request only once", () => {
      const gameName: string = "testGame";
      const mockGameCard: GameCard = { title: gameName, image: "", imageModified: "",
                                       bestTimeSolo: [{user: "", time: 0}, {user: "", time: 0}, {user: "", time: 0}],
                                       bestTime1v1: [{user: "", time: 0}, {user: "", time: 0}, {user: "", time: 0}],
                                       dimension: 1};
      mockObjects.push(testObject);

      httpClientSpy.post.and.returnValue(TestHelper.asyncData(mockGameCard));
      sceneService.generateObjects(mockObjects, gameName)
      .catch((err: any) => new ErrorHandler());

      expect(httpClientSpy.post.calls.count()).toBe(1);
    });

    it("should be able to take a screenshot", () => {
      const gameName: string = "testGame";
      mockObjects.push(testObject);

      sceneService.generateObjects(mockObjects, gameName)
      .catch((err: any) => new ErrorHandler());

      expect(sceneService.originalGlRenderer.getDrawingBufferSize).not.toEqual(0);
    });
  });

  describe("createOriginalCanvas", () => {
    it("should set the original scene background color to skyblue", () => {
      const testCanvas: HTMLCanvasElement = document.createElement("canvas");
      const backgroundColor: THREE.Color = new THREE.Color("skyblue");

      sceneService.createOriginalCanvas(testCanvas);

      expect(sceneService.originalScene.background).toEqual(backgroundColor);
    });

    it("should create the camera with the expected settings", () => {
      const testCanvas: HTMLCanvasElement = document.createElement("canvas");

      sceneService.createOriginalCanvas(testCanvas);
      expect(sceneService.camera.position.z).toEqual(Constants.Z_CAMERA_POSITION);
      expect(sceneService.camera.fov).toEqual(Constants.CAMERA_FIELD_OF_VIEW);
      expect(sceneService.camera.aspect).toEqual(testCanvas.clientWidth / testCanvas.clientHeight);
      expect(sceneService.camera.near).toEqual(Constants.CAMERA_MINIMAL_DISTANCE);
      expect(sceneService.camera.far).toEqual(Constants.CAMERA_RENDER_DISTANCE);
    });

    it("should create the original WebGlRenderer with the expected canvas", () => {
      const testCanvas: HTMLCanvasElement = document.createElement("canvas");

      sceneService.createOriginalCanvas(testCanvas);
      expect(sceneService.originalGlRenderer.domElement).toEqual(testCanvas);
    });
  });

  describe("createModifiedCanvas", () => {
    it("should set the modified scene background color to skyblue", () => {
      const testCanvas: HTMLCanvasElement = document.createElement("canvas");
      const backgroundColor: THREE.Color = new THREE.Color("skyblue");

      sceneService.createModifiedCanvas(testCanvas);

      expect(sceneService.modifiedScene.background).toEqual(backgroundColor);
    });

    it("should create the modified WebGlRenderer with the expected canvas", () => {
      const testCanvas: HTMLCanvasElement = document.createElement("canvas");

      sceneService.createModifiedCanvas(testCanvas);
      expect(sceneService.modifiedGlRenderer.domElement).toEqual(testCanvas);
    });
  });
});
