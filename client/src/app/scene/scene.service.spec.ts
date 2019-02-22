// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
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
      sceneService.createObjects(mockFormInfo3D);

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
      sceneService.generateObjects(mockObjects, gameName);

      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
  });
});
