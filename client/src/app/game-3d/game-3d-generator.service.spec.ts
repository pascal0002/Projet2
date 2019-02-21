// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { TestBed } from "@angular/core/testing";
import * as THREE from "three";
import { IThreeObject } from "../../../../common/communication/ThreeObject";
import { TestHelper } from "../../test.helper";
import { AppModule } from "../app.module";
import { Game3dGeneratorService } from "../game-3d/game-3d-generator.service";

const httpClientSpy: any = jasmine.createSpyObj("HttpClient", ["post"]);
let game3dGeneratorService: Game3dGeneratorService;
let objects: IThreeObject[];
let testObject: IThreeObject;
let scene: THREE.Scene;

describe("Game3DGeneratorService", () => {
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
    it("should call the http request only once", () => {
      const title: string = "200 formes";
      objects.push(testObject);

      httpClientSpy.post.and.returnValue(TestHelper.asyncData({title : title}));
      game3dGeneratorService.generateGame(scene, scene, title);
      expect(httpClientSpy.post.calls.count()).toBe(1);
    });
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

    it("should add an object to the scene with the specified diameter", () => {
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.parameters.radius).toEqual(testObject.diameter / 2);
    });

    it("should add an object to the scene with the specified height", () => {
      testObject.type = 3;
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.parameters.height).toEqual(testObject.height);
    });

    it("should add a sphere to the scene", () => {
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.type).toEqual("SphereGeometry");
    });

    it("should add a cube to the scene", () => {
      testObject.type = 1;
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.type).toEqual("BoxGeometry");
    });

    it("should add a cylinder to the scene", () => {
      testObject.type = 2;
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.type).toEqual("CylinderGeometry");
    });

    it("should add a cone to the scene", () => {
      testObject.type = 3;
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.type).toEqual("ConeGeometry");
      // @ts-ignore
      expect(scene.children[0].geometry.faces.length).not.toEqual(6);
    });

    it("should add a triangular pyramid to the scene", () => {
      testObject.type = 4;
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.type).toEqual("ConeGeometry");
      // @ts-ignore
      expect(scene.children[0].geometry.faces.length).toEqual(6);
    });

    it("should add a triangular pyramid to the scene even if the type genrated is 5 (1 on Math.random())", () => {
      testObject.type = 5;
      objects.push(testObject);
      game3dGeneratorService.generateObjects(objects, scene);
      // @ts-ignore
      expect(scene.children[0].geometry.type).toEqual("ConeGeometry");
      // @ts-ignore
      expect(scene.children[0].geometry.faces.length).toEqual(6);
    });
  });
});
