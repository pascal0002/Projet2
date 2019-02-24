// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { async, TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { AdministrationViewComponent } from "./administration-view.component";

describe("AdministrationViewComponent", () => {
  const listOfGameServiceSpy: any = jasmine.createSpy("ListOfGamesService");

  const component: AdministrationViewComponent = new AdministrationViewComponent(listOfGameServiceSpy);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [  ],
    })
    .compileComponents()
    .catch((err: any) => new ErrorHandler());
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
