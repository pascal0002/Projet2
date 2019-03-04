// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { GameViewService } from "../game-view/game-view.service";
import { Game3DComponent } from "./game-3d.component";

describe("Game3DComponent", () => {
  const ngZone: any = jasmine.createSpy("NgZone");
  const sceneService: any = jasmine.createSpy("SceneService");
  const gameViewService: GameViewService = new GameViewService();

  const component: Game3DComponent = new Game3DComponent(ngZone, sceneService, gameViewService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    }).compileComponents()
      .catch((err: any) => new ErrorHandler());
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
