import { TestBed } from "@angular/core/testing";

import { FormValidator2dService } from "./form-validator-2d.service";

describe("FormHandler2dService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service).toBeTruthy();
  });
});
