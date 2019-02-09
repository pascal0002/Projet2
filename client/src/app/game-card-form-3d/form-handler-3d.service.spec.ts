// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { ErrorHandler } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup } from "@angular/forms";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { FormHandler3DService } from "./form-handler-3d.service";

 // Used to mock the http call
const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
const formValidatorService: FormHandler3DService = new FormHandler3DService(httpClientSpy);

describe("FormHandler3DService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [

      ],
      providers: [],
    });
  });

  it("should be created", () => {
    const service: FormHandler3DService = TestBed.get(FormHandler3DService);
    expect(service).toBeTruthy();
  });

  it("should return the expected form info when using an httpPost. The HttpClient should also only be called once", () => {
    const formSent: IFormInfo3D = {
      gameName: "test1",
      objectType: "Theme1",
      numberOfObjects: 23,
      addObjects: true,
      modifyObjects: true,
      deleteObjects: false,
    };

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(formSent));
    formValidatorService.send3DFormInfo(formSent).then((res: IFormInfo3D) => {
      expect(res.gameName).toEqual("test1");
      expect(res.objectType).toEqual("Theme1");
      expect(res.numberOfObjects).toEqual(23);
      expect(res.addObjects).toBeTruthy();
      expect(res.modifyObjects).toBeTruthy();
      expect(res.deleteObjects).toBeFalsy();
    }).catch((err) => new ErrorHandler());

    expect(httpClientSpy.post.calls.count()).toBe(1, "one call");
  });

  it("should return null (no errors) if 1 checkbox is checked", () => {
    const TEST_FORM_GROUP: FormGroup = new FormGroup({
      addCheckBox: new FormControl(true),
      deleteCheckBox: new FormControl(false),
      modifyCheckBox: new FormControl(false),
    });
    expect(formValidatorService.getValidatorFunction()(TEST_FORM_GROUP)).toBeNull();
  });

  it("should return null (no errors) if 2 checkbox are checked", () => {
    const TEST_FORM_GROUP: FormGroup = new FormGroup({
      addCheckBox: new FormControl(true),
      deleteCheckBox: new FormControl(true),
      modifyCheckBox: new FormControl(false),
    });
    expect(formValidatorService.getValidatorFunction()(TEST_FORM_GROUP)).toBeNull();
  });

  it("should return null (no errors) if 3 checkbox are checked", () => {
    const TEST_FORM_GROUP: FormGroup = new FormGroup({
      addCheckBox: new FormControl(true),
      deleteCheckBox: new FormControl(true),
      modifyCheckBox: new FormControl(true),
    });
    expect(formValidatorService.getValidatorFunction()(TEST_FORM_GROUP)).toBeNull();
  });

  it("should return an error object if no checkbox is checked", () => {
    const TEST_FORM_GROUP: FormGroup = new FormGroup({
      addCheckBox: new FormControl(false),
      deleteCheckBox: new FormControl(false),
      modifyCheckBox: new FormControl(false),
    });
    expect(formValidatorService.getValidatorFunction()(TEST_FORM_GROUP)).toBeDefined();
  });

});
