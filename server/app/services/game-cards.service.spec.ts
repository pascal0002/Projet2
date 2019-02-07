// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IFormInfo } from "../../../common/communication/FormInfo";
import { GameCard } from "../../../common/communication/game-card";
import { whiteBitmap } from "../../mock/bitmapImage-mock";
import { DatabaseService } from "./database.service";
import { DifferenceCounterService } from "./difference-counter.service";
import { GameCardsService } from "./game-cards.service";

let gameCardsService: GameCardsService;

let differenceCounterService: DifferenceCounterService;
let differenceCounterServiceStub: any;

let gameCardsServiceStub: any;
const databaseService: DatabaseService = new DatabaseService();

describe("game-cards-service", () => {

    const init: Mocha.Func = () => {
        differenceCounterService = new DifferenceCounterService();
        differenceCounterServiceStub = sinon.stubObject<DifferenceCounterService>(differenceCounterService, ["getNumberOfDifferences"]);

        gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
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
            const originalImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "originalImage.bmp", pixels: []};
            const modifiedImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "modifiedImage.bmp", pixels: []};
            const formInfo: IFormInfo = {
                gameName: "game",
                originalImage: originalImg,
                modifiedImage: modifiedImg,
            };

            const expectedGameCard: GameCard = {
                title: "game",
                originalImagePath: "http://localhost:3000/originalImages/originalImage.bmp",
                modifiedImagePath: "http://localhost:3000/modifiedImages/modifiedImage.bmp",
                bestTimeSolo: ["3:30 user0", "3:30 user0", "3:30 user0"],
                bestTime1v1: ["2:30 user0", "2:30 user0", "2:30 user0"],
            };
            expect(gameCardsServiceStub.generateGameCard(formInfo)).deep.equal(expectedGameCard);
            done();
        });

        it("should return maximal value when Math.random return 1", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(1);
            const originalImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "originalImage.bmp", pixels: []};
            const modifiedImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "modifiedImage.bmp", pixels: []};
            const formInfo: IFormInfo = {
                gameName: "game",
                originalImage: originalImg,
                modifiedImage: modifiedImg,
            };

            const expectedGameCard: GameCard = {
                title: "game",
                originalImagePath: "http://localhost:3000/originalImages/originalImage.bmp",
                modifiedImagePath: "http://localhost:3000/modifiedImages/modifiedImage.bmp",
                bestTimeSolo: ["6:00 user999", "6:00 user999", "6:00 user999"],
                bestTime1v1: ["5:00 user999", "5:00 user999", "5:00 user999"],
            };
            expect(gameCardsServiceStub.generateGameCard(formInfo)).deep.equal(expectedGameCard);
            done();
        });

        it("should return expected value when Math.random return 0.11", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0.11);

            const originalImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "originalImage.bmp", pixels: []};
            const modifiedImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "modifiedImage.bmp", pixels: []};
            const formInfo: IFormInfo = {
                gameName: "game",
                originalImage: originalImg,
                modifiedImage: modifiedImg,
            };

            const expectedGameCard: GameCard = {
                title: "game",
                originalImagePath: "http://localhost:3000/originalImages/originalImage.bmp",
                modifiedImagePath: "http://localhost:3000/modifiedImages/modifiedImage.bmp",
                bestTimeSolo: ["3:46 user109", "4:00 user109", "4:13 user109"],
                bestTime1v1: ["2:46 user109", "3:00 user109", "3:13 user109"],
            };
            expect(gameCardsServiceStub.generateGameCard(formInfo)).deep.equal(expectedGameCard);
            done();
        });
    });

    describe("getRandomRange", () => {

        beforeEach(init);

        it("should return minimal value when Math.random return 0", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0);

            expect(gameCardsServiceStub.getRandomRange(100, 200)).to.equal(100);
            done();
        });

        it("should return maximal value when Math.random return 1", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(1);

            expect(gameCardsServiceStub.getRandomRange(100, 200)).to.equal(200);
            done();
        });

        it("should return expected value when Math.random return between 0 and 1 (0.5 in this test)", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0.5);

            expect(gameCardsServiceStub.getRandomRange(100, 200)).to.equal(150);
            done();
        });
    });

    describe("convertTimeToMSSFormat", () => {

        beforeEach(init);

        it("should convert the amount of seconds given to the right time display in MSS format", (done: Function) => {

            expect(gameCardsServiceStub.convertTimeToMSSFormat(263)).to.equal("4:23");
            done();
        });
    });

    describe("generateBestTime", () => {

        beforeEach(init);

        it("should return minimal time value and user number when Math.random always return 0", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0);

            expect(gameCardsServiceStub.generateBestTime(100, 200)).deep.equal(["1:40 user0", "1:40 user0", "1:40 user0"]);
            done();
        });

        it("should return maximal time value and user number when Math.random always return 1", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(1);

            expect(gameCardsServiceStub.generateBestTime(100, 200)).deep.equal(["3:20 user999", "3:20 user999", "3:20 user999"]);
            done();
        });

        it("should return expected time value and user number when Math.random return between 0 and 1 (always 0.5 in this test)",
           (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0.5);

            expect(gameCardsServiceStub.generateBestTime(100, 200)).deep.equal(["2:30 user499", "2:55 user499", "3:07 user499"]);
            done();
        });
    });

    describe("generateOriginalImagePath", () => {

        beforeEach(init);

        it("should return the right path to the original image", (done: Function) => {

            expect(gameCardsServiceStub.generateOriginalImagePath("originalImage.bmp"))
            .to.equal("http://localhost:3000/originalImages/originalImage.bmp");
            done();
        });
    });

    describe("generateModifiedImagePath", () => {

        beforeEach(init);

        it("should return the right path to the modified image", (done: Function) => {

            expect(gameCardsServiceStub.generateModifiedImagePath("modifiedImage.bmp"))
            .to.equal("http://localhost:3000/modifiedImages/modifiedImage.bmp");
            done();
        });
    });
});
