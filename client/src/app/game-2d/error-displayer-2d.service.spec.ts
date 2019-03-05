import { TestBed } from "@angular/core/testing";

import { ErrorDisplayer2dService } from "./error-displayer-2d.service";

describe("ErrorDisplayer2dService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ErrorDisplayer2dService = TestBed.get(ErrorDisplayer2dService);
    expect(service).toBeTruthy();
  });
});
