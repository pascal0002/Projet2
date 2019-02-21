// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
// import * as THREE from "three";
import { IThreeObject } from "../../../../common/communication/ThreeObject";
import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { Game3dGeneratorService } from "../game-3d/game-3d-generator.service";
import { SceneService } from "./scene.service";
// import { IThreeObject } from "../../../../common/communication/ThreeObject";

const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
let game3dGeneratorService: Game3dGeneratorService;
let sceneService: SceneService;
// let objects: IThreeObject[];
// let testObject: IThreeObject;
// let scene: THREE.Scene;

describe("SceneService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    });

    game3dGeneratorService = new Game3dGeneratorService(httpClientSpy);
    sceneService = new SceneService(httpClientSpy, game3dGeneratorService);
  });

  describe("createObjects", () => {
    it("should call the http request only once", () => {
      const mockFormInfo3D: IFormInfo3D = { gameName: "Nom", objectType: "", numberOfObjects: 40, addObjects: true,
                                            modifyObjects: true, deleteObjects: false };


      httpClientSpy.post.and.returnValue(TestHelper.asyncData(mockFormInfo3D));

      sceneService.createObjects(mockFormInfo3D);
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });

    it("should return the right IThreeObject array", () => {
      const mockFormInfo3D: IFormInfo3D = { gameName: "Nom", objectType: "", numberOfObjects: 40, addObjects: true,
                                            modifyObjects: true, deleteObjects: false };

      const mockIThreeObject: IThreeObject = {color: "rgb(255,0,255)", diameter: 10, height: 10, orientation: [1, 1, 1], type: 3,
                                              position: [1, 1 , 1] };
      const mockIThreeObjects: IThreeObject[] = [mockIThreeObject];
      httpClientSpy.post.and.returnValue(TestHelper.asyncData(mockIThreeObjects));

      sceneService.createObjects(mockFormInfo3D).then((res: IThreeObject[]) => {
        expect(res.length).toEqual(1);
      });
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });

  describe("createObjects", () => {
    it("should call the http request only once", () => {
      const mockFormInfo3D: IFormInfo3D = { gameName: "Nom", objectType: "", numberOfObjects: 40, addObjects: true,
                                            modifyObjects: true, deleteObjects: false };
      httpClientSpy.post.and.returnValue(TestHelper.asyncData(mockFormInfo3D));

      sceneService.createObjects(mockFormInfo3D);
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });
});
