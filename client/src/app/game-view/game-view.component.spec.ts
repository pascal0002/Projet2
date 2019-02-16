 // tslint:disable:no-any

import { GameViewComponent } from "./game-view.component";

describe("GameViewComponent", () => {
  let component: GameViewComponent;
  let fixture: ComponentFixture<GameViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameView2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
