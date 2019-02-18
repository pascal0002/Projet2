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
    let positionsChanged: number[];

    const init: Mocha.Func = () => {
        scenesParameterGeneratorService = new ScenesParameterGeneratorService();
        scenesParameterGeneratorServiceStub = sinon.stubObject<ScenesParameterGeneratorService>(
                                              scenesParameterGeneratorService, ["getRandomNumber", "checkCollisions"]);

        modifiedSceneBuilderService = new ModifiedSceneBuilderService(scenesParameterGeneratorServiceStub);
        modifiedSceneBuilderServiceStub = sinon.stubObject<ModifiedSceneBuilderService>(
                                          modifiedSceneBuilderService, ["getRandomNumber", "checkObjectsChanged"]);

        objects = [];
        positionsChanged = [];
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

            expect(modifiedSceneBuilderServiceStub.createModifications(objects, [true, true, true])).deep.equal(comparativeObjects);
            done();
        });

        it("should delete 7 objects from the array", (done: Mocha.Done) => {
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(0);
            for (let i: number = 0; i < 7; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderServiceStub.createModifications(objects, [true, true, true])).deep.equal([]);
            done();
        });

        it("should change the color of the fifth object to the max value", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(1);
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(0.4);
            modifiedSceneBuilderServiceStub.colorChangeNb = -6;

            for (let i: number = 0; i < 10; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [0, 0, 0], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderServiceStub.createModifications(objects, [true, true, true])[4].color).to.equal("rgb(255,255,255)");
            done();
        });

        it("should add objects and change objects color only when specified", (done: Mocha.Done) => {
            for (let i: number = 0; i < 7; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderService.createModifications(objects, [true, false, false])).deep.equal([]);
            done();
        });

        it("should add objects and delete objects only when specified", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(1);

            for (let i: number = 0; i < 7; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [0, 0, 0], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderService.createModifications(objects, [false, true, false])[4].color)
            .to.equal("rgb(255,255,255)");
            done();
        });

        it("should delete objects and change objects color only when specified", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            scenesParameterGeneratorServiceStub.checkCollisions.returns(false);

            const comparativeObjects: IThreeObject[] = [];
            for (let i: number = 0; i < 7; i++) {
                comparativeObjects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderService.createModifications(objects, [false, false, true])).deep.equal(comparativeObjects);
            done();
        });

        it("should redo an iteration when the random function makes the disabled modification", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            modifiedSceneBuilderServiceStub.getRandomNumber.onFirstCall().returns(0.5);
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(0);

            for (let i: number = 0; i < 7; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [-100, -50, -25], orientation: [0, 0, 0], type: 0,
                });
            }

            expect(modifiedSceneBuilderServiceStub.createModifications(objects, [true, false, true])).deep.equal([]);
            done();
        });
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

    describe("changeColor", () => {
        beforeEach(init);

        it("should change color of 1 object from the array even if selected position is higher than array lenght", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(1);
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(1);

            for (let i: number = 0; i < 10; i++) {
                objects.push({
                    color: "rgb(0,0,0)", diameter: 5, height: 5,
                    position: [0, 0, 0], orientation: [0, 0, 0], type: 0,
                });
            }

            modifiedSceneBuilderServiceStub.changeColor(objects, positionsChanged);

            expect(objects[9].color).to.equal("rgb(255,255,255)");
            done();
        });
    });

    describe("checkPositionsChanged", () => {
        beforeEach(init);

        it("should not return a position equal to the array lenght", (done: Mocha.Done) => {
            modifiedSceneBuilderServiceStub.getRandomNumber.returns(1);

            const positionToChange: number = 5;
            const arrayLength: number = 10;
            positionsChanged.push(positionToChange);

            expect(modifiedSceneBuilderServiceStub.checkPositionsChanged(positionsChanged, positionToChange, arrayLength))
            .not.to.equal(arrayLength);
            done();
        });

        it("should choose another position to change if the position to change has already been changed", (done: Mocha.Done) => {

            const positionToChange: number = 5;
            positionsChanged.push(positionToChange);

            expect(modifiedSceneBuilderServiceStub.checkPositionsChanged(positionsChanged, positionToChange, 10))
            .not.to.equal(positionToChange);
            done();
        });
    });
});
