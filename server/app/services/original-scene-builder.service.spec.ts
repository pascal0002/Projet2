// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import {IThreeObject} from "../../../common/communication/ThreeObject";
import { OriginalSceneBuilderService } from "./original-scene-builder.service";

describe("original-scene-builder-service", () => {

    let originalSceneBuilderService: OriginalSceneBuilderService;
    let originalSceneBuilderServiceStub: any;
    let objects: IThreeObject[];

    const init: Mocha.Func = () => {
        originalSceneBuilderService = new OriginalSceneBuilderService();
        originalSceneBuilderServiceStub = sinon.stubObject<OriginalSceneBuilderService>(originalSceneBuilderService, ["getRandomNumber"]);
        objects = [];
    };

    describe("createObjects", () => {
        beforeEach(init);

        it("should return an object of type IThreeObject with all the minimal values", (done: Mocha.Done) => {
            originalSceneBuilderServiceStub.getRandomNumber.returns(0);
            for (let i: number = 0; i < 10; i++) {
                objects.push({color: "rgb(0,0,0)", diameter: 5, height: 5,
                              position: [-100, -50, -25], orientation: [0, 0, 0], type: 0});
            }
            expect(objects).deep.equal(originalSceneBuilderServiceStub.createObjects());
            done();
        });

        it("should return an object of type IThreeObject with all the maximal values", (done: Mocha.Done) => {
            originalSceneBuilderServiceStub.getRandomNumber.returns(1);
            for (let i: number = 0; i < 200; i++) {
                objects.push({color: "rgb(255,255,255)", diameter: 15, height: 15,
                              position: [100, 50, 25], orientation: [360, 360, 360], type: 5});
            }
            expect(objects).deep.equal(originalSceneBuilderServiceStub.createObjects());
            done();
        });

        it("should return an object of type IThreeObject with all the right values", (done: Mocha.Done) => {
            originalSceneBuilderServiceStub.getRandomNumber.returns(0.6);
            for (let i: number = 0; i < 124; i++) {
                objects.push({color: "rgb(153,153,153)", diameter: 11, height: 11,
                              position: [20, 10, 5], orientation: [216, 216, 216], type: 3});
            }
            expect(objects).deep.equal(originalSceneBuilderServiceStub.createObjects());
            done();
        });
    });
});
