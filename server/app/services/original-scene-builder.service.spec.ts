// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import { OriginalSceneBuilderService } from "./original-scene-builder.service";
import { ScenesParameterGeneratorService } from "./scenes-parameter-generator.service";

describe("original-scene-builder-service", () => {

    let originalSceneBuilderService: OriginalSceneBuilderService;

    let scenesParameterGeneratorService: ScenesParameterGeneratorService;
    let scenesParameterGeneratorServiceStub: any;

    let objects: IThreeObject[];

    const init: Mocha.Func = () => {
        scenesParameterGeneratorService = new ScenesParameterGeneratorService();
        scenesParameterGeneratorServiceStub = sinon.stubObject<ScenesParameterGeneratorService>(
                                              scenesParameterGeneratorService, ["getRandomNumber", "checkCollisions"]);

        originalSceneBuilderService = new OriginalSceneBuilderService(scenesParameterGeneratorServiceStub);

        objects = [];
    };

    describe("createObjects", () => {
        beforeEach(init);

        it("should return the minimal amount of objects of type IThreeObject with all the minimal values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            for (let i: number = 0; i < 10; i++) {
            objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }
            expect(objects).deep.equal(originalSceneBuilderService.createObjects(10));
            done();
        });

        it("should return the maximal amount of objects of type IThreeObject with all the maximal values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(1);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            for (let i: number = 0; i < 10; i++) {
                objects.push({
                    color: "rgb(255,255,255)", diameter: 15, height: 15,
                    position: [100, 50, 25], orientation: [360, 360, 360], type: 5,
                });
            }
            expect(objects).deep.equal(originalSceneBuilderService.createObjects(10));
            done();
        });

        it("should return the right amount of objects of type IThreeObject with all the right values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0.6);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            for (let i: number = 0; i < 10; i++) {
                objects.push({
                    color: "rgb(153,153,153)", diameter: 11, height: 11,
                    position: [20, 10, 5], orientation: [216, 216, 216], type: 3,
                });
            }
            expect(objects).deep.equal(originalSceneBuilderService.createObjects(10));
            done();
        });

        it("should create a number of objects equal to the number specified", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0.6);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            const objectsNb: number = 134;
            for (let i: number = 0; i < 124; i++) {
                objects.push({
                    color: "rgb(153,153,153)", diameter: 11, height: 11,
                    position: [20, 10, 5], orientation: [216, 216, 216], type: 3,
                });
            }
            expect(originalSceneBuilderService.createObjects(objectsNb).length).to.equal(objectsNb);
            done();
        });
    });
});
