import { TestBed } from "@angular/core/testing";

import { ClickPermissionService } from "./click-permission.service";

describe("ClickPermissionService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    expect(service).toBeTruthy();
  });

  it("should be created", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    expect(service).toBeTruthy();
  });

  it("should set the attribute canSendInfoToServer to false if we block the clicks", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.blockClicksToServer();
    expect(service.canSendInfoToServer).toBeFalsy();
  });

  it("should not be able to click again initially", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    expect(service.canClickAgain()).toBeFalsy();
  });

  it("should not be able to click again if you can't send the info to the server", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.canSendInfoToServer = false;
    service.clickIsEnabled = true;
    expect(service.canClickAgain()).toBeFalsy();
  });

  it("should not be able to click again if the click is disabled", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.clickIsEnabled = false;
    service.canSendInfoToServer = true;
    expect(service.canClickAgain()).toBeFalsy();
  });

  it("should not be able to click again if the click is disabled and if you cant send the info to the server", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.clickIsEnabled = false;
    service.canSendInfoToServer = false;
    expect(service.canClickAgain()).toBeFalsy();
  });

  it("should be able to click again if you can send the click to the server and if you can click", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.canSendInfoToServer = true;
    service.clickIsEnabled = true;
    expect(service.canClickAgain()).toBeTruthy();
  });

  it("should return true if the user has clicked an error", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.clickIsEnabled = false;
    expect(service.hasClickedAnError()).toBeTruthy();
  });

  it("should return false if the user hasn't clicked an error", () => {
    const service: ClickPermissionService = TestBed.get(ClickPermissionService);
    service.clickIsEnabled = true;
    expect(service.hasClickedAnError()).toBeFalsy();
  });
});
