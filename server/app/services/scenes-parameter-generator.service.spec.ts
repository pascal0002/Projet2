// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import {IThreeObject} from "../../../common/communication/ThreeObject";
import { ScenesParameterGeneratorService } from "./scenes-parameter-generator.service";

describe("scenes-parameter-generator-service", () => {

    let scenesParameterGeneratorService: ScenesParameterGeneratorService;
    let scenesParameterGeneratorServiceStub: any;

    let object: IThreeObject;
    let objects: IThreeObject[];

    const init: Mocha.Func = () => {
        scenesParameterGeneratorService = new ScenesParameterGeneratorService();
        scenesParameterGeneratorServiceStub = sinon.stubObject<ScenesParameterGeneratorService>(
                                              scenesParameterGeneratorService, ["getRandomNumber"]);

        objects = [];
    };

    describe("addObject", () => {
        beforeEach(init);

        it("should add an object of type IThreeObject with all the minimal values to the array", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [-100, -50, -25], orientation: [0, 0, 0], type: 0};

            const comparativeObjects: IThreeObject[] = [];
            comparativeObjects.push(object);

            scenesParameterGeneratorServiceStub.addObject(objects);

            expect(comparativeObjects).deep.equal(objects);
            done();
        });

        it("should return an object of type IThreeObject with all the maximal values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(1);
            object = {color: "rgb(255,255,255)", diameter: 15, height: 15,
                      position: [100, 50, 25], orientation: [360, 360, 360], type: 5};

            const comparativeObjects: IThreeObject[] = [];
            comparativeObjects.push(object);

            scenesParameterGeneratorServiceStub.addObject(objects);

            expect(comparativeObjects).deep.equal(objects);
            done();
        });

        it("should return an object of type IThreeObject with all the right values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0.6);
            object = {color: "rgb(153,153,153)", diameter: 11, height: 11,
                      position: [20, 10, 5], orientation: [216, 216, 216], type: 3};

            const comparativeObjects: IThreeObject[] = [];
            comparativeObjects.push(object);

            scenesParameterGeneratorServiceStub.addObject(objects);

            expect(comparativeObjects).deep.equal(objects);
            done();
        });

        it("should return an object of type IThreeObject with all the right values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0.6);
            object = {color: "rgb(153,153,153)", diameter: 11, height: 11,
                      position: [20, 10, 5], orientation: [216, 216, 216], type: 3};

            const comparativeObjects: IThreeObject[] = [];
            comparativeObjects.push(object);

            scenesParameterGeneratorServiceStub.addObject(objects);

            expect(comparativeObjects).deep.equal(objects);
            done();
        });
    });

    describe("checkCollisions", () => {
        beforeEach(init);

        it("should return false when no objects are in collision (even when side by side)", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [0, 0, 0], orientation: [0, 0, 0], type: 0};
            objects.push(object);

            const comparativeObject: IThreeObject = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                                                     position: [5, 0, 0], orientation: [0, 0, 0], type: 0};

            expect(scenesParameterGeneratorServiceStub.checkCollisions(comparativeObject, objects)).to.equal(false);
            done();
        });

        it("should return true when at least two objects are in collision", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [0, 0, 0], orientation: [0, 0, 0], type: 0};
            objects.push(object);

            const comparativeObject: IThreeObject = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                                                     position: [4, 0, 0], orientation: [0, 0, 0], type: 0};

            expect(scenesParameterGeneratorServiceStub.checkCollisions(comparativeObject, objects)).to.equal(true);
            done();
        });

        it("should return true due to the bigger englobing sphere around a cube to check collisions", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [0, 0, 0], orientation: [0, 0, 0], type: 0};
            objects.push(object);

            const comparativeObject: IThreeObject = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                                                     position: [6.8, 0, 0], orientation: [0, 0, 0], type: 1};

            expect(scenesParameterGeneratorServiceStub.checkCollisions(comparativeObject, objects)).to.equal(true);
            done();
        });

        it("should return true due to the bigger englobing sphere around a cylinder to check collisions", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [0, 0, 0], orientation: [0, 0, 0], type: 0};
            objects.push(object);

            const comparativeObject: IThreeObject = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                                                     position: [6, 0, 0], orientation: [0, 0, 0], type: 2};

            expect(scenesParameterGeneratorServiceStub.checkCollisions(comparativeObject, objects)).to.equal(true);
            done();
        });

        it("should return true due to the bigger englobing sphere around a cone to check collisions", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [0, 0, 0], orientation: [0, 0, 0], type: 0};
            objects.push(object);

            const comparativeObject: IThreeObject = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                                                     position: [6, 0, 0], orientation: [0, 0, 0], type: 3};

            expect(scenesParameterGeneratorServiceStub.checkCollisions(comparativeObject, objects)).to.equal(true);
            done();
        });

        it("should return true due to the bigger englobing sphere around a triangular pyramid to check collisions", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [0, 0, 0], orientation: [0, 0, 0], type: 0};
            objects.push(object);

            const comparativeObject: IThreeObject = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                                                     position: [6, 0, 0], orientation: [0, 0, 0], type: 4};

            expect(scenesParameterGeneratorServiceStub.checkCollisions(comparativeObject, objects)).to.equal(true);
            done();
        });
    });
});
