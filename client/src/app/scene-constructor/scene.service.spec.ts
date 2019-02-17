import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { SceneService } from "./scene.service";

describe("SceneService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [

      ],
      providers: [],
    });
  });

  it("should be created", () => {
    const service: SceneService = TestBed.get(SceneService);
    expect(service).toBeTruthy();
  });
});
