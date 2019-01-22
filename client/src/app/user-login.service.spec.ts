import { TestBed } from "@angular/core/testing";
import { TestHelper } from "../test.helper";

import { UserLoginService } from "./user-login.service";

// tslint:disable-next-line:no-any Used to mock the http call
let httpClientSpy: any;
let userLoginService: UserLoginService;

describe("UserLoginService", () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["post"]);
    userLoginService = new UserLoginService(httpClientSpy);
  });

  it("should be created", () => {
    const service: UserLoginService = TestBed.get(UserLoginService);
    expect(service).toBeTruthy();
  });

  it("validateUsername should return expected boolean value when expected boolean is false (HttpClient called once)", () => {
    const username: string = "";
    const expectedResponse: boolean = false;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    userLoginService.validateUsername(username).subscribe((response: boolean) => {
      expect(response).toEqual(expectedResponse);
    }, fail);

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });

  it("validateUsername should return expected boolean value when expected boolean is true (HttpClient called once)", () => {
    const username: string = "";
    const expectedResponse: boolean = true;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    userLoginService.validateUsername(username).subscribe((response: boolean) => {
      expect(response).toEqual(expectedResponse);
    }, fail);

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });

  it("validateUsername should return expected boolean value when expected boolean is false (HttpClient called twice)", () => {
    const username: string = "";
    const expectedResponse: boolean = false;
    const numberOfCall: number = 2;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    for (let i: number = 0; i < numberOfCall; i++) {
      userLoginService.validateUsername(username).subscribe((response: boolean) => {
        expect(response).toEqual(expectedResponse);
      }, fail);
    }

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(numberOfCall, "two call");
  });

  it("validateUsername should return expected boolean value when expected boolean is true (HttpClient called twice)", () => {
    const username: string = "";
    const expectedResponse: boolean = true;
    const numberOfCall: number = 2;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    for (let i: number = 0; i < numberOfCall; i++) {
      userLoginService.validateUsername(username).subscribe((response: boolean) => {
        expect(response).toEqual(expectedResponse);
      }, fail);
    }

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(numberOfCall, "two call");
  });

  it("connect should return expected boolean value when expected boolean is false (HttpClient called once)", () => {
    const username: string = "";
    const expectedResponse: boolean = false;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    userLoginService.connect(username).subscribe((response: boolean) => {
      expect(response).toEqual(expectedResponse);
    }, fail);

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });

  it("connect should return expected boolean value when expected boolean is true (HttpClient called once)", () => {
    const username: string = "";
    const expectedResponse: boolean = true;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    userLoginService.connect(username).subscribe((response: boolean) => {
      expect(response).toEqual(expectedResponse);
    }, fail);

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });

  it("connect should return expected boolean value when expected boolean is false (HttpClient called twice)", () => {
    const username: string = "";
    const expectedResponse: boolean = false;
    const numberOfCall: number = 2;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    for (let i: number = 0; i < numberOfCall; i++) {
      userLoginService.connect(username).subscribe((response: boolean) => {
        expect(response).toEqual(expectedResponse);
      }, fail);
    }

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(numberOfCall, "two call");
  });

  it("connect should return expected boolean value when expected boolean is true (HttpClient called twice)", () => {
    const username: string = "";
    const expectedResponse: boolean = true;
    const numberOfCall: number = 2;

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(expectedResponse));

    // check the content of the mocked call
    for (let i: number = 0; i < numberOfCall; i++) {
      userLoginService.connect(username).subscribe((response: boolean) => {
        expect(response).toEqual(expectedResponse);
      }, fail);
    }

    // check if only one call was made
    expect(httpClientSpy.get.calls.count()).toBe(numberOfCall, "two call");
  });
});
