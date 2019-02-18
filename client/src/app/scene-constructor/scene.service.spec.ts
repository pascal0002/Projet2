// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { SceneService } from "./scene.service";

let httpClientSpy: any;
let service: SceneService;

describe("SceneService", () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    service = new SceneService(httpClientSpy);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
