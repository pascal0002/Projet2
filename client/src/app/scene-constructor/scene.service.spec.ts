// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { Game3dGeneratorService } from "../game-3d/game-3d-generator.service";
import { SceneService } from "./scene.service";

let httpClientSpy: any;
let service: SceneService;

describe("SceneService", () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    service = new SceneService(httpClientSpy, new Game3dGeneratorService(httpClientSpy));
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
