// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import { BitmapEncoder } from "../../../../server/app/services/bitmap-encoder.service";
import { BmpFileGenerator } from "../../../../server/app/services/bmp-file-generator.service";
import { firstLineBlackPixels } from "../../../../server/mock/bitmapImage-mock";
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

  it("should return an array of pixels for the specified image", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const bitmapEncoder: BitmapEncoder = new BitmapEncoder();
    const bmpFileGenerator: BmpFileGenerator = new BmpFileGenerator(bitmapEncoder);

    const testImagePixels: number[] = firstLineBlackPixels;
    bmpFileGenerator.createTemporaryFile(testImagePixels, "/mock/", "testImage.bmp");

    service.getImagePixels("/mock/testImage.bmp").then((res) => {
        for (let i: number = 0; i < 1920; i++ ) {
            expect(res[i]).toEqual(0);
        }
    });
  });

  /*it("should not return an array of the image pixels", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    expect(service.getImagePixels("")).toBeFalsy();
  });

    it("should put the pixels in the canvas", () => {
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
