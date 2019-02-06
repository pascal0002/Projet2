import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OpenSceneConstructorComponent } from "./open-scene-constructor.component";

describe("OpenSceneConstructorComponent", () => {
  let component: OpenSceneConstructorComponent;
  let fixture: ComponentFixture<OpenSceneConstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSceneConstructorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenSceneConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
