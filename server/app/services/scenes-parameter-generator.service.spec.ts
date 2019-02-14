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

    const init: Mocha.Func = () => {
        scenesParameterGeneratorService = new ScenesParameterGeneratorService();
        scenesParameterGeneratorServiceStub = sinon.stubObject<ScenesParameterGeneratorService>(
                                              scenesParameterGeneratorService, ["getRandomNumber"]);
    };

    describe("createObject", () => {
        beforeEach(init);

        it("should return an object of type IThreeObject with all the minimal values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0);
            object = {color: "rgb(0,0,0)", diameter: 5, height: 5,
                      position: [-100, -50, -25], orientation: [0, 0, 0], type: 0};

            expect(object).deep.equal(scenesParameterGeneratorServiceStub.createObject());
            done();
        });

        it("should return an object of type IThreeObject with all the maximal values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(1);
            object = {color: "rgb(255,255,255)", diameter: 15, height: 15,
                      position: [100, 50, 25], orientation: [360, 360, 360], type: 5};

            expect(object).deep.equal(scenesParameterGeneratorServiceStub.createObject());
            done();
        });

        it("should return an object of type IThreeObject with all the right values", (done: Mocha.Done) => {
            scenesParameterGeneratorServiceStub.getRandomNumber.returns(0.6);
            object = {color: "rgb(153,153,153)", diameter: 11, height: 11,
                      position: [20, 10, 5], orientation: [216, 216, 216], type: 3};

            expect(object).deep.equal(scenesParameterGeneratorServiceStub.createObject());
            done();
        });
    });
});
