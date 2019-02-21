// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
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

    service.getImagePixels("")
    .catch((err: Error) => { expect(err).toBeTruthy(); });
  });

  it("should not return an array of the image pixels when the path is incorrect", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);

    service.getImagePixels("testImage.bmp")
    .catch((err: Error) => { expect(err).toBeTruthy(); });
  });

  it("should put the pixels in the canvas", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const testCanvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = testCanvas.getContext("2d");

    if (ctx) {
      service.getImagePixels("/mock/testImage.bmp").then((res) => {
        service.drawPixelsInCanvas(ctx, res);
        expect(ctx.getImageData(0, 0, 640, 480).data).toEqual(res);
      });
    }
  });

  /*it("should not return an array of the image pixels", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    expect(service.getImagePixels("")).toBeFalsy();
  });*/

});
