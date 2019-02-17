// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import { IThreeObject } from "../../../common/communication/ThreeObject";
import { ModifiedSceneBuilderService } from "./modified-scene-builder.service";
import { ScenesParameterGeneratorService } from "./scenes-parameter-generator.service";

describe("modified-scene-builder-service", () => {

    let modifiedSceneBuilderService: ModifiedSceneBuilderService;
    let modifiedSceneBuilderServiceStub: any;

    let scenesParameterGeneratorService: ScenesParameterGeneratorService;
    let scenesParameterGeneratorServiceStub: any;

    let objects: IThreeObject[];

    const init: Mocha.Func = () => {
        scenesParameterGeneratorService = new ScenesParameterGeneratorService();
        scenesParameterGeneratorServiceStub = sinon.stubObject<ScenesParameterGeneratorService>(
                                              scenesParameterGeneratorService, ["getRandomNumber", "checkCollisions"]);

        modifiedSceneBuilderService = new ModifiedSceneBuilderService(scenesParameterGeneratorServiceStub);
        modifiedSceneBuilderServiceStub = sinon.stubObject<ModifiedSceneBuilderService>(
                                          modifiedSceneBuilderService, ["getRandomNumber", "checkObjectsChanged"]);

        objects = [];
    };

    describe("createModifications", () => {
        beforeEach(init);

        it("should add 7 objects to the array with all the minimal values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(1);

            const comparativeObjects: IThreeObject[] = [];
            for (let i: number = 0; i < 7; i++) {
                comparativeObjects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderServiceStub.createModifications(objects)).deep.equal(comparativeObjects);
            done();
        });

        it("should delete 7 objects from the array", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(0);
            for (let i: number = 0; i < 7; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderServiceStub.createModifications(objects)).deep.equal([]);
            done();
        });

        /*it("should change the color of 7 different objects of the array", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0.4);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(0.4);
            for (let i: number = 0; i < 7; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [0, 0, 0], orientation: [0, 0, 0], type: 0,
                });
            }

            const comparativeObjects: IThreeObject[] = [];
            for (let i: number = 0; i < 7; i++) {
                comparativeObjects.push({
                    color: "rgb(102,102,102)", diameter: 5, height: 5,
                    position: [0, 0, 0], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderServiceStub.createModifications(objects)).deep.equal(comparativeObjects);
            done();
        });*/
    });

    describe("deleteObject", () => {
        beforeEach(init);

        it("should delete 1 object from the array even if the selected position is higher than the array lenght", (done: Mocha.Done) => {
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(1);

            objects.push({
                color: "rgb(0,0,0)", diameter: 10, height: 10,
                position: [0, 0, 0], orientation: [10, 10, 10], type: 1,
            });
            objects.push({
                color: "rgb(0,0,0)", diameter: 5, height: 5,
                position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
            });

            modifiedSceneBuilderServiceStub.deleteObject(objects);
            expect(objects).deep.equal([{
                color: "rgb(0,0,0)", diameter: 10, height: 10,
                position: [0, 0, 0], orientation: [10, 10, 10], type: 1,
            }]);
            done();
        });
    });
});
