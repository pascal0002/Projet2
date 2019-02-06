import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GameCardForm3DComponent } from "./game-card-form-3d.component";

describe("GameCardFormComponent3D", () => {
  let component: GameCardForm3DComponent;
  let fixture: ComponentFixture<GameCardForm3DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCardForm3DComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardForm3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});