 // tslint:disable:no-any

import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { GameView2DComponent } from "./game-view-2d.component";

describe("GameView2DComponent", () => {
  let component: GameView2DComponent;
  let fixture: ComponentFixture<GameView2DComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [  ],
    })
    .compileComponents()
    .catch((err: any) => new ErrorHandler());
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
