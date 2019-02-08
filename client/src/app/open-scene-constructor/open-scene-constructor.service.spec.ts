import { TestBed } from "@angular/core/testing";
import { OpenSceneConstructorService } from "./open-scene-constructor.service";

describe("OpenSceneConstructorService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OpenSceneConstructorService = TestBed.get(OpenSceneConstructorService);
    expect(service).toBeTruthy();
  });
});
