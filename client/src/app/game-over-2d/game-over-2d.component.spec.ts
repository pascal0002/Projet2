import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameOver2DComponent } from "./game-over-2d.component";

describe("GameOverComponent2D", () => {
  let component: GameOver2DComponent;
  let fixture: ComponentFixture<GameOver2DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameOver2DComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOver2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
