// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import { firstLineBlackPixels, whitePixels } from "../../../../server/mock/bitmapImage-mock";
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
    service.getImagePixels("/mock/testImage.bmp")
      .then(
        (res) => {
          for (let i: number = 0; i < 921600; i++) {
            (i < 1920 * 3) ? expect(res[i]).toEqual(0) : expect(res[i]).toEqual(255);
          }
        },
      );
  });

    /*it("should return an array of pixels for the specified image (an image with black pixels on the first 3 lines)", () => {
    let httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
    const imageDisplayerService: ImageDisplayerService = new ImageDisplayerService(httpClientSpy);
    const res: number[] = [];
    httpClientSpy.post.and.returnValue(TestHelper.asyncData(res));
    // The first three lines of testImage.bmp are black pixels.
    httpClientSpy = imageDisplayerService.getImagePixels("/mock/testImage.bmp");
    for (let i: number = 0; i < 921600; i++) {
      (i < 1920 * 3) ? expect(res[i]).toEqual(0) : expect(res[i]).toEqual(255);
    }
  });*/

  it("should not return an array of the image pixels when the path is empty", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);

    service.getImagePixels("").catch((err: Error) => { expect(err).toBeTruthy(); });
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
      service.getImagePixels("/mock/testImage.bmp")
        .then(
          (res) => {
            service.drawPixelsInCanvas(ctx, res);
            expect(ctx.getImageData(0, 0, 640, 480).data).toEqual(res);
          },
        );
    }
  });

  it("should return the folder location of the specified original image", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    expect(service.getFolderLocation("testImage.bmp", true)).toEqual("/public/originalImages/testImage.bmp");
  });

  it("should return the folder location of the specified modified image", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    expect(service.getFolderLocation("modifImage.bmp", false)).toEqual("/public/modifiedImages/modifImage.bmp");
  });

  it("should erase 1 black pixel if a difference of 1 pixel needs to be erased", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const testCanvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = testCanvas.getContext("2d") as CanvasRenderingContext2D;

    service.originalImagePixels = whitePixels;
    service.modifiedImagePixels = firstLineBlackPixels;

    // The first pixel of the last line because the images are flipped when trying to erase a difference
    const posOfPixelsToChange: number[] = [];
    posOfPixelsToChange.push(919680);

    service.eraseDifference(ctx, posOfPixelsToChange);
    expect(service.modifiedImagePixels[0]).toEqual(255);
    expect(service.modifiedImagePixels[1]).toEqual(255);
    expect(service.modifiedImagePixels[2]).toEqual(255);
  });

  it("should be able to erase a white difference of 3 pixels and turn it black", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const testCanvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = testCanvas.getContext("2d") as CanvasRenderingContext2D;

    service.originalImagePixels = firstLineBlackPixels;
    service.modifiedImagePixels = whitePixels;

    const posOfPixelsToChange: number[] = [];
    // Pushing the pos of 3 white pixels
    for (let i: number = 919680; i < 919689; i += 3) {
      posOfPixelsToChange.push(i);
    }

    service.eraseDifference(ctx, posOfPixelsToChange);
    for (let i: number = 0; i < 99; i++) {
      (i < 9) ?
      expect(service.modifiedImagePixels[i]).toEqual(0)
      : expect(service.modifiedImagePixels[i]).toEqual(255);
    }
  });

  it("should erase the first black line (640 pixels) of a difference", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const testCanvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = testCanvas.getContext("2d") as CanvasRenderingContext2D;

    service.originalImagePixels = whitePixels;
    service.modifiedImagePixels = firstLineBlackPixels;

    // The top line because the images are flipped when trying to erase a difference
    const posOfPixelsToChange: number[] = [];
    for (let i: number = 919680; i < 921600; i += 3) {
      posOfPixelsToChange.push(i);
    }

    service.eraseDifference(ctx, posOfPixelsToChange);
    expect(service.modifiedImagePixels).toEqual(whitePixels);
  });

});
