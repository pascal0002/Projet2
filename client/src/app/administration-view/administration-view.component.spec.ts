import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {PartsListViewComponent} from "../parts-list-view/parts-list-view.component"
import { AdministrationViewComponent } from "./administration-view.component";
import { GameCardFormComponent } from "../game-card-form-2d/game-card-form-2d.component";

describe("AdministrationViewComponent", () => {
  let component: AdministrationViewComponent;
  let fixture: ComponentFixture<AdministrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PartsListViewComponent, GameCardFormComponent ],
      declarations: [ AdministrationViewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
