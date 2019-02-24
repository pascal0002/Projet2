// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { SceneComponent } from "./scene.component";

describe("SceneComponent", () => {
  const sceneService: any = jasmine.createSpy("SceneService");
  const ngZone: any = jasmine.createSpy("NgZone");
  const component: SceneComponent = new SceneComponent(ngZone, sceneService);

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
