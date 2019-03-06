// tslint:disable:no-magic-numbers

import { TestBed } from "@angular/core/testing";
import { IClickInfo } from "../../../../common/communication/ClickInfo";
import { Constants } from "../../../../common/communication/Constants";
import { ErrorDisplayer2dService } from "./error-displayer-2d.service";

describe("ErrorDisplayer2dService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ErrorDisplayer2dService = TestBed.get(ErrorDisplayer2dService);
    expect(service).toBeTruthy();
  });

  it("should change the click permission to false if subscribed to my subject", () => {
    const service: ErrorDisplayer2dService = new ErrorDisplayer2dService();
    let clickPermission: boolean = true;
    service.clickingPermission.subscribe((permission) => clickPermission = permission);
    service["changeClickingPermission"](false);
    expect(clickPermission).toBeFalsy();
  });

  it("should change the click permission to true if subscribed to my subject", () => {
    const service: ErrorDisplayer2dService = new ErrorDisplayer2dService();
    let clickPermission: boolean = true;
    service.clickingPermission.subscribe((permission) => clickPermission = permission);
    service["changeClickingPermission"](true);
    expect(clickPermission).toBeTruthy();
  });

  it("should correctly set the font of the canvas context", () => {
    const service: ErrorDisplayer2dService = new ErrorDisplayer2dService();
    const testCanvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D = testCanvas.getContext("2d") as CanvasRenderingContext2D;
    service["setStyle"](ctx);
    const redColorHex: string = "#ff0000";
    expect(ctx.font).toEqual(Constants.ERROR_FONT);
    expect(ctx.fillStyle).toEqual(redColorHex);
  });

  it("should correctly adjust the position of the error message", () => {
    const service: ErrorDisplayer2dService = new ErrorDisplayer2dService();
    const clickPos: IClickInfo = service["getAdjustedErrorPosition"](100, 100);
    expect(clickPos.xPos).toEqual(25);
    expect(clickPos.yPos).toEqual(85);
  });
});
