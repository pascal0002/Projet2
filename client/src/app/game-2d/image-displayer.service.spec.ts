// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import { TestHelper } from "src/test.helper";
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
    expect(service).toBeTruthy()
    .catch((err) => {console.error(err); });
  });

  it("should return an array of pixels when using httpClientSpy", () => {
    const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
    const imageDisplayerService: ImageDisplayerService = new ImageDisplayerService(httpClientSpy);
    const expectedRes: number[] = [12, 155, 35, 17, 231, 84];
    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedRes));

    imageDisplayerService.getImagePixels("/mock/testImage.bmp")
    .then((res: number[]) => {
      for (let i: number = 0; i < res.length; i++) {
        expect(res[i]).toEqual(expectedRes[i])
        .catch((err) => {console.error(err); });
      }
    })
    .catch((err) => {console.error(err); });
  });

  it("should draw the pixels in the canvas", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const testCanvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = testCanvas.getContext("2d") as CanvasRenderingContext2D;
    const pixelsToInsert: number [] = [12, 155, 35, 17, 231, 84];

    // it should add an opacity of 255 after the RGB values of each pixel
    // the pixel colors are drawn in BGR instead of RGB in the canvas
    const expectedResult: number[] = [35, 155, 12, 255, 84, 231, 17, 255];

    service.drawPixelsInCanvas(ctx, pixelsToInsert);
    for (let i: number = 0; i < expectedResult.length; i++) {
      expect(ctx.getImageData(0, 0, 2, 1).data[i]).toEqual(expectedResult[i])
      .catch((err) => {console.error(err); });
    }
  });

  it("should return the folder location of the specified original image", () => {
     const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
     const isTheOriginalImage: boolean = true;
     expect(service.getFolderLocation("originalImage.bmp", isTheOriginalImage)).toEqual("/public/originalImages/originalImage.bmp")
     .catch((err) => {console.error(err); });
   });

  it("should return the folder location of the specified modified image", () => {
     const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
     const isTheOriginalImage: boolean = false;
     expect(service.getFolderLocation("modifImage.bmp", isTheOriginalImage)).toEqual("/public/modifiedImages/modifImage.bmp")
     .catch((err) => {console.error(err); });
   });

  it("should return the pixels flipped", () => {
    const service: ImageDisplayerService = TestBed.get(ImageDisplayerService);
    const pixelsToFlip: number[] = firstLineBlackPixels;

    const flippedPixels: number[] = service["flipPixelsOnYAxis"](pixelsToFlip);
    for (let i: number = 919680; i > 921600; i++) {
      expect(flippedPixels[i]).toEqual(0)
      .catch((err) => {console.error(err); });
    }
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
    expect(service.modifiedImagePixels[0]).toEqual(255)
    .catch((err) => {console.error(err); });
    expect(service.modifiedImagePixels[1]).toEqual(255)
    .catch((err) => {console.error(err); });
    expect(service.modifiedImagePixels[2]).toEqual(255)
    .catch((err) => {console.error(err); });
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
    expect(service.modifiedImagePixels).toEqual(whitePixels)
    .catch((err) => {console.error(err); });
  });

});
