// tslint:disable:no-any
// tslint:disable:no-magic-numbers
// tslint:disable:max-file-line-count
import Axios from "axios";
import { expect } from "chai";
import * as mongoose from "mongoose";
import * as sinon from "sinon";
import * as sinonts from "ts-sinon";
import { IBitmapImage } from "../../../common/communication/BitmapImage";
import { Dimension } from "../../../common/communication/Constants";
import { IFormInfo2D } from "../../../common/communication/FormInfo2D";
import { GameCard } from "../../../common/communication/game-card";
import { blackBitmap, whiteBitmap } from "../../mock/bitmapImage-mock";
import { DifferenceCounterService } from "./difference-counter.service";
import { gameCard2D } from "./game-card-2D-schema";
import { gameCard3D } from "./game-card-3D-schema";
import { GameCardsService } from "./game-cards.service";

let gameCardsService: GameCardsService;
let gameCardsServiceStub: any;

let differenceCounterService: DifferenceCounterService;
let differenceCounterServiceStub: any;

let axioStub: sinon.SinonStub;

let databaseServiceStub: sinon.SinonStub;

class MockDatabaseService {

    public constructor() {
        this.connect();
    }

    private connect(): void {
        return;
    }

    public async getAll(model: mongoose.Model<mongoose.Document>): Promise<number> {
        return Promise.resolve(0);
    }

    public add(item: mongoose.Document): void {
        return;
    }

    public remove(model: mongoose.Model<mongoose.Document>, condition: Object): void {
        return;
    }

    public async countDocuments(model: mongoose.Model<mongoose.Document>, condition: Object): Promise<number> {
        return Promise.resolve(0);
    }
}

const databaseService: any = new MockDatabaseService();

describe("game-cards-service", () => {

    describe("test", () => {

        it("should work", (done: Function) => {
            expect(true);
            done();
        });

    });

    describe("generateDifferences", () => {

        beforeEach((done: Mocha.Done) => {
            gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
            axioStub = sinon.stub(Axios, "post");
            done();
        });

        afterEach((done: Mocha.Done) => {
            axioStub.restore();
            done();
        });

        it("should return the difference image", (done: Function) => {
            axioStub.resolves({data : whiteBitmap});
            gameCardsService.generateDifferences(whiteBitmap, blackBitmap)
            .then((image: IBitmapImage) => {
                 expect(image).to.deep.equal(whiteBitmap);
            })
            .catch((err: Error) => console.error(err));
            done();
        });

    });

    describe("validateDifferencesImage", () => {

        beforeEach((done: Mocha.Done) => {
            differenceCounterService = new DifferenceCounterService();
            differenceCounterServiceStub = sinonts.stubObject(differenceCounterService, ["getNumberOfDifferences"]);
            gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
            done();
        });

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

    describe("getGameCard2D", () => {

        beforeEach((done: Mocha.Done) => {
            databaseServiceStub = sinon.stub(databaseService, "getAll");
            differenceCounterService = new DifferenceCounterService();
            gameCardsService = new GameCardsService(differenceCounterService, databaseService);
            done();
        });

        afterEach((done: Mocha.Done) => {
            databaseServiceStub.restore();
            done();
        });

        it("should return the array of document", (done: Function) => {
            const gamecard1: mongoose.Document = new gameCard2D();
            const gamecard2: mongoose.Document = new gameCard2D();
            const gamecardsExpected: mongoose.Document[] = [gamecard1, gamecard2];

            databaseServiceStub.resolves(gamecardsExpected);
            gameCardsService.getGameCards2D()
            .then((gameCards: mongoose.Document[]) => {
                 expect(gameCards).to.deep.equal(gamecardsExpected);
            })
            .catch((err: Error) => console.error(err));
            done();
        });

    });

    describe("getGameCard3D", () => {

        beforeEach((done: Mocha.Done) => {
            gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
            databaseServiceStub = sinon.stub(databaseService, "getAll");
            done();
        });

        afterEach((done: Mocha.Done) => {
            databaseServiceStub.restore();
            done();
        });

        it("should return the array of document", (done: Function) => {
            const gamecard1: mongoose.Document = new gameCard3D();
            const gamecard2: mongoose.Document = new gameCard3D();
            const gamecardsExpected: mongoose.Document[] = [gamecard1, gamecard2];

            databaseServiceStub.resolves(gamecardsExpected);
            gameCardsService.getGameCards3D()
            .then((gameCards: mongoose.Document[]) => {
                 expect(gameCards).to.deep.equal(gamecardsExpected);
            })
            .catch((err: Error) => console.error(err));
            done();
        });

    });

    describe("convertBDGameCards", () => {

        beforeEach((done: Mocha.Done) => {
            differenceCounterService = new DifferenceCounterService();
            gameCardsService = new GameCardsService(differenceCounterService, databaseService);
            done();
        });

        it("should return an empty array if the array of game card is empty", (done: Function) => {
            const documents: mongoose.Document[] = [];

            expect(gameCardsService.convertDBGameCards(documents, Dimension.THREE_DIMENSION)).to.deep.equals([]);
            done();
        });

        // tslint:disable-next-line:max-func-body-length
        it("should return a valid gameCard when the array is composed of gameCard2D", (done: Function) => {
            const gamecard1: mongoose.Document = new gameCard2D({
                title: "title1",
                originalImagePath: "path1",
                modifiedImagePath: "path2",
                differenceImagePath: "path3",
                bestScoreSolo: [{ user: "user1", time: 1 }, { user: "user2", time: 2 }, { user: "user3", time: 3 }],
                bestScore1v1: [{ user: "user4", time: 4 }, { user: "user5", time: 5 }, { user: "user6", time: 6 }],
            });
            const gamecard2: mongoose.Document = new gameCard2D({
                title: "title2",
                originalImagePath: "path4",
                modifiedImagePath: "path5",
                differenceImagePath: "path6",
                bestScoreSolo: [{ user: "user7", time: 7 }, { user: "user8", time: 8 }, { user: "user9", time: 9 }],
                bestScore1v1: [{ user: "user10", time: 10 }, { user: "user11", time: 11 }, { user: "user12", time: 12 }],
            });
            const gamecardsArray: mongoose.Document[] = [gamecard1, gamecard2];

            const gamecard1Expected: GameCard = {
                title: "title1",
                image: "path1",
                bestTimeSolo: [{ user: "user1", time: 1 }, { user: "user2", time: 2 }, { user: "user3", time: 3 }],
                bestTime1v1: [{user: "user4", time: 4 }, { user: "user5", time: 5 }, { user: "user6", time: 6 }],
                dimension: Dimension.TWO_DIMENSION,
            };
            const gamecard2Expected: GameCard = {
                title: "title2",
                image: "path4",
                bestTimeSolo: [{ user: "user7", time: 7 }, { user: "user8", time: 8 }, { user: "user9", time: 9 }],
                bestTime1v1: [{ user: "user10", time: 10 }, { user: "user11", time: 11 }, { user: "user12", time: 12 }],
                dimension: Dimension.TWO_DIMENSION,
            };
            const gamecardsExpected: GameCard[] = [gamecard1Expected, gamecard2Expected];

            expect(gameCardsService.convertDBGameCards(gamecardsArray, Dimension.TWO_DIMENSION)).to.deep.equals(gamecardsExpected);
            done();
        });

        // tslint:disable-next-line:max-func-body-length
        it("should return a valid gameCard when the array is composed of gameCard3D", (done: Function) => {
            const gamecard1: mongoose.Document = new gameCard3D({
                title: "title1",
                originalImagePath: "path1",
                bestScoreSolo: [{ user: "user1", time: 1 }, { user: "user2", time: 2 }, { user: "user3", time: 3 }],
                bestScore1v1: [{ user: "user4", time: 4 }, { user: "user5", time: 5 }, { user: "user6", time: 6 }],
            });
            const gamecard2: mongoose.Document = new gameCard2D({
                title: "title2",
                originalImagePath: "path2",
                bestScoreSolo: [{ user: "user7", time: 7 }, { user: "user8", time: 8 }, { user: "user9", time: 9 }],
                bestScore1v1: [{ user: "user10", time: 10 }, { user: "user11", time: 11 }, { user: "user12", time: 12 }],
            });
            const gamecardsArray: mongoose.Document[] = [gamecard1, gamecard2];

            const gamecard1Expected: GameCard = {
                title: "title1",
                image: "path1",
                bestTimeSolo: [{ user: "user1", time: 1 }, { user: "user2", time: 2 }, { user: "user3", time: 3 }],
                bestTime1v1: [{user: "user4", time: 4 }, { user: "user5", time: 5 }, { user: "user6", time: 6 }],
                dimension: Dimension.THREE_DIMENSION,
            };
            const gamecard2Expected: GameCard = {
                title: "title2",
                image: "path2",
                bestTimeSolo: [{ user: "user7", time: 7 }, { user: "user8", time: 8 }, { user: "user9", time: 9 }],
                bestTime1v1: [{ user: "user10", time: 10 }, { user: "user11", time: 11 }, { user: "user12", time: 12 }],
                dimension: Dimension.THREE_DIMENSION,
            };
            const gamecardsExpected: GameCard[] = [gamecard1Expected, gamecard2Expected];

            expect(gameCardsService.convertDBGameCards(gamecardsArray, Dimension.THREE_DIMENSION)).to.deep.equals(gamecardsExpected);
            done();
        });

    });

    describe("generateGameCard2D", () => {

        beforeEach((done: Mocha.Done) => {
            gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
            gameCardsServiceStub = sinonts.stubObject<GameCardsService>(gameCardsService, ["getRandomNumber"]);
            done();
        });

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
                image: "http://localhost:3000/originalImages/originalImage.bmp",
                bestTimeSolo: [{user : "user0", time : 210}, {user : "user0", time : 210}, {user : "user0", time : 210}],
                bestTime1v1: [{user : "user0", time : 150}, {user : "user0", time : 150}, {user : "user0", time : 150}],
                dimension: Dimension.TWO_DIMENSION,
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
                image: "http://localhost:3000/originalImages/originalImage.bmp",
                bestTimeSolo: [{user : "user999", time : 360}, {user : "user999", time : 360}, {user : "user999", time : 360}],
                bestTime1v1: [{user : "user999", time : 300}, {user : "user999", time : 300}, {user : "user999", time : 300}],
                dimension: Dimension.TWO_DIMENSION,
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
                image: "http://localhost:3000/originalImages/originalImage.bmp",
                bestTimeSolo: [{user : "user109", time : 226}, {user : "user109", time : 240}, {user : "user109", time : 253}],
                bestTime1v1: [{user : "user109", time : 166}, {user : "user109", time : 180}, {user : "user109", time : 193}],
                dimension: Dimension.TWO_DIMENSION,
            };
            expect(gameCardsServiceStub.generateGameCard2D(formInfo)).deep.equal(expectedGameCard);
            done();
        });
    });

    describe("generateGameCard3D", () => {
        // TODO
    });

    describe("getRandomRange", () => {

        beforeEach((done: Mocha.Done) => {
            gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
            gameCardsServiceStub = sinonts.stubObject<GameCardsService>(gameCardsService, ["getRandomNumber"]);
            done();
        });

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

        beforeEach((done: Mocha.Done) => {
            gameCardsService = new GameCardsService(differenceCounterServiceStub, databaseService);
            gameCardsServiceStub = sinonts.stubObject<GameCardsService>(gameCardsService, ["getRandomNumber"]);
            done();
        });

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

        beforeEach((done: Mocha.Done) => {
            gameCardsServiceStub = sinonts.stubObject<GameCardsService>(gameCardsService, ["getRandomNumber"]);
            done();
        });

        it("should return the right path to the original image", (done: Function) => {

            expect(gameCardsServiceStub.generateOriginalImagePath("originalImage.bmp"))
            .to.equal("http://localhost:3000/originalImages/originalImage.bmp");
            done();
        });
    });

    describe("generateModifiedImagePath", () => {

        beforeEach((done: Mocha.Done) => {
            gameCardsServiceStub = sinonts.stubObject<GameCardsService>(gameCardsService, ["getRandomNumber"]);
            done();
        });

        it("should return the right path to the modified image", (done: Function) => {

            expect(gameCardsServiceStub.generateModifiedImagePath("modifiedImage.bmp"))
            .to.equal("http://localhost:3000/modifiedImages/modifiedImage.bmp");
            done();
        });
    });
});
