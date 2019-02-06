import { TestBed } from "@angular/core/testing";

import { FormHandler3DService } from "./form-handler-3d.service";

describe("FormHandler3DService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FormHandler3DService = TestBed.get(FormHandler3DService);
    expect(service).toBeTruthy();
  });
});
