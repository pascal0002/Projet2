import { ErrorHandler } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { ListOfGamesViewComponent } from "./list-of-games-view.component";

describe("ListOfGamesViewComponent", () => {
  let component: ListOfGamesViewComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [ ],
    })
    .compileComponents()
    .catch((err) => new ErrorHandler());
  }));

  beforeEach(() => {
    component = new ListOfGamesViewComponent();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
