import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameViewComponent } from "./game-view-2d.component";

describe("GameView2DComponent", () => {
  let component: GameViewComponent;
  let fixture: ComponentFixture<GameViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
