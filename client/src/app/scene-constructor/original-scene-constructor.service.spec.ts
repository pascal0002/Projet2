import { TestBed } from "@angular/core/testing";
import { OriginalSceneConstructorService } from "./original-scene-constructor.service";

describe("OriginalSceneConstructorService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: OriginalSceneConstructorService = TestBed.get(OriginalSceneConstructorService);
    expect(service).toBeTruthy();
  });
});
