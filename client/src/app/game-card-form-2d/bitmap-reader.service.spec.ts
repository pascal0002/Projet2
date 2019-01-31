import { TestBed } from "@angular/core/testing";
import { BitmapReaderService } from "./bitmap-reader.service";

describe("BitmapReaderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: BitmapReaderService = TestBed.get(BitmapReaderService);
    expect(service).toBeTruthy();
  });

});
