// tslint:disable:no-any
// tslint:disable:no-magic-numbers
import { expect } from "chai";
import * as sinon from "ts-sinon";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { IFormInfo2D } from "../../../common/communication/FormInfo2D";
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
        differenceCounterServiceStub = sinon.stubObject(differenceCounterService, ["getNumberOfDifferences"]);

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

    describe("generateGameCard2D", () => {

        beforeEach(init);

        it("should return minimal value when Math.random return 0", (done: Function) => {

            gameCardsServiceStub.getRandomNumber.returns(0);
            const originalImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "originalImage.bmp", pixels: []};
            const modifiedImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "modifiedImage.bmp", pixels: []};
            const formInfo: IFormInfo2D = {
                gameName: "game",
                originalImage: originalImg,
                modifiedImage: modifiedImg,
            };

            const expectedGameCard: GameCard = {
                title: "game",
                originalImagePath: "http://localhost:3000/originalImages/originalImage.bmp",
                modifiedImagePath: "http://localhost:3000/modifiedImages/modifiedImage.bmp",
                bestTimeSolo: [{user : "user0", time : 210}, {user : "user0", time : 210}, {user : "user0", time : 210}],
                bestTime1v1: [{user : "user0", time : 150}, {user : "user0", time : 150}, {user : "user0", time : 150}],
            };
            expect(gameCardsServiceStub.generateGameCard2D(formInfo)).deep.equal(expectedGameCard);
            done();
        });

        it("should return maximal value when Math.random return 1", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(1);
            const originalImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "originalImage.bmp", pixels: []};
            const modifiedImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "modifiedImage.bmp", pixels: []};
            const formInfo: IFormInfo2D = {
                gameName: "game",
                originalImage: originalImg,
                modifiedImage: modifiedImg,
            };

            const expectedGameCard: GameCard = {
                title: "game",
                originalImagePath: "http://localhost:3000/originalImages/originalImage.bmp",
                modifiedImagePath: "http://localhost:3000/modifiedImages/modifiedImage.bmp",
                bestTimeSolo: [{user : "user999", time : 360}, {user : "user999", time : 360}, {user : "user999", time : 360}],
                bestTime1v1: [{user : "user999", time : 300}, {user : "user999", time : 300}, {user : "user999", time : 300}],
            };
            expect(gameCardsServiceStub.generateGameCard2D(formInfo)).deep.equal(expectedGameCard);
            done();
        });

        it("should return expected value when Math.random return 0.11", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0.11);

            const originalImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "originalImage.bmp", pixels: []};
            const modifiedImg: IBitmapImage = {height: 480, width: 640, bitDepth: 24, fileName: "modifiedImage.bmp", pixels: []};
            const formInfo: IFormInfo2D = {
                gameName: "game",
                originalImage: originalImg,
                modifiedImage: modifiedImg,
            };

            const expectedGameCard: GameCard = {
                title: "game",
                originalImagePath: "http://localhost:3000/originalImages/originalImage.bmp",
                modifiedImagePath: "http://localhost:3000/modifiedImages/modifiedImage.bmp",
                bestTimeSolo: [{user : "user109", time : 226}, {user : "user109", time : 240}, {user : "user109", time : 253}],
                bestTime1v1: [{user : "user109", time : 166}, {user : "user109", time : 180}, {user : "user109", time : 193}],
            };
            expect(gameCardsServiceStub.generateGameCard2D(formInfo)).deep.equal(expectedGameCard);
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

    describe("generateBestTime", () => {

        beforeEach(init);

        it("should return minimal time value and user number when Math.random always return 0", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0);

            expect(gameCardsServiceStub.generateBestTime(100, 200))
            .deep.equal([{user : "user0", time : 100}, {user : "user0", time : 100}, {user : "user0", time : 100}]);
            done();
        });

        it("should return maximal time value and user number when Math.random always return 1", (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(1);

            expect(gameCardsServiceStub.generateBestTime(100, 200))
            .deep.equal([{user : "user999", time : 200}, {user : "user999", time : 200}, {user : "user999", time : 200}]);
            done();
        });

        it("should return expected time value and user number when Math.random return between 0 and 1 (always 0.5 in this test)",
           (done: Function) => {
            gameCardsServiceStub.getRandomNumber.returns(0.5);

            expect(gameCardsServiceStub.generateBestTime(100, 200))
            .deep.equal([{user : "user499", time : 150}, {user : "user499", time : 175}, {user : "user499", time : 187}]);
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
