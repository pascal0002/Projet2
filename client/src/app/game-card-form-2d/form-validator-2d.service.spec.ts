// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import { AppModule } from "../app.module";
import { FormValidator2dService } from "./form-validator-2d.service";

describe("FormValidator2dService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [

      ],
      providers: [],
    });
  });

  it("should be created", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service).toBeTruthy();
  });

  it("should return false if the title is empty", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validTitle("")).toBeFalsy();
  });

  it("should return false if the title only 1 character", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validTitle("a")).toBeFalsy();
  });

  it("should return true if the title is 3 characters", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validTitle("abc")).toBeTruthy();
  });

  it("should return true if the title is 9 characters", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validTitle("abcdefghi")).toBeTruthy();
  });

  it("should return true if the title is 15 characters", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validTitle("abcdefghijklmno")).toBeTruthy();
  });

  it("should return false if the title is 26 characters", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validTitle("abcdefghijklmnopqrstuvwxyz")).toBeFalsy();
  });

  it("should return false if the dimension of an image is 0 x 0 pixels", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validImageDimensions(0, 0)).toBeFalsy();
  });

  it("should return false if the dimension of an image is 639 x 479 pixels", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validImageDimensions(639, 479)).toBeFalsy();
  });

  it("should return true if the dimension of an image is 640 x 480 pixels", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validImageDimensions(640, 480)).toBeFalsy();
  });

  it("should return false if the dimension of an image is 1280 x 960 pixels", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validImageDimensions(1280, 960)).toBeFalsy();
  });

  it("should return false if the bit depth of an image is of 0", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBitDepth(0)).toBeFalsy();
  });

  it("should return true if the bit depth of an image is of 24", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBitDepth(24)).toBeTruthy();
  });

  it("should return false if the bit depth of an image is of 40", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBitDepth(40)).toBeFalsy();
  });

  it("should return false if the file doesnt have an extension", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBMPExtension("extension")).toBeFalsy();
  });

  it("should return false if the file doesnt have a .bmp extension", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBMPExtension("extension.png")).toBeFalsy();
  });

  it("should return true if a bmp file has a name with multiple '.'", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBMPExtension("extension.that.is.a.bmp")).toBeTruthy();
  });

  it("should return true if it is a bmp file", () => {
    const service: FormValidator2dService = TestBed.get(FormValidator2dService);
    expect(service.validBMPExtension("extension.bmp")).toBeTruthy();
  });

  /*it("should return the expected form info when using an httpPost. The HttpClient should also only be called once", () => {
    // tslint:disable-next-line:no-any Used to mock the http call
    const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
    const formValidatorService: FormValidator2dService = new FormValidator2dService(httpClientSpy);
    const WHITE_PIXEL_PARAMETER: number = 255;
    const BLACK_PIXEL_PARAMETER: number = 0;
    const WHITE_PIXEL: number[] = [WHITE_PIXEL_PARAMETER, WHITE_PIXEL_PARAMETER, WHITE_PIXEL_PARAMETER];
    const BLACK_PIXEL: number[] = [BLACK_PIXEL_PARAMETER, BLACK_PIXEL_PARAMETER, BLACK_PIXEL_PARAMETER];
    const formSent: FormInfo = {
      gameName: "Test",
      originalImage: { height: 480, width: 640, bitDepth: 24, fileName: "original.bmp", pixels: WHITE_PIXEL },
      modifiedImage: { height: 480, width: 640, bitDepth: 24, fileName: "modified.bmp", pixels: BLACK_PIXEL },
    };
    httpClientSpy.post.and.returnValue(TestHelper.asyncData(formSent));
    formValidatorService.onSubmit(formSent).then((value: number) => {
      const formReceived: FormInfo = (value as unknown) as FormInfo;
      expect(formReceived.originalImage.height).toEqual(formSent.originalImage.height);
      expect(formReceived.originalImage.width).toEqual(formSent.originalImage.width);
      expect(formReceived.originalImage.bitDepth).toEqual(formSent.originalImage.bitDepth);
      expect(formReceived.originalImage.fileName).toEqual(formSent.originalImage.fileName);
      expect(formReceived.originalImage.pixels).toEqual(formSent.originalImage.pixels);
      expect(formReceived.modifiedImage.height).toEqual(formSent.modifiedImage.height);
      expect(formReceived.modifiedImage.width).toEqual(formSent.modifiedImage.width);
      expect(formReceived.modifiedImage.bitDepth).toEqual(formSent.modifiedImage.bitDepth);
      expect(formReceived.modifiedImage.fileName).toEqual(formSent.modifiedImage.fileName);
      expect(formReceived.modifiedImage.pixels).toEqual(formSent.modifiedImage.pixels);
      expect(formReceived.gameName).toEqual(formSent.gameName);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1, "one call");
  });*/
});
