import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppModule } from "../app.module";
import { GameCardFormComponent } from "./game-card-form-2d.component";

describe("GameCardFormComponent", () => {
  let component: GameCardFormComponent;
  let fixture: ComponentFixture<GameCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
