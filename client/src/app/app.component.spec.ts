// tslint:disable:no-magic-numbers
// tslint:disable:no-any
import { ErrorHandler } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AppModule } from "./app.module";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    })
    .compileComponents()
    .catch((err: any) => new ErrorHandler());
  }));
  it("should create the app", async(() => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(
      AppComponent,
    );

    const app: any = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
