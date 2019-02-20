// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
// import { BitmapEncoder } from "../../../../server/app/services/bitmap-encoder.service";
// import { BmpFileGenerator } from "../../../../server/app/services/bmp-file-generator.service";
// import { firstThreeLineBlackPixels } from "../../../../server/mock/bitmapImage-mock";
import { AppModule } from "../app.module";
import { ImageDisplayerService } from "./image-displayer.service";

describe("ImageDisplayerService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    });
  });

  it("should be created", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    expect(service).toBeTruthy();
  });

  it("should return an array of pixels for the specified image (an image with black pixels on the first 3 lines)", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);

    // The first three lines of testImage.bmp are black pixels.
    service.getImagePixels("/mock/testImage.bmp").then((res) => {
        for (let i: number = 0; i < 921600; i++ ) {
            (i < 1920 * 3) ? expect(res[i]).toEqual(0) : expect(res[i]).toEqual(255);
        }
    });
  });

  it("should not return an array of the image pixels when the path is empty", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);

    service.getImagePixels("").then((res) => {
      expect(res).toBeFalsy();
     });
  });

  it("should not return an array of the image pixels when the path is incorrect", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);

    service.getImagePixels("testImage.bmp").then((res) => {
      expect(res).toBeFalsy();
     });
  });

    /*it("should put the pixels in the canvas", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const ctx: CanvasRenderingContext2D = ;
    const testPixels: number[] = [0, 120, 65, 255, 22, 93, 201, 255, 11, 45, 26, 255, 10, 20, 60, 255];
    expect(service.drawPixelsInCanvas(ctx, testPixels)).toBeTruthy();
  });

  it("should not return an array of the image pixels", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    expect(service.getImagePixels("")).toBeFalsy();
  });*/

});
