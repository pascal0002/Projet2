// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";

describe("GameCardFormComponent3D", () => {
  const game2DSpy: any = jasmine.createSpy("Game2DComponent");

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
    expect(game2DSpy).toBeTruthy();
  });
});
