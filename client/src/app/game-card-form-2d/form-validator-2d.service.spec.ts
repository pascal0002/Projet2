import { TestBed } from "@angular/core/testing";

import { FormValidator2dService } from "./form-validator-2d.service";
import { AppModule } from "../app.module";

describe("FormValidator2dService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [
       
      ],
      providers: []
     })});


  it("should be created", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service).toBeTruthy();
  });
});
