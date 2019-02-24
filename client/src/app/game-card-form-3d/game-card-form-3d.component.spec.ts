// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { GameCardForm3DComponent } from "./game-card-form-3d.component";

describe("GameCardFormComponent3D", () => {
  const formHandlerService: any = jasmine.createSpy("FormHandler3DService");
  const component: GameCardForm3DComponent = new GameCardForm3DComponent(formHandlerService);

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
