 // tslint:disable:no-any
 // tslint:disable:no-any

import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ListOfGamesViewComponent } from "./list-of-games-view.component";

describe("PartsListViewComponent", () => {
  let component: ListOfGamesViewComponent;
  let fixture: ComponentFixture<ListOfGamesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfGamesViewComponent ],
    })
    .compileComponents()
    .catch((err) => new ErrorHandler());
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfGamesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
