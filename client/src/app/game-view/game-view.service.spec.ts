import { Dimension, Constants } from "../../../../common/communication/Constants";
import { GameCard } from "../../../../common/communication/game-card";
import { GameViewService } from "./game-view.service";

let service: GameViewService;
const mockGameCard: GameCard = {
  title: "Bonjour", image: "x.bmp", imageModified: "y.bmp",
  bestTimeSolo: [{ user: "Ali", time: 20 }, { user: "Baba", time: 40 }, { user: "Michel", time: 133 }],
  bestTime1v1: [{ user: "Haxer", time: 1 }, { user: "User231", time: 122 }, { user: "NickPacté", time: 9001 }],
  dimension: Dimension.TWO_DIMENSION,
};

describe("GameViewService", () => {

  beforeEach(() => {
    service.reset();
    service = new GameViewService();
    service.gamecard = mockGameCard;
  });

  it("should set properly the timer model", () => {
    expect(service.timerModel).toBeDefined();
  });



});
