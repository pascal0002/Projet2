// tslint:disable:no-any
import { async, TestBed } from "@angular/core/testing";
import { Game2DMultiplayerComponent } from "./game-2d-multiplayer.component";

describe("Game2DMultiplayerComponent", () => {
  const component: any = jasmine.createSpy("Game2DMultiplayerComponent");

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Game2DMultiplayerComponent ],
    })
    .compileComponents();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
