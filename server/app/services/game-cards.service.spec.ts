import { expect } from "chai";
import { stubObject } from "ts-sinon";
import { GameCard } from "../../../common/communication/game-card";
import { whiteBitmap } from "../../images/bitmap_mock";
import { DifferenceCounterService } from "./difference-counter.service";
import { GameCardsService } from "./game-cards.service";

// tslint:disable-next-line:no-any
let mathStub: any;
// tslint:disable-next-line:no-any
let differenceCounterServiceStub: any;
let gameCardsService: GameCardsService;
let differenceCounterService: DifferenceCounterService;

describe("game-cards-service", () => {
    beforeEach(() => {
        differenceCounterService = new DifferenceCounterService();
        differenceCounterServiceStub = stubObject<DifferenceCounterService>(differenceCounterService, ["getNumberOfDifferences"]);
        gameCardsService = new GameCardsService(differenceCounterServiceStub);
        mathStub = stubObject<Math>(Math, ["random"]);
    });

    it("validateDifferencesImage, should return true if validateDifferencesImage return 7", (done: Function) => {
        differenceCounterServiceStub.getNumberOfDifferences.returns(7);
        expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(true);
        done();
    });

    it("validateDifferencesImage, should return false if validateDifferencesImage return 0", (done: Function) => {
        differenceCounterServiceStub.getNumberOfDifferences.returns(0);
        expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(false);
        done();
    });

    it("validateDifferencesImage, should return false if validateDifferencesImage return 6", (done: Function) => {
        differenceCounterServiceStub.getNumberOfDifferences.returns(6);
        expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(false);
        done();
    });

    it("validateDifferencesImage, should return false if validateDifferencesImage return 8", (done: Function) => {
        differenceCounterServiceStub.getNumberOfDifferences.returns(8);
        expect(gameCardsService.validateDifferencesImage(whiteBitmap)).equal(false);
        done();
    });

    it("generateGameCard, should return minimal value when Math.random return 0", (done: Function) => {
        mathStub.random.returns(0);
        const expectedGameCard: GameCard = { title: "",
                                             imageName: "",
                                             modifiedImageName: "",
                                             bestTimeSolo: ["3:30 user0", "3:30 user0", "3:30 user0"],
                                             bestTime1v1: ["2:30 user0", "2:30 user0", "2:30 user0"],
                                           };
        expect(gameCardsService.generateGameCard()).equal(expectedGameCard);
        done();
    });

    it("generateGameCard, should return maximal value when Math.random return 1", (done: Function) => {
        mathStub.random.returns(1);
        const expectedGameCard: GameCard = { title: "",
                                             imageName: "",
                                             modifiedImageName: "",
                                             bestTimeSolo: ["6:00 user999", "6:00 user999", "6:00 user999"],
                                             bestTime1v1: ["5:00 user999", "5:00 user999", "5:00 user999"],
                                           };
        expect(gameCardsService.generateGameCard()).equal(expectedGameCard);
        done();
    });

    it("generateGameCard, should return expected value when Math.random return 0.11", (done: Function) => {
        mathStub.random.returns(0.11);
        const expectedGameCard: GameCard = { title: "",
                                             imageName: "",
                                             modifiedImageName: "",
                                             bestTimeSolo: ["3:46 user109", "3:46 user109", "3:46 user109"],
                                             bestTime1v1: ["2:46 user109", "2:46 user109", "2:46 user109"],
                                           };
        expect(gameCardsService.generateGameCard()).equal(expectedGameCard);
        done();
    });

});
