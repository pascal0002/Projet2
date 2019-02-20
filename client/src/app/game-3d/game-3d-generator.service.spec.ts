// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { IThreeObject } from "../../../../common/communication/ThreeObject";
// import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { Game3dGeneratorService } from "../game-3d/game-3d-generator.service";

const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
let game3dGeneratorService: Game3dGeneratorService;
let objects: IThreeObject[];
let testObject: IThreeObject;
let scene: THREE.Scene;

describe("FormHandler3DService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [],
      providers: [],
    });

    game3dGeneratorService = new Game3dGeneratorService(httpClientSpy);
    objects = [];
    testObject = {color: "rgb(102,102,102)", diameter: 102, height: 102, position: [102, 102, 102], orientation: [102, 102, 102], type: 0};
    scene = new THREE.Scene();
  });

  describe("generateGame", () => {
    /*it("the HttpClient used to create 3D objects should only be called once", () => {
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
    });*/
  });

  describe("generateObjects", () => {

    it("should add an object to the scene with the specified color", () => {
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      const color: THREE.Color = new THREE.Color(testObject.color);
      // @ts-ignore
      expect(scene.children[0].material.color).toEqual(color);
    });

    it("should add an object to the scene with the specified position", () => {
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      const position: THREE.Vector3 = new THREE.Vector3(
        testObject.position[0], testObject.position[1], testObject.position[2]);
      // @ts-ignore
      expect(scene.children[0].position).toEqual(position);
    });

    it("should add an object to the scene with the specified orientation", () => {
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      const orientation: THREE.Vector3 = new THREE.Vector3(
        testObject.orientation[0], testObject.orientation[1], testObject.orientation[2]);
      // @ts-ignore
      expect(scene.children[0].position).toEqual(orientation);
    });

    /*it("should add a sphere to the scene", () => {
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      const sphere: Three.Geometry = new SphereGeometry(2);
      expect(scene.children[0].geometry).toEqual();
    });

    /*it("the HttpClient used to create 3D objects should only be called once", () => {
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
    });*/
  });
});
