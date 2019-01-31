// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import { GameCard } from "../../../common/communication/game-card";
import { whiteBitmap } from "../../images/bitmap_mock";
import { DifferenceCounterService } from "./difference-counter.service";
import { GameCardsService } from "./game-cards.service";

let gameCardsService: GameCardsService;

let differenceCounterService: DifferenceCounterService;
let differenceCounterServiceStub: any;

let gameCardsServiceStub: any;

describe("game-cards-service", () => {

    const init: Mocha.Func = () => {
        differenceCounterService = new DifferenceCounterService();
        differenceCounterServiceStub = sinon.stubObject<DifferenceCounterService>(differenceCounterService, ["getNumberOfDifferences"]);

        gameCardsService = new GameCardsService(differenceCounterServiceStub);
        gameCardsServiceStub = sinon.stubObject<GameCardsService>(gameCardsService, ["getRandomNumber"]);
    };

    describe("validateDifferencesImage", () => {

        beforeEach(init);

        it("should return true if validateDifferencesImage return 7", (done: Function) => {
            differenceCounterServiceStub.getNumberOfDifferences.returns(7);
            expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(true);
            done();
        });

        it("should return false if validateDifferencesImage return 0", (done: Function) => {
            differenceCounterServiceStub.getNumberOfDifferences.returns(0);
            expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(false);
            done();
        });

        it("should return false if validateDifferencesImage return 6", (done: Function) => {
            differenceCounterServiceStub.getNumberOfDifferences.returns(6);
            expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(false);
            done();
        });

        it("should return false if validateDifferencesImage return 8", (done: Function) => {
            differenceCounterServiceStub.getNumberOfDifferences.returns(8);
            expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(false);
            done();
        });
    });

    describe("generateGameCard", () => {

        beforeEach(init);

        it("should return minimal value when Math.random return 0", (done: Function) => {

            gameCardsServiceStub.getRandomNumber.returns(0);

            const expectedGameCard: GameCard = {
                title: "",
                imageName: "",
                modifiedImageName: "",
                bestTimeSolo: ["3:30 user0", "3:30 user0", "3:30 user0"],
                bestTime1v1: ["2:30 user0", "2:30 user0", "2:30 user0"],
            };
            expect(gameCardsServiceStub.generateGameCard()).equal(expectedGameCard);
            done();
        });

        it("should return maximal value when Math.random return 1", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(1);
            const expectedGameCard: GameCard = {
                title: "",
                imageName: "",
                modifiedImageName: "",
                bestTimeSolo: ["6:00 user999", "6:00 user999", "6:00 user999"],
                bestTime1v1: ["5:00 user999", "5:00 user999", "5:00 user999"],
            };
            expect(gameCardsServiceStub.generateGameCard()).equal(expectedGameCard);
            done();
        });

        it("should return expected value when Math.random return 0.11", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0.11);
            const expectedGameCard: GameCard = {
                title: "",
                imageName: "",
                modifiedImageName: "",
                bestTimeSolo: ["3:46 user109", "3:46 user109", "3:46 user109"],
                bestTime1v1: ["2:46 user109", "2:46 user109", "2:46 user109"],
            };
            expect(gameCardsServiceStub.generateGameCard()).equal(expectedGameCard);
            done();
        });
    });

});
