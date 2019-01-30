import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .catch((err) => new ErrorHandler())
    .compileComponents();
  }));
  it("should create the app", async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(
      AppComponent,
    );
    // tslint:disable-next-line:no-any
    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
