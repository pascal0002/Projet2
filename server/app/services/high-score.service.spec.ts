import { expect } from "chai";
import { Dimension, Mode } from "../../../common/communication/Constants";
import { INewScore } from "../../../common/communication/NewScore";
import { GameCard } from "../../../common/communication/game-card";
import { HighScoreService } from "./high-score.service";

let highScoreService: HighScoreService;
const mockGameCard: GameCard = {
    title: "title",
    image: "image",
    imageModified: "image2",
    bestTimeSolo: [{user: "premier", time: 100}, {user: "deuxieme", time: 200}, {user: "troisieme", time: 300}],
    bestTime1v1: [{user: "premier", time: 100}, {user: "deuxieme", time: 200}, {user: "troisieme", time: 300}],
    dimension: Dimension.TWO_DIMENSION,
};

describe("high-score-service", () => {

    describe("updateGameCard", () => {

        beforeEach((done: Mocha.Done) => {
            highScoreService = new HighScoreService();
            done();
        });

        it("should return the original gameCard when the new time is bigger then all", (done: Function) => {
            const mockNewScore: INewScore = {
                gameCard: mockGameCard,
                mode: Mode.ONE_VS_ONE,
                user: "newUser",
                time: 301,
            };
            expect(highScoreService.updateGameCard(mockNewScore)).to.deep.equal(mockGameCard);
            done();
        });

    });
});
