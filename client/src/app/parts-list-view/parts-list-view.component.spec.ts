import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PartsListViewComponent } from "./parts-list-view.component";

describe("PartsListViewComponent", () => {
  let component: PartsListViewComponent;
  let fixture: ComponentFixture<PartsListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsListViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
