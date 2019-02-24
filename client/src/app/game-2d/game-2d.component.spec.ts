// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { GameViewService } from "../game-view/game-view.service";
import { DifferenceValidatorService } from "./difference-validator.service";
import { Game2DComponent } from "./game-2d.component";
import { ImageDisplayerService } from "./image-displayer.service";

describe("GameCardFormComponent3D", () => {
  const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
  const component: Game2DComponent = new Game2DComponent(new GameViewService(),
                                                         new DifferenceValidatorService(httpClientSpy),
                                                         new ImageDisplayerService(httpClientSpy));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    })
    .compileComponents()
    .catch((err: any) => new ErrorHandler());

  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
