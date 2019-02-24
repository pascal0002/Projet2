// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { ListOfGamesViewComponent } from "./list-of-games-view.component";

describe("ListOfGamesViewComponent", () => {
  let component: ListOfGamesViewComponent;
  let fixture: ComponentFixture<ListOfGamesViewComponent>;

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
    fixture = TestBed.createComponent(ListOfGamesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
