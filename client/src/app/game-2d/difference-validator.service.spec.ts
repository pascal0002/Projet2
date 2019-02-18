// tslint:disable:no-magic-numbers
// import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
// import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { DifferenceValidatorService } from "./difference-validator.service";

// tslint:disable-next-line:no-any
// const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);

describe("DifferenceValidatorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [

      ],
      providers: [],
    });
  });

  it("should be created", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);
    expect(service).toBeTruthy();
  });

  it("should return the correct Y position if the click event returns 0", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);

    expect(service["getCorrectYPos"](0)).toEqual(480);
  });

  it("should return the correct Y position if the click event returns 480", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);

    expect(service["getCorrectYPos"](480)).toEqual(0);
  });

  it("should return the correct Y position if the click event returns 200", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);

    expect(service["getCorrectYPos"](200)).toEqual(280);
  });

  it("should return the correct difference image name if the path is test.bmp", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);
    const mockOriginalImageName: string = "test.bmp";
    service.game2d = {title: "test", image: mockOriginalImageName, bestTime1v1: [], bestTimeSolo: [], dimension: 0};

    service.game2d.image = mockOriginalImageName;
    expect(service["getDifferenceImageName"]()).toEqual("testDifferences.bmp");
  });

  it("should return the correct difference image name if the path is testFolder/test.bmp", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);
    const mockOriginalImageName: string = "testFolder/test.bmp";
    service.game2d = {title: "test", image: mockOriginalImageName, bestTime1v1: [], bestTimeSolo: [], dimension: 0};

    expect(service["getDifferenceImageName"]()).toEqual("testDifferences.bmp");
  });

  it("should return the right click info if the x position and the y position of the click event are 50px", () => {
    const service: DifferenceValidatorService = TestBed.get(DifferenceValidatorService);

    const mockOriginalImageName: string = "testFolder/test.bmp";
    service.game2d = {title: "test", image: mockOriginalImageName, bestTime1v1: [], bestTimeSolo: [], dimension: 0};

    const resultClickInfo: IClickInfo = service.getClickInfo(50, 50);

    expect(resultClickInfo.yPos).toEqual(430);
    expect(resultClickInfo.xPos).toEqual(50);
    expect(resultClickInfo.differenceImageName).toEqual("testDifferences.bmp");
  });

  it("should return the expected click info when using an httpPost. The HttpClient should also only be called once", () => {
    // Used to mock the http call
    // tslint:disable-next-line:no-any
    const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
    ///Dont forget to test this Pascal!
    // const service: DifferenceValidatorService = new DifferenceValidatorService(httpClientSpy);
    // const clickInfoSent: IClickInfo = {
    //   yPos: 0,
    //   xPos: 42,
    //   differenceImageName: "barbecueDifferences.bmp",
    // };

    // httpClientSpy.post.and.returnValue(TestHelper.asyncData(clickInfoSent));
    // service.sendClickInfo(clickInfoSent).then((res: IClickInfo) => {
    //   expect(res.xPos).toEqual(42);
    //   expect(res.yPos).toEqual(0);
    //   expect(res.differenceImageName).toEqual("barbecueDifferences.bmp");
    // }).catch((err) => new ErrorHandler());

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

});
