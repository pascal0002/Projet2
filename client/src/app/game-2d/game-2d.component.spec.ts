// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { Game2DComponent } from "./game-2d.component";

describe("GameCardFormComponent3D", () => {
  let component: Game2DComponent;
  let fixture: ComponentFixture<Game2DComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    })
    .compileComponents()
    .catch((err: any) => new ErrorHandler());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Game2DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
