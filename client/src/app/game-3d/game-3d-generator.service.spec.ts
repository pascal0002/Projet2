import { TestBed } from "@angular/core/testing";
import {AppModule} from "../app.module";
import { Game3dGeneratorService } from "./game-3d-generator.service";

describe("Game3DGeneratorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    });
  });

  it("should be created", () => {
    const service: Game3dGeneratorService = TestBed.get(Game3dGeneratorService);
    expect(service).toBeTruthy();
  });
});
