// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import { FormControl, FormGroup } from "@angular/forms";
import { IFormInfo3D } from "../../../../common/communication/FormInfo3D";
import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { SceneService } from "../scene/scene.service";
import { FormHandler3DService } from "./form-handler-3d.service";

const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
const gameGenerator: any = jasmine.createSpy("Game3dGeneratorService");
const sceneService: SceneService = new SceneService(httpClientSpy, gameGenerator);
const listOfGameServiceSpy: any = jasmine.createSpyObj("ListOfGamesService", ["addGameCard3D"]);
const formValidatorService: FormHandler3DService = new FormHandler3DService(httpClientSpy, listOfGameServiceSpy,  sceneService);

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
    expect(formValidatorService).toBeTruthy();
  });

  it("the HttpClient to send the 3D info should only be called once", () => {
    const httpSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
    const formValidator: FormHandler3DService = new FormHandler3DService(httpSpy, listOfGameServiceSpy, sceneService);

    const formSent: IFormInfo3D = {
      gameName: "test1",
      objectType: "Theme1",
      numberOfObjects: 23,
      addObjects: true,
      modifyObjects: true,
      deleteObjects: false,
    };

    httpSpy.post.and.returnValue(TestHelper.asyncData(formSent));
    formValidator.send3DFormInfo(formSent)
    .catch((err: Error) => {console.error(err); });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it("the HttpClient used to create 3D objects should only be called once", () => {
    const formSent: IFormInfo3D = {
      gameName: "test1",
      objectType: "Theme1",
      numberOfObjects: 23,
      addObjects: true,
      modifyObjects: true,
      deleteObjects: false,
    };

    httpClientSpy.post.and.returnValue(TestHelper.asyncData(formSent));
    formValidatorService.createObjects(formSent);
    expect(httpClientSpy.post.calls.count()).toBe(1);
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
